// Development-only verification of the trusted bundled examples, never used by the app.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}
const examples = files("DefaultPythonSnippets")
  .filter((path) => path.endsWith(".md"))
  .map((path) => {
    const raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
    const metadata = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
    const code = raw.match(/^```python\n([\s\S]*?)^```/m)[1];
    return {
      ...metadata,
      code: [...(metadata.imports ?? []), "", code].join("\n"),
    };
  });
const python = process.env.PYTHON ?? "py";
const result = spawnSync(
  python,
  [...(process.env.PYTHON ? [] : ["-3"]), "scripts/verify-python.py"],
  { input: JSON.stringify(examples), encoding: "utf8" },
);
if (result.error) throw result.error;
process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");
process.exitCode = result.status ?? 1;
