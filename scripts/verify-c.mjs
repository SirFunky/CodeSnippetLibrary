// Development-only compiler and behavior checks for trusted bundled programs.
import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  mkdtempSync,
  rmSync,
} from "node:fs";
import { resolve, join, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const root = resolve("artifacts/c-verification");
mkdirSync(root, { recursive: true });
const expected = {
  "c-parse-integer": "42\n",
  "c-sort-array": "1 1 2 3\n",
  "c-binary-search": "5\n",
  "c-allocate-array": "4\n",
  "c-grow-array": "10 20 0 0\n",
  "c-read-text": "Hello, C!\n",
  "c-write-text": "Written\n",
  "c-trim-text": "Ada\n",
  "c-format-text": "Count: 42\n",
  "c-struct": "10 20\n",
  "c-generic-selection": "int\ndouble\n",
  "c-static-assert": "Assumption checked\n",
  "c-bit-flags": "5 1 0\n",
  "c-array-mean": "4.0\n",
  "c-function-pointer": "36\n",
};
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}
const fixture = mkdtempSync(join(root, "fixtures-"));
let count = 0;
try {
  writeFileSync(join(fixture, "example.txt"), "Hello, C!");
  for (const file of files("DefaultCSnippets").filter((f) =>
    f.endsWith(".md"),
  )) {
    const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
      m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
    const code = raw.match(/^```c\n([\s\S]*?)^```/m)[1];
    if (!(m.id in expected)) throw new Error("Missing assertion: " + m.id);
    if (![11, 17].includes(m.cVersion))
      throw new Error(
        "MSVC verifier only checks C11/C17 examples; it has no exact C89/C99/C23 check here.",
      );
    const directory = join(root, m.id);
    mkdirSync(directory, { recursive: true });
    const source = join(directory, "example.c"),
      binary = join(directory, "example.exe");
    writeFileSync(
      source,
      m.imports.map((h) => `#include ${h}`).join("\n") + "\n" + code,
    );
    const compiled = spawnSync(
      "cl.exe",
      [
        "/nologo",
        "/TC",
        "/W4",
        "/WX",
        "/utf-8",
        "/D_CRT_SECURE_NO_WARNINGS",
        `/std:c${m.cVersion}`,
        `/Fo${join(directory, "example.obj")}`,
        `/Fe${binary}`,
        source,
        "/link",
        "/INCREMENTAL:NO",
      ],
      { encoding: "utf8", cwd: directory },
    );
    if (compiled.error) throw compiled.error;
    if (compiled.status !== 0)
      throw new Error(
        m.id + " compilation failed:\n" + compiled.stdout + compiled.stderr,
      );
    const result = spawnSync(binary, [], {
      encoding: "utf8",
      cwd: fixture,
      timeout: 5000,
    });
    if (result.error) throw result.error;
    if (
      result.status !== 0 ||
      result.stdout.replace(/\r\n/g, "\n") !== expected[m.id]
    )
      throw new Error(m.id + " behavior failed: " + JSON.stringify(result));
    if (
      m.id === "c-write-text" &&
      readFileSync(join(fixture, "output.txt"), "utf8") !== "Hello, C!"
    )
      throw new Error("Written fixture mismatch");
    console.log(`PASS C${m.cVersion}: ${m.id}`);
    count++;
  }
  if (count !== Object.keys(expected).length)
    throw new Error("Assertion/example count mismatch");
} finally {
  const target = resolve(fixture);
  if (!target.startsWith(root + sep))
    throw new Error("Refusing cleanup outside verification directory");
  rmSync(target, { recursive: true, force: true });
}
console.log(
  `Compiled and checked ${count} C programs with MSVC in declared C11/C17 modes. C89/C99/C23 were not compiler-tested.`,
);
