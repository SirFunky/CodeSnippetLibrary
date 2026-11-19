// Development-only checks for trusted bundled examples. Never used by the app.
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
const root = resolve("artifacts/cpp-verification");
mkdirSync(root, { recursive: true });
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}
const checks = {
  "cpp-trim-text": 'trimmed == "Ada"',
  "cpp-split-text":
    'values == std::vector<std::string>({"Ada", "Linus", "Grace"})',
  "cpp-join-text": 'joined == "Ada, Linus"',
  "cpp-sort-unique": "values == std::vector<int>({1,2,3})",
  "cpp-filter-map": "positives == std::vector<int>({2,6})",
  "cpp-count-values": 'counts.at("one") == 2 && counts.at("two") == 1',
  "cpp-read-text": 'content == "Hello, C++!"',
  "cpp-write-text": 'read_fixture("output.txt") == "Hello, C++!"',
  "cpp-list-directory":
    'std::any_of(files.begin(),files.end(),[](const auto& p){return p.filename() == "example.txt";})',
  "cpp-parse-integer": "parsed && value == 42",
  "cpp-optional-value": "result.has_value() && value == 2",
  "cpp-unique-pointer": '*name == "Ada" && length == 3',
  "cpp-erase-matching": "values == std::vector<int>({1,3,5})",
  "cpp-map-contains": "known && ages.size() == 1",
  "cpp-async-task": "answer == 42",
};
const fixture = mkdtempSync(join(root, "fixtures-"));
let count = 0;
try {
  writeFileSync(join(fixture, "example.txt"), "Hello, C++!", "utf8");
  for (const file of files("DefaultCppSnippets").filter((p) =>
    p.endsWith(".md"),
  )) {
    const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
      m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
    const code = raw.match(/^```cpp\n([\s\S]*?)^```/m)[1];
    if (!checks[m.id]) throw new Error(`Add an assertion for ${m.id}.`);
    if (![14, 17, 20].includes(m.cppVersion))
      throw new Error(
        "The MSVC verifier supports bundled C++14, 17 and 20 examples; do not claim an exact C++11/23 mode.",
      );
    const directory = join(root, m.id);
    mkdirSync(directory, { recursive: true });
    const source = join(directory, "example.cpp"),
      binary = join(directory, "example.exe");
    const example = `${m.imports.map((header) => `#include ${header}`).join("\n")}\nint main() {\n${code}\nif (!(${checks[m.id]})) return 1;\nreturn 0;\n}\n`;
    // Test-only helpers are limited to the two filesystem assertions.
    const harness =
      m.id === "cpp-write-text"
        ? "#include <fstream>\n#include <iterator>\n#include <string>\nstd::string read_fixture(const char* path) {std::ifstream input(path,std::ios::binary);return std::string((std::istreambuf_iterator<char>(input)),std::istreambuf_iterator<char>());}\n"
        : m.id === "cpp-list-directory"
          ? "#include <algorithm>\n"
          : "";
    writeFileSync(source, harness + example);
    const result = spawnSync(
      "cl.exe",
      [
        "/nologo",
        "/EHsc",
        "/W4",
        "/permissive-",
        "/utf-8",
        `/std:c++${m.cppVersion}`,
        `/Fo${join(directory, "example.obj")}`,
        `/Fe${binary}`,
        source,
        "/link",
        "/INCREMENTAL:NO",
      ],
      { encoding: "utf8", cwd: directory },
    );
    if (result.error) throw result.error;
    if (result.status !== 0) {
      process.stdout.write(result.stdout ?? "");
      process.stderr.write(result.stderr ?? "");
      throw new Error(`Compilation failed: ${m.id}`);
    }
    const run = spawnSync(binary, [], { encoding: "utf8", cwd: fixture });
    if (run.error) throw run.error;
    if (run.status !== 0)
      throw new Error(`Behavior assertion failed: ${m.id} (${run.status})`);
    console.log(`PASS C++${m.cppVersion}: ${m.id}`);
    count++;
  }
} finally {
  const target = resolve(fixture);
  if (!target.startsWith(root + sep))
    throw new Error(
      "Refusing to delete fixtures outside the verification directory.",
    );
  rmSync(target, { recursive: true, force: true });
}
console.log(
  `Compiled and checked ${count} C++ examples with MSVC in their declared standard mode.`,
);
