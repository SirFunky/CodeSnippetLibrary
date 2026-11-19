// Development-only checks of trusted bundled Go programs. Never used by app runtime.
import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  mkdtempSync,
} from "node:fs";
import { join, resolve, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const expected = {
  "go-trim-text": "Ada\n",
  "go-split-text": "Ada, Linus, Grace\n",
  "go-join-text": "Ada, Linus\n",
  "go-filter-values": "[1 3]\n[-2 1 0 3]\n",
  "go-count-values": "2 1 0\n",
  "go-parse-integer": "42\ntrue\n",
  "go-read-text": "Hello, Go!\n",
  "go-write-text": "Written\n",
  "go-decode-json": "Ada 37\ntrue\n",
  "go-parse-time": "2024-01-02T13:04:05Z\n",
  "go-join-errors": "true\ntrue\ntrue\n",
  "go-unique-values": "[3 1 2]\n",
  "go-cancel-cause": "true\ntrue\n",
  "go-sort-slice": "[1 2 10]\n[10 2 1]\n",
  "go-clone-map": "37 38\n",
};
const root = resolve("artifacts/go-verification");
mkdirSync(root, { recursive: true });
const telemetryDirectory = join(root, "telemetry");
mkdirSync(telemetryDirectory, { recursive: true });
writeFileSync(join(telemetryDirectory, "mode"), "off\n");
const local = resolve(".tools/go/bin/go.exe");
const go = process.env.GO_BINARY ?? (existsSync(local) ? local : "go");
const env = {
  ...process.env,
  GOENV: "off",
  GOTOOLCHAIN: "local",
  GOPROXY: "off",
  GOSUMDB: "off",
  GOTELEMETRY: "off",
  TEST_TELEMETRY_DIR: telemetryDirectory,
  GO111MODULE: "off",
  CGO_ENABLED: "0",
  GOCACHE: join(root, "cache"),
  GOPATH: join(root, "gopath"),
};
function run(command, args, cwd = root) {
  const r = spawnSync(command, args, {
    cwd,
    env,
    encoding: "utf8",
    timeout: 120000,
  });
  if (r.error) throw r.error;
  if (r.status !== 0)
    throw new Error(
      command + " " + args.join(" ") + "\n" + r.stdout + r.stderr,
    );
  return r.stdout;
}
console.log(run(go, ["version"]).trim());
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}
const fixture = mkdtempSync(join(root, "fixtures-"));
writeFileSync(join(fixture, "example.txt"), "Hello, Go!");
let count = 0;
for (const file of files("DefaultGoSnippets").filter((f) =>
  f.endsWith(".md"),
)) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
    m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const code = raw.match(/^```go\n([\s\S]*?)^```/m)[1];
  if (!(m.id in expected)) throw new Error("Missing assertions: " + m.id);
  const imports =
    "import (\n" + m.imports.map((p) => '\t"' + p + '"').join("\n") + "\n)";
  const source = code.replace(/^package main$/m, "package main\n\n" + imports);
  const directory = join(root, m.id);
  mkdirSync(directory, { recursive: true });
  const path = join(directory, "main.go"),
    binary = join(directory, "example.exe");
  writeFileSync(path, source);
  const gofmt = existsSync(join(dirname(go), "gofmt.exe"))
    ? join(dirname(go), "gofmt.exe")
    : "gofmt";
  run(gofmt, ["-w", path]);
  run(go, ["build", `-gcflags=-lang=go${m.goVersion}`, "-o", binary, path]);
  const output = run(binary, [], fixture).replace(/\r\n/g, "\n");
  if (output !== expected[m.id])
    throw new Error(m.id + " output mismatch: " + JSON.stringify(output));
  if (
    m.id === "go-write-text" &&
    readFileSync(join(fixture, "output.txt"), "utf8") !== "Hello, Go!"
  )
    throw new Error("Written fixture mismatch");
  console.log(`PASS Go ${m.goVersion}: ${m.id}`);
  count++;
}
if (count !== Object.keys(expected).length)
  throw new Error("Example/assertion count mismatch");
console.log(
  `Compiled and checked ${count} Go examples at declared language modes using installed standard libraries. Separate older toolchain standard libraries were not tested.`,
);
