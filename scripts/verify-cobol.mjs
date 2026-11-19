// Development-only checks of trusted COBOL programs, never imported by app runtime.
import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  mkdtempSync,
  existsSync,
} from "node:fs";
import { resolve, join, delimiter } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const expected = {
  "cobol-hello": "Hello, COBOL!\n",
  "cobol-arithmetic": "Total=0042\n",
  "cobol-decimal": "Amount=012.35\n",
  "cobol-table": "30\n",
  "cobol-condition": "Enabled\n",
  "cobol-evaluate": "Two\n",
  "cobol-loop": "1\n2\n3\n",
  "cobol-concatenate": "Ada, Linus\n",
  "cobol-split-text": "Ada/Linus\n",
  "cobol-count-text": "03\n",
  "cobol-validate-number": "Invalid\n",
  "cobol-read-record": "Hello COBOL!\n",
  "cobol-write-record": "Written\n",
  "cobol-trim-text": "Ada\n",
  "cobol-uppercase": "ADA\n",
};
const root = resolve("artifacts/cobol-verification");
mkdirSync(root, { recursive: true });
const home = resolve(process.env.COBOL_HOME ?? ".tools/cobol"),
  compiler = join(home, "bin", "cobc.exe");
if (!existsSync(compiler))
  throw new Error(
    "Set COBOL_HOME to a portable GnuCOBOL distribution with bin/cobc.exe and its C compiler/runtime dependencies",
  );
const env = {
  ...process.env,
  PATH: join(home, "bin") + delimiter + process.env.PATH,
  COB_CONFIG_DIR: join(home, "config"),
  COB_COPY_DIR: join(home, "copy"),
  COB_CFLAGS: `-I"${join(home, "include")}"`,
  COB_LDFLAGS: `-L"${join(home, "lib")}"`,
  COB_LIBRARY_PATH: join(home, "extras"),
};
function run(command, args, cwd = root) {
  const r = spawnSync(command, args, {
    cwd,
    env,
    encoding: "utf8",
    timeout: 30000,
  });
  if (r.error) throw r.error;
  if (r.status !== 0)
    throw new Error(
      command + " " + args.join(" ") + "\n" + r.stdout + r.stderr,
    );
  return r.stdout;
}
console.log(run(compiler, ["--version"]).split(/\r?\n/)[0]);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}
const fixture = mkdtempSync(join(root, "fixtures-"));
writeFileSync(join(fixture, "example.dat"), "Hello COBOL!");
let count = 0;
for (const file of files("DefaultCobolSnippets").filter((f) =>
  f.endsWith(".md"),
)) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
    m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const code = raw.match(/^```cobol\n([\s\S]*?)^```/m)[1];
  if (!(m.id in expected)) throw new Error("Missing assertions: " + m.id);
  if (![1985, 2002, 2014].includes(m.cobolVersion))
    throw new Error("Verifier does not check COBOL 2023");
  if (
    m.cobolFormat === "fixed" &&
    code
      .trimEnd()
      .split("\n")
      .some((line) => line.length > 72 || !/^ {7}/.test(line))
  )
    throw new Error("Fixed-format column mismatch: " + m.id);
  const directory = join(root, m.id);
  mkdirSync(directory, { recursive: true });
  const source = join(directory, "example.cob"),
    binary = join(directory, "example.exe");
  writeFileSync(source, code);
  const standard =
    m.cobolVersion === 1985 ? "cobol85" : `cobol${m.cobolVersion}`;
  run(compiler, [
    "-x",
    "-Wall",
    "-Werror",
    `-std=${standard}`,
    m.cobolFormat === "fixed" ? "-fixed" : "-free",
    "-o",
    binary,
    source,
  ]);
  const output = run(binary, [], fixture).replace(/\r\n/g, "\n");
  if (output !== expected[m.id])
    throw new Error(m.id + " output mismatch: " + JSON.stringify(output));
  if (
    m.id === "cobol-write-record" &&
    readFileSync(join(fixture, "output.dat"), "utf8") !== "Hello COBOL!"
  )
    throw new Error("Written record mismatch");
  console.log(`PASS COBOL ${m.cobolVersion} ${m.cobolFormat}: ${m.id}`);
  count++;
}
if (count !== Object.keys(expected).length)
  throw new Error("Example/assertion count mismatch");
console.log(
  `Compiled and checked ${count} COBOL examples with declared standard/source-format modes. Other vendors, mainframes and COBOL 2023 were not tested.`,
);
