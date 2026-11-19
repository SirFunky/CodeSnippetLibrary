// Development-only compilation and behavior checks of trusted bundled examples.
// The desktop app never executes snippets or invokes .NET.
import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  mkdtempSync,
  rmSync,
} from "node:fs";
import { join, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const root = resolve("artifacts/csharp-verification");
mkdirSync(root, { recursive: true });
const env = {
  ...process.env,
  DOTNET_CLI_HOME: join(root, "dotnet-home"),
  DOTNET_CLI_TELEMETRY_OPTOUT: "1",
  DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1",
  NUGET_PACKAGES: join(root, "nuget"),
};
writeFileSync(
  join(root, "NuGet.Config"),
  "<configuration><packageSources><clear /></packageSources></configuration>",
);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}
const assertions = {
  "cs-blank-text": "blank",
  "cs-join-strings": 'joined == "Ada, Linus"',
  "cs-parse-int": "value == 42",
  "cs-regex-numbers":
    'System.Linq.Enumerable.SequenceEqual(numbers, new[] {"123", "45"})',
  "cs-deduplicate":
    'unique.Count == 2 && unique.Contains("Ada") && unique.Contains("Linus")',
  "cs-filter-map":
    'System.Linq.Enumerable.SequenceEqual(uppercase, new[] {"ADA", "LINUS"})',
  "cs-group-values": "groups['A'].Count == 2 && groups['L'].Count == 1",
  "cs-dictionary-default": 'theme == "dark"',
  "cs-read-text": 'content == "Hello, C#!"',
  "cs-write-text":
    'System.IO.File.ReadAllText("output.txt", System.Text.Encoding.UTF8) == "Hello, C#!"',
  "cs-json-read": 'name == "Ada"',
  "cs-json-write": 'json == "{\\"name\\":\\"Ada\\",\\"active\\":true}"',
  "cs-parse-date": "day.Year == 2026 && day.Month == 11 && day.Day == 19",
  "cs-parallel-tasks":
    "System.Linq.Enumerable.SequenceEqual(results, new[] {2,4,6})",
  "cs-collection-expression":
    "numbers.Length == 3 && numbers[0] == 1 && numbers[2] == 3",
};
const groups = new Map();
let total = 0;
for (const path of files("DefaultCSharpSnippets").filter((p) =>
  p.endsWith(".md"),
)) {
  const raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n"),
    m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const code = raw.match(/^```csharp\n([\s\S]*?)^```/m)[1];
  if (!assertions[m.id])
    throw new Error(`Add a behavior assertion for ${m.id}.`);
  const key = `${m.csharpVersion}-${m.dotnetVersion}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({ ...m, code });
}
function command(args, cwd) {
  const result = spawnSync("dotnet", args, { cwd, env, encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.stdout.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
    throw new Error(`dotnet ${args[0]} failed (${result.status}).`);
  }
  return result.stdout;
}
const fixture = mkdtempSync(join(root, "fixtures-"));
try {
  writeFileSync(join(fixture, "example.txt"), "Hello, C#!", "utf8");
  for (const [key, examples] of groups) {
    const directory = join(root, key);
    mkdirSync(directory, { recursive: true });
    const first = examples[0];
    writeFileSync(
      join(directory, "Verify.csproj"),
      `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net${first.dotnetVersion}</TargetFramework><LangVersion>${first.csharpVersion}</LangVersion><ImplicitUsings>disable</ImplicitUsings><Nullable>disable</Nullable><NuGetAudit>false</NuGetAudit><RestoreIgnoreFailedSources>true</RestoreIgnoreFailedSources></PropertyGroup></Project>`,
    );
    const calls = [];
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i],
        async = /\bawait\b/.test(example.code),
        name = `Example${i}`;
      const source = `${(example.imports ?? []).map((line) => `using ${line};`).join("\n")}\npublic class ${name} { public static ${async ? "async System.Threading.Tasks.Task" : "void"} Run() {\n${example.code}\nif (!(${assertions[example.id]})) throw new System.Exception("Assertion failed: ${example.id}");\n} }`;
      writeFileSync(join(directory, `${name}.cs`), source);
      calls.push(`${name}.Run()${async ? ".GetAwaiter().GetResult()" : ""};`);
    }
    writeFileSync(
      join(directory, "Program.cs"),
      `public class Program { public static void Main() { ${calls.join("\n")} } }`,
    );
    command(
      [
        "build",
        "Verify.csproj",
        "--configuration",
        "Release",
        "--nologo",
        "--verbosity",
        "quiet",
      ],
      directory,
    );
    command(
      [
        join(
          directory,
          "bin",
          "Release",
          `net${first.dotnetVersion}`,
          "Verify.dll",
        ),
      ],
      fixture,
    );
    for (const example of examples) {
      console.log(
        `PASS C# ${example.csharpVersion}, .NET ${example.dotnetVersion}: ${example.id}`,
      );
      total++;
    }
  }
} finally {
  const target = resolve(fixture);
  if (!target.startsWith(root + sep))
    throw new Error(
      "Refusing to remove fixtures outside the verification directory.",
    );
  rmSync(target, { recursive: true, force: true });
}
console.log(
  `Compiled and checked ${total} C# examples at their declared C# language version and .NET target.`,
);
