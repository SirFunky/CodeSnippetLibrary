// Development-only checks of the trusted bundled everyday examples.
import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { resolve, join, delimiter } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
import ts from "typescript";
const extras = process.argv.includes("--extras");
const collection = extras ? "extras" : "everyday";
const root = resolve(`artifacts/${collection}-verification`);
mkdirSync(root, { recursive: true });
const javaHome = process.env.JAVA_HOME ?? "C:/Program Files/Java/jdk-24";
const java = process.env.JAVA_BINARY ?? join(javaHome, "bin", "java.exe");
const kotlin = resolve(process.env.KOTLIN_HOME ?? ".tools/kotlinc");
const cobol = resolve(process.env.COBOL_HOME ?? ".tools/cobol");
const go = process.env.GO_BINARY ?? resolve(".tools/go/bin/go.exe");
const telemetry = join(root, "telemetry");
mkdirSync(telemetry, { recursive: true });
writeFileSync(join(telemetry, "mode"), "off\n");
const env = {
  ...process.env,
  DOTNET_CLI_HOME: join(root, "dotnet-home"),
  DOTNET_CLI_TELEMETRY_OPTOUT: "1",
  DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1",
  NUGET_PACKAGES: join(root, "nuget"),
  GOENV: "off",
  GOTOOLCHAIN: "local",
  GOPROXY: "off",
  GOSUMDB: "off",
  TEST_TELEMETRY_DIR: telemetry,
  GO111MODULE: "off",
  CGO_ENABLED: "0",
  GOCACHE: join(root, "go-cache"),
  GOPATH: join(root, "gopath"),
  PATH: join(cobol, "bin") + delimiter + process.env.PATH,
  COB_CONFIG_DIR: join(cobol, "config"),
  COB_COPY_DIR: join(cobol, "copy"),
  COB_CFLAGS: `-I"${join(cobol, "include")}"`,
  COB_LDFLAGS: `-L"${join(cobol, "lib")}"`,
};
function run(command, args, cwd = root, input) {
  const result = spawnSync(command, args, {
    cwd,
    env,
    input,
    encoding: "utf8",
    timeout: 120000,
  });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(
      command + " " + args.join(" ") + "\n" + result.stdout + result.stderr,
    );
  return result.stdout.replace(/\r\n/g, "\n");
}
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}
const manifest = JSON.parse(
  readFileSync(`scripts/${extras ? "extra" : "everyday"}-cases.json`, "utf8"),
);
const selected = process.argv.slice(2).filter((arg) => arg !== "--extras");
let count = 0;
for (const [id, example] of Object.entries(manifest)) {
  if (selected.length && !selected.includes(example.language)) continue;
  const file = example.path;
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
    m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const code = raw.match(
    new RegExp("^```" + m.language + "\\n([\\s\\S]*?)^```", "m"),
  )[1];
  if (m.id !== id || m.language !== example.language)
    throw new Error("Manifest mismatch: " + id);
  if (m.sqlKind === "procedure") continue;
  const dir = join(root, m.id);
  mkdirSync(dir, { recursive: true });
  let output = "";
  const save = (name) => {
    const path = join(dir, name);
    writeFileSync(path, code);
    return path;
  };
  switch (m.language) {
    case "java": {
      const source = save("Main.java");
      run(join(javaHome, "bin", "javac.exe"), [
        "--release",
        String(m.javaVersion),
        "-d",
        dir,
        source,
      ]);
      output = run(java, ["-cp", dir, "Main"]);
      break;
    }
    case "python": {
      const python = process.env.PYTHON ?? "py";
      output = run(python, [
        ...(process.env.PYTHON ? [] : ["-3"]),
        save("main.py"),
      ]);
      break;
    }
    case "c":
    case "cpp": {
      const source = save(m.language === "c" ? "main.c" : "main.cpp"),
        exe = join(dir, "hello.exe");
      run(
        "cl.exe",
        [
          "/nologo",
          "/W4",
          "/WX",
          ...(m.language === "c"
            ? ["/TC", `/std:c${m.cVersion}`]
            : ["/EHsc", `/std:c++${m.cppVersion}`]),
          `/Fo${join(dir, "main.obj")}`,
          `/Fe${exe}`,
          source,
          "/link",
          "/INCREMENTAL:NO",
        ],
        dir,
      );
      output = run(exe, [], dir);
      break;
    }
    case "csharp": {
      save("Program.cs");
      writeFileSync(
        join(dir, "NuGet.Config"),
        "<configuration><packageSources><clear /></packageSources></configuration>",
      );
      writeFileSync(
        join(dir, "Hello.csproj"),
        `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net${m.dotnetVersion}</TargetFramework><LangVersion>${m.csharpVersion}</LangVersion><ImplicitUsings>disable</ImplicitUsings><NuGetAudit>false</NuGetAudit></PropertyGroup></Project>`,
      );
      run(
        "dotnet",
        [
          "build",
          "Hello.csproj",
          "--configuration",
          "Release",
          "--nologo",
          "--verbosity",
          "quiet",
        ],
        dir,
      );
      output = run("dotnet", [
        join(dir, "bin", "Release", `net${m.dotnetVersion}`, "Hello.dll"),
      ]);
      break;
    }
    case "javascript":
      output = run(process.execPath, [save("main.js")]);
      break;
    case "typescript": {
      const path = save("main.ts");
      const program = ts.createProgram([path], {
        strict: true,
        noEmitOnError: true,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        types: [],
      });
      const emitted = program.emit();
      const diagnostics = [
        ...ts.getPreEmitDiagnostics(program),
        ...emitted.diagnostics,
      ];
      if (diagnostics.length)
        throw new Error(
          ts.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCurrentDirectory: () => root,
            getCanonicalFileName: (f) => f,
            getNewLine: () => "\n",
          }),
        );
      output = run(process.execPath, [join(dir, "main.js")]);
      break;
    }
    case "go": {
      const exe = join(dir, "hello.exe");
      run(go, [
        "build",
        `-gcflags=-lang=go${m.goVersion}`,
        "-o",
        exe,
        save("main.go"),
      ]);
      output = run(exe, []);
      break;
    }
    case "kotlin": {
      const jar = join(dir, "hello.jar");
      run(java, [
        `-Dkotlin.home=${kotlin}`,
        "-cp",
        join(kotlin, "lib", "*"),
        "org.jetbrains.kotlin.cli.jvm.K2JVMCompiler",
        save("Main.kt"),
        "-language-version",
        m.kotlinVersion,
        "-api-version",
        m.kotlinVersion,
        "-jvm-target",
        m.jvmTarget === 8 ? "1.8" : String(m.jvmTarget),
        "-include-runtime",
        "-d",
        jar,
      ]);
      output = run(java, ["-jar", jar]);
      break;
    }
    case "cobol": {
      const exe = join(dir, "hello.exe");
      run(join(cobol, "bin", "cobc.exe"), [
        "-x",
        "-Wall",
        "-Werror",
        `-std=cobol${m.cobolVersion}`,
        "-free",
        "-o",
        exe,
        save("hello.cob"),
      ]);
      output = run(exe, []);
      break;
    }
    case "sql": {
      const python = process.env.PYTHON ?? "py";
      const checker = join(dir, "check.py");
      writeFileSync(
        checker,
        `import sqlite3, json, sys
payload = json.load(sys.stdin)
with sqlite3.connect(":memory:") as connection:
    if payload.get("setup"): connection.executescript(payload["setup"])
    rows = [list(row) for row in connection.execute(payload["code"]).fetchall()]
    assert rows == payload["expected"], (rows, payload["expected"])
print("verified")
`,
      );
      output = run(
        python,
        [...(process.env.PYTHON ? [] : ["-3"]), checker],
        dir,
        JSON.stringify({
          code,
          expected: example.expected,
          setup: example.setup,
        }),
      );
      break;
    }
    default:
      throw new Error("Missing verifier for " + m.language);
  }
  const expected = m.language === "sql" ? "verified\n" : example.expected;
  if (output !== expected)
    throw new Error(
      m.id +
        " output mismatch: " +
        JSON.stringify(output) +
        " expected " +
        JSON.stringify(expected),
    );
  console.log("PASS " + m.id);
  count++;
}
if (!selected.length || selected.includes("sql")) {
  process.stdout.write(
    run(
      process.execPath,
      [
        resolve("scripts/verify-everyday-sql.mjs"),
        extras ? "ExtraSnippets/SQL" : "EverydaySnippets/SQL",
      ],
      resolve("."),
    ),
  );
  count += Object.values(manifest).filter(
    (e) => e.language === "sql" && e.expected === null,
  ).length;
}
const expectedCount = Object.values(manifest).filter(
  (e) => !selected.length || selected.includes(e.language),
).length;
if (count !== expectedCount)
  throw new Error(`Verified ${count}, expected ${expectedCount}`);
console.log(
  `Verified ${count} ${collection} examples. SQL Server procedures: syntax only; no database connection.`,
);
