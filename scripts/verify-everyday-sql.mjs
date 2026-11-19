// Development-only checks. Never connects to an existing database or runs in the app.
import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
const root = resolve(
  process.argv[2]?.startsWith("Extra")
    ? "artifacts/extra-sql-verification"
    : "artifacts/everyday-sql-verification",
);
mkdirSync(root, { recursive: true });
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}
const examples = files(process.argv[2] ?? "EverydaySnippets/SQL")
  .filter((path) => path.endsWith(".md"))
  .map((path) => {
    const raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n"),
      metadata = parse(raw.match(/^---\n([\s\S]*?)\n---/)[1]);
    const blocks = [
      ...raw.matchAll(/^```sql(?: primary)?\n([\s\S]*?)^```/gm),
    ].map((match) => match[1]);
    return { ...metadata, blocks };
  });
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.stdout.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
    throw new Error(`${command} failed (${result.status}).`);
  }
  return result.stdout;
}
const scriptDom =
  process.env.SQL_SCRIPTDOM ??
  join(
    process.env.ProgramFiles ?? "C:\\Program Files",
    "Microsoft SQL Server Management Studio 21",
    "Release",
    "Common7",
    "IDE",
    "Extensions",
    "Application",
    "Microsoft.SqlServer.TransactSql.ScriptDom.dll",
  );
if (!existsSync(scriptDom))
  throw new Error(
    "Set SQL_SCRIPTDOM to a Microsoft.SqlServer.TransactSql.ScriptDom.dll supporting TSql140Parser (for example from SSMS 21). No database connection is needed.",
  );
const xml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
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
writeFileSync(
  join(root, "Verify.csproj"),
  `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable><NuGetAudit>false</NuGetAudit></PropertyGroup><ItemGroup><Reference Include="Microsoft.SqlServer.TransactSql.ScriptDom"><HintPath>${xml(resolve(scriptDom))}</HintPath><Private>true</Private></Reference></ItemGroup></Project>`,
);
writeFileSync(
  join(root, "Program.cs"),
  `using System.Text.Json;
using Microsoft.SqlServer.TransactSql.ScriptDom;
using var payload = JsonDocument.Parse(Console.In.ReadToEnd());
int count = 0;
foreach (var example in payload.RootElement.EnumerateArray()) {
    string id = example.GetProperty("id").GetString()!;
    if (example.GetProperty("sqlVersion").GetString() != "2017") throw new Exception("Select a matching parser for " + id);
    var parser = new TSql140Parser(true);
    foreach (var block in example.GetProperty("blocks").EnumerateArray()) {
        using var reader = new StringReader(block.GetString()!);
        parser.Parse(reader, out var errors);
        if (errors.Count > 0) throw new Exception(id + ": " + string.Join("; ", errors.Select(e => $"Line {e.Line}, column {e.Column}: {e.Message}")));
    }
    Console.WriteLine("PASS SQL Server 2017 syntax (not executed): " + id);
    count++;
}
Console.WriteLine($"Syntax-checked {count} SQL Server stored procedures and all usage blocks. No database connection was opened.");
`,
);
run(
  "dotnet",
  [
    "build",
    "Verify.csproj",
    "--configuration",
    "Release",
    "--nologo",
    "--verbosity",
    "quiet",
  ],
  { cwd: root, env },
);
process.stdout.write(
  run("dotnet", [join(root, "bin", "Release", "net8.0", "Verify.dll")], {
    cwd: root,
    env,
    input: JSON.stringify(
      examples.filter((example) => example.sqlDialect === "sqlserver"),
    ),
  }),
);
