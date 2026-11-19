// Development-only verification of trusted bundled examples. Never used by app runtime.
import ts from "typescript";
import { parse } from "yaml";
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { runInNewContext } from "node:vm";
const assertions = {
  "ts-typed-function": 'check(greet("Ada", true) === "Hello, Ada!");',
  "ts-interface": 'check(user.name === "Ada" && user.email === undefined);',
  "ts-union":
    'check(describe({ok: true, value: 42}) === "Value: 42");\ncheck(describe({ok: false, error: "Missing"}) === "Missing");',
  "ts-type-guard":
    'check(isProfile({name:"Ada", age: 37}));\ncheck(!isProfile(null) && !isProfile({name:"Ada", age: "37"}) && !isProfile({name:"Ada", age: NaN}));',
  "ts-exhaustive":
    'check(area({kind:"rectangle",width:3,height:4}) === 12);\ncheck(area({kind:"circle",radius:2}) === 4*Math.PI);',
  "ts-generic-property":
    'check(name === "Ada");\nconst typedName: string = name;',
  "ts-group-by":
    'const groups = groupBy([{team:"a",id:1},{team:"b",id:2},{team:"a",id:3}], x => x.team);\ncheck(groups.get("a")?.length === 2 && groups.get("b")?.[0].id === 2);\ncheck(groupBy([], x => x).size === 0);',
  "ts-partial-update":
    'const old: Settings = {theme:"dark",fontSize:13};\nconst updated = updateSettings(old, {fontSize:16});\ncheck(updated.fontSize === 16 && updated.theme === "dark" && old.fontSize === 13);',
  "ts-satisfies": 'check(green === "#00FF00" && palette.red[0] === 255);',
  "ts-type-import": 'check(displayName === "Ada");',
  "ts-template-types": 'check(label("emailChanged") === "email changed");',
  "ts-mapped-type": 'check(draft.name === "Ada" && draft.email === null);',
  "ts-immutable-update":
    "const old: readonly Item[] = [{id:1,done:false},{id:2,done:false}];\nconst updated = markDone(old, 1);\ncheck(updated[0].done && !updated[1].done && !old[0].done);\ncheck(updated[1] === old[1]);",
  "ts-const-generic":
    'const exactHome: "/" = routes.home;\ncheck(exactHome === "/" && routes.settings === "/settings");',
  "ts-const-tuple":
    'const exactPoint: readonly ["origin", 0, 0] = point;\ncheck(exactPoint[0] === "origin" && exactPoint.length === 3);',
};
const root = resolve("artifacts/typescript-verification");
mkdirSync(root, { recursive: true });
const model = join(root, "models.ts");
writeFileSync(model, "export interface User { id: number; name: string }\n");
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
let count = 0;
for (const file of files("DefaultTypeScriptSnippets").filter((f) =>
  f.endsWith(".md"),
)) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const metadata = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const code = raw.match(/^```typescript(?: primary)?\n([\s\S]*?)^```/m)[1];
  const assertion = assertions[metadata.id];
  if (!assertion) throw new Error("Missing assertions: " + metadata.id);
  const source =
    (metadata.imports ?? []).map((line) => line + ";").join("\n") +
    "\n" +
    code +
    "\nfunction check(ok: boolean): void { if (!ok) throw new Error('Assertion failed'); }\n" +
    assertion +
    "\nexport {};\n";
  const path = join(root, metadata.id + ".ts");
  writeFileSync(path, source);
  const options = {
    strict: true,
    noEmitOnError: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    types: [],
    skipLibCheck: false,
  };
  const program = ts.createProgram([path, model], options);
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
  runInNewContext(
    readFileSync(path.replace(/\.ts$/, ".js"), "utf8"),
    { exports: {} },
    { timeout: 1000, filename: path },
  );
  console.log("PASS " + metadata.id);
  count++;
}
if (count !== Object.keys(assertions).length)
  throw new Error("Example/assertion count mismatch");
console.log(
  `Verified ${count} TypeScript examples with strict TypeScript ${ts.version}, ES2020, and behavior assertions. Older compiler baselines were not separately executed.`,
);
