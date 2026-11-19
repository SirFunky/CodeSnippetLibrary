// Development-only checks of trusted bundled Kotlin/JVM programs. Never used by app runtime.
import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  mkdtempSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const expected = {
  "kt-trim-text": "Ada\n",
  "kt-null-safety": "Ada\nAnonymous\nAnonymous\n",
  "kt-filter-map": "[2, 6]\n[-2, 1, 0, 3]\n",
  "kt-group-by": "[Ada, Grace]\n[]\n",
  "kt-associate": "Grace\n2\n",
  "kt-data-copy":
    "Settings(theme=dark, fontSize=13)\nSettings(theme=dark, fontSize=16)\n",
  "kt-sealed-when": "Value: 42\nMissing\n",
  "kt-parse-integer": "42\nnull\nnull\n",
  "kt-read-text": "Hello, Kotlin!\n",
  "kt-write-text": "Written\n",
  "kt-use-reader": "Ada\n",
  "kt-sequence": "[10, 30]\n",
  "kt-date-import": "2024-01-03\n",
  "kt-enum-entries": "red, green, blue\n",
  "kt-data-object": "EndOfInput\nEnd\n",
};
const root = resolve("artifacts/kotlin-verification");
mkdirSync(root, { recursive: true });
const temporary = join(root, "tmp");
mkdirSync(temporary, { recursive: true });
const kotlinHome = resolve(process.env.KOTLIN_HOME ?? ".tools/kotlinc");
if (!existsSync(join(kotlinHome, "lib", "kotlin-compiler.jar")))
  throw new Error("Set KOTLIN_HOME to an unpacked standalone Kotlin compiler");
const knownJava = "C:/Program Files/Java/jdk-24/bin/java.exe";
const java =
  process.env.JAVA_BINARY ??
  (process.env.JAVA_HOME
    ? join(process.env.JAVA_HOME, "bin", "java.exe")
    : existsSync(knownJava)
      ? knownJava
      : "java");
function run(args, cwd = root) {
  const r = spawnSync(java, args, { cwd, encoding: "utf8", timeout: 120000 });
  if (r.error) throw r.error;
  if (r.status !== 0)
    throw new Error(java + " " + args.join(" ") + "\n" + r.stdout + r.stderr);
  return r;
}
const compiler = [
  `-Djava.io.tmpdir=${temporary}`,
  `-Dkotlin.home=${kotlinHome}`,
  "-cp",
  join(kotlinHome, "lib", "*"),
  "org.jetbrains.kotlin.cli.jvm.K2JVMCompiler",
];
const version = run([...compiler, "-version"]);
console.log(
  (version.stdout + version.stderr)
    .split(/\r?\n/)
    .find((line) => line.includes("kotlinc-jvm")),
);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}
const fixture = mkdtempSync(join(root, "fixtures-"));
writeFileSync(join(fixture, "example.txt"), "Hello, Kotlin!");
writeFileSync(join(fixture, "lines.txt"), "Ada\nLinus\n");
let count = 0;
for (const file of files("DefaultKotlinSnippets").filter((f) =>
  f.endsWith(".md"),
)) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
    m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const code = raw.match(/^```kotlin\n([\s\S]*?)^```/m)[1];
  if (!(m.id in expected)) throw new Error("Missing assertions: " + m.id);
  const imports = (m.imports ?? []).map((path) => `import ${path}`).join("\n");
  const source = imports
    ? code.replace(/^package snippets$/m, "package snippets\n\n" + imports)
    : code;
  const directory = join(root, m.id);
  mkdirSync(directory, { recursive: true });
  const path = join(directory, "Main.kt"),
    jar = join(directory, "example.jar");
  writeFileSync(path, source);
  run([
    ...compiler,
    path,
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
  const output = run(["-jar", jar], fixture).stdout.replace(/\r\n/g, "\n");
  if (output !== expected[m.id])
    throw new Error(m.id + " output mismatch: " + JSON.stringify(output));
  if (
    m.id === "kt-write-text" &&
    readFileSync(join(fixture, "output.txt"), "utf8") !== "Hello, Kotlin!"
  )
    throw new Error("Written fixture mismatch");
  console.log(`PASS Kotlin ${m.kotlinVersion}, JVM ${m.jvmTarget}: ${m.id}`);
  count++;
}
if (count !== Object.keys(expected).length)
  throw new Error("Example/assertion count mismatch");
console.log(
  `Compiled and checked ${count} Kotlin/JVM programs at declared language/API modes and JVM bytecode targets. Older Kotlin distributions and JVM runtimes were not separately exercised.`,
);
