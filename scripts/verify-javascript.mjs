// Development-only checks of trusted bundled examples, never imported by the app.
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const checks = {
  "js-filter-map":
    "assert.deepEqual(doubled, [2, 6]); assert.deepEqual(values, [-2, 1, 0, 3]);",
  "js-unique-values": "assert.deepEqual(unique, [3, 1, 2]);",
  "js-group-items":
    'const grouped = groupBy([{team:"a",id:1},{team:"b",id:2},{team:"a",id:3}], item => item.team); assert.deepEqual(grouped.get("a").map(item => item.id), [1,3]); assert.equal(groupBy([], item => item).size, 0);',
  "js-numeric-sort":
    "assert.deepEqual(sorted, [1,2,10]); assert.deepEqual(values, [10,2,1]);",
  "js-immutable-update":
    'assert.equal(updated.settings.theme, "light"); assert.equal(original.settings.theme, "dark"); assert.notEqual(updated.settings, original.settings);',
  "js-validate-json":
    'assert.deepEqual(parseProfile(\'{"name":"Ada","age":37}\'), {name:"Ada",age:37}); assert.throws(() => parseProfile("null"), TypeError); assert.throws(() => parseProfile(\'{"name":"Ada","age":"37"}\'), TypeError); assert.throws(() => parseProfile("{"), SyntaxError);',
  "js-destructure": 'assert.equal(message, "dark: 16");',
  "js-object-entries":
    "assert.deepEqual(doubled, {apple:4,pear:6}); assert.deepEqual(prices, {apple:2,pear:3});",
  "js-optional-chaining":
    'assert.equal(cityOf({address:{city:"Stockholm"}}), "Stockholm"); assert.equal(cityOf(null), undefined); assert.equal(cityOf({}), undefined);',
  "js-nullish-default":
    "assert.equal(configuredLimit({limit:0}), 0); assert.equal(configuredLimit({limit:null}), 10); assert.equal(configuredLimit({}), 10); assert.equal(configuredLimit({limit:false}), false);",
  "js-async-function":
    'assert.deepEqual(await loadSummary(async () => ({name:"Ada"}), async () => 3), {user:{name:"Ada"},count:3}); await assert.rejects(() => loadSummary(async () => {throw new Error("failed");}, async () => 3), /failed/);',
  "js-settled-promises":
    'const results = await collectResults([Promise.resolve(42), Promise.reject(new Error("failed"))]); assert.equal(results[0].status,"fulfilled"); assert.equal(results[0].value,42); assert.equal(results[1].status,"rejected"); assert.equal(results[1].reason.message,"failed"); assert.deepEqual(await collectResults([]), []);',
  "js-relative-index":
    "assert.equal(lastItem([1,2,3]),3); assert.equal(lastItem([]),undefined); assert.equal(lastItem([undefined]),undefined);",
  "js-own-property":
    'assert.equal(hasTheme,true); assert.equal(hasToString,false); assert.equal(Object.hasOwn({theme:undefined}, "theme"),true);',
  "js-module-import": 'assert.equal(message, "Hello, Ada!");',
};
const root = resolve("artifacts/javascript-verification");
mkdirSync(root, { recursive: true });
writeFileSync(join(root, "package.json"), JSON.stringify({ type: "module" }));
writeFileSync(
  join(root, "greeting.js"),
  "export function greet(name) { return `Hello, ${name}!`; }\n",
);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}
let count = 0;
for (const file of files("DefaultJavaScriptSnippets").filter((f) =>
  f.endsWith(".md"),
)) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
    m = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
  const blocks = [
    ...raw.matchAll(/^```javascript(?: primary)?\n([\s\S]*?)^```/gm),
  ];
  if (blocks.length !== 1)
    throw new Error("Update verifier for multiple blocks: " + m.id);
  if (!(m.id in checks)) throw new Error("Missing assertions: " + m.id);
  const source =
    'import assert from "node:assert/strict";\n' +
    (m.imports ?? []).map((line) => line + ";").join("\n") +
    "\n" +
    blocks[0][1] +
    "\n" +
    checks[m.id] +
    "\n";
  const path = join(root, m.id + ".mjs");
  writeFileSync(path, source);
  for (const args of [["--check", path], [path]]) {
    const result = spawnSync(process.execPath, args, {
      encoding: "utf8",
      cwd: root,
      timeout: 5000,
    });
    if (result.error) throw result.error;
    if (result.status !== 0)
      throw new Error(m.id + ": " + result.stdout + result.stderr);
  }
  console.log(`PASS ES${m.javascriptVersion}: ${m.id}`);
  count++;
}
if (count !== Object.keys(checks).length)
  throw new Error("Example/assertion count mismatch");
console.log(
  `Verified ${count} JavaScript examples with Node ${process.version}, syntax checks and behavior assertions. Older ECMAScript runtimes and browsers were not separately exercised.`,
);
