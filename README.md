# Code Snippet Library

An offline Windows 10/11 desktop app for organizing, searching and copying code snippets across **11 languages**. Built with Tauri 2, React and TypeScript, with bundled Shiki syntax highlighting.

**Version 1.13.0 · 472 bundled snippets · Local Markdown files · No account required**

[GitHub repository](https://github.com/SirFunky/CodeSnippetLibrary) · [Verification results](VERIFICATION.md)

## Included languages

| Language   | Snippets |
| ---------- | -------: |
| Java       |       43 |
| Python     |       44 |
| C#         |       43 |
| C++        |       42 |
| C          |       42 |
| SQL        |       44 |
| TypeScript |       43 |
| JavaScript |       44 |
| Go         |       43 |
| Kotlin     |       42 |
| COBOL      |       42 |
| **Total**  |  **472** |

Each language has its own categories, tags, version filters, favorites and recently viewed list. SQL also has dialect and query/procedure filters, with **28 queries and 16 stored procedures**. SQL Server procedure examples document their schema requirements; they have been syntax-checked rather than executed against a server.

The collection includes a complete **Hello World starter for every language**, everyday string/number/date/collection tasks, and practical extras such as Unicode handling, checksums, byte operations, typed helpers and SQL reports. Examples describe their dependencies, sample inputs, error handling and limits.

## Features

- Search titles, tags, descriptions, categories and code; combine search with section-specific filters.
- Copy code with preserved indentation, with optional imports or headers where applicable.
- Create and edit snippets as Markdown with validated YAML metadata and a highlighted preview.
- Import/export Markdown, save favorites and reopen recently viewed examples.
- Use dark, light or system appearance, adjustable code font sizes and resizable panels.
- Work offline with bundled runtime assets. The app does not execute snippets, connect to databases or send telemetry.

## Run on Windows

Build the Windows installer using the instructions below. The current installer is named `Code Snippet Library_1.13.0_x64-setup.exe` under `src-tauri/target/release/bundle/nsis/`. Install it and launch **Code Snippet Library** from the Start menu. The built `src-tauri/target/release/code-snippet-library.exe` also runs directly.

Java, Python, .NET, C/C++ compilers, database servers, TypeScript, Go, Kotlin, COBOL and Node are **not required to run the app**. Language toolchains are needed only for development verification of their examples.

Microsoft Edge WebView2 Runtime is required. Most Windows 10/11 installations already have it; the installer downloads it if missing. For a disconnected machine, install Microsoft's offline Evergreen WebView2 runtime first. The app itself works offline.

## Use the library

Switch sections using the language buttons in navigation. The active section and each section's category are remembered. New snippets use the active language, and imports are routed by their metadata. Related snippets can link across sections.

Open **Starter Templates → Hello World** to begin from a complete example. **Copy code** includes the starter's imports/headers, and its notes explain the filename and build/run command. **Use as template** opens an unsaved copy with a fresh ID and title; saving keeps the original starter intact. The SQL starter is a standalone SQLite query returning the greeting.

Find the expanded examples under **Everyday tasks** or **Practical extras** within task categories, or filter by the **everyday** and **practical** tags. Complete programs already contain their required imports/headers. Older fragments can use **Copy with imports** or **Copy with headers** as appropriate.

Use **New snippet** or **Ctrl+N** to create a snippet and **Ctrl+S** to save. Edit its metadata to change tags, category or subcategory; navigation updates automatically. Edit, export and delete controls are above the preview, and deletion requires confirmation. **Import snippets** accepts multiple Markdown files, reports failures individually and rejects duplicate IDs across the library.

## Storage, upgrades and backups

The desktop library uses ordinary UTF-8 `.md` files under the OS-resolved **Documents\Java Snippet Library** directory. That legacy folder name and the app identifier `dev.javasnippets.library` intentionally stay unchanged after the project rename, preserving existing installations. Other language sections use subfolders such as `Python/`, `CSharp/`, `Cpp/`, `C/`, `SQL/`, `TypeScript/`, `JavaScript/`, `Go/`, `Kotlin/` and `COBOL/`.

First launch seeds the bundled examples. Each added language/collection has an independent one-time migration: upgrades preserve existing paths, IDs, edits and previously deleted defaults. Deleted examples are not restored on normal launches. A customized library can therefore contain different totals from the bundled counts above. Starter, everyday and extra examples live under `Starters/`, `Everyday/` and `Extras/` in each section.

You can edit files outside the app, including in nested folders. Refresh happens on window focus, manually, or every eight seconds while visible. Invalid/unreadable files appear as library issues while valid snippets remain available. Stale saves are refused to avoid overwriting external changes; writes use temporary files and atomic replacement. Files must be UTF-8 and no larger than 2 MB. Symlinks and Windows reparse points in library paths are unsupported.

Back up the Markdown library folder to preserve your content. Preferences, favorites, recent history and panel widths are stored separately in `%APPDATA%\dev.javasnippets.library\preferences.json`; back up this directory too if you want your settings. Window placement is stored in the app configuration directory. Updating the app does not require deleting your library.

The browser preview uses separate browser-local storage and does not access desktop files. See Development below. Release-by-release implementation and verification notes are in [VERIFICATION.md](VERIFICATION.md).

## Markdown format

````markdown
---
id: files-read-text
title: Read a text file
description: Read UTF-8 text into a String.
category: Files & I/O
subcategory: Reading
tags: [file, read, nio]
javaVersion: 11
imports:
  - java.nio.file.Files
  - java.nio.file.Path
related: [files-lines]
---

```java
String content = Files.readString(Path.of("example.txt"));
```

## Notes

Throws IOException. Handle or declare it. Loads the entire file into memory.
````

Required fields: `id`, `title`, `description`, `category`, `tags` (may be empty), and the version fields for the language. `language` is `java`, `python`, `csharp`, `cpp`, `c`, `sql`, `typescript`, `javascript`, `go`, `kotlin` or `cobol`; omitted language defaults to Java for compatibility with existing files. Java uses integer `javaVersion` (8–99); Python uses a **quoted string** `pythonVersion` (such as `"3.9"` or `"3.10"`). C# requires quoted `csharpVersion` (such as `"8.0"` or `"12.0"`) and quoted `dotnetVersion` (such as `"8.0"`, modern .NET 5+). C++ requires integer `cppVersion`: 11, 14, 17, 20 or 23. Do not mix another language's version fields into the same file. Versions are compared by components, so Python 3.10 is newer than 3.9 and C# 12.0 is newer than 8.0.

IDs use lowercase letters, digits and single hyphens, maximum 180 characters, and must be unique across all sections. Optional: `subcategory`, `imports`, `related` (IDs), and `dependency` (text describing third-party requirements). Java imports contain qualified names without the `import` keyword or semicolon; static imports use `static package.Class.member`. Python imports are complete single-line statements, such as `import json` or `from pathlib import Path`; put each statement in its own list entry. C# imports are namespace/type names without `using` or a semicolon, such as `System.Linq` or `static System.Math`; copying adds the correct `using` directives.

For C++, use the `imports` list for header tokens such as `<vector>` or `"project/header.hpp"`, without `#include`. The preview labels these **Headers** and provides **Copy with headers**, which prepends the corresponding include directives. Copy code still copies only the primary snippet, with indentation preserved.

SQL uses `language: sql`, `sqlDialect` (`sqlserver`, `postgresql`, `mysql` or `sqlite`), `sqlKind` (`query` or `procedure`) and quoted `sqlVersion`. SQL Server versions use release years, such as `"2017"`; SQLite uses 3.x, such as `"3.25"`. PostgreSQL procedures require version 11+ and MySQL procedures require version 5+. SQLite has no stored procedures. SQL has no imports list; put schema requirements and setup instructions in notes. Do not combine SQL metadata with another language's version fields.

TypeScript uses `language: typescript`, quoted `typescriptVersion` (such as `"4.9"`), and fenced `typescript` blocks, optionally `typescript primary`. Its optional `imports` list contains complete single-line statements without semicolons, such as `import type { User } from "./models"`; Copy with imports adds semicolons. Put required local modules, packages and runtime/target assumptions in notes. Metadata validation checks import formatting, not module resolution or full TypeScript syntax. New TypeScript snippets start at version 4.9. Do not include other languages' version fields.

C uses `language: c`, integer `cVersion` (89, 99, 11, 17 or 23), and fenced `c` blocks, optionally `c primary`. Use 89 for ANSI C89/C90. Its `imports` list holds header tokens such as `<stdio.h>` or `"project/header.h"`, without `#include`. The Headers tab and Copy with headers work as in C++. Standards compare chronologically (C89, C99, C11, C17, C23), rather than by numeric value. New C snippets start at C11. Bundled examples are complete programs; copying only code omits includes, while Copy with headers produces the complete source. Do not combine C metadata with another language's version fields.

JavaScript uses `language: javascript`, integer `javascriptVersion` (an ECMAScript year from 2015 to 2099, such as 2020), and `javascript` fences, optionally `javascript primary`. This is a language/built-in version, not a browser or Node version. Document host APIs, packages and local modules in notes. Imports are complete single-line statements without semicolons, such as `import { greet } from "./greeting.js"`; Copy with imports adds semicolons. TypeScript type imports are not accepted for JavaScript. Metadata validation checks formatting, not full JavaScript syntax or module resolution. New snippets start at ES2020. No other language's version fields may be included.

Go uses `language: go`, quoted `goVersion` in 1.minor format (such as `"1.20"`), and `go` fences, optionally `go primary`. Its `imports` list contains unquoted package-path values such as `fmt` or `encoding/json`, without the `import` keyword, aliases or quotes inside the value. Copy with imports creates a grouped import block after a standalone package declaration. Without a package declaration it prepends the block to a declaration fragment; add the appropriate package declaration in your project. Put imports either in metadata or in code, and avoid duplicating them in both. For aliased imports, keep the complete import declaration in code. The Imports tab shows the grouped block. Metadata validation checks path formatting, not package existence or Go syntax. New Go snippets start at 1.20. Bundled examples are complete main packages; use Copy with imports for runnable source.

Kotlin uses `language: kotlin`, quoted `kotlinVersion` (major.minor, such as `"1.8"`), integer `jvmTarget` (8, 11, 17 or 21), and `kotlin` fences, optionally `kotlin primary`. The JVM target appears under At a glance; the version filter compares Kotlin language versions. Its `imports` list contains qualified names without `import` or semicolons, with optional `as` aliases, such as `java.time.LocalDate as Date`; wildcard imports are also accepted. Copy with imports inserts directives after a standalone package declaration, or prepends them when no package declaration is present. Use metadata imports or code imports without duplicating them. Document external libraries and platform assumptions in notes; bundled examples use only Kotlin/JVM standard libraries and the JDK, with no coroutine dependency. New Kotlin snippets start at 1.8/JVM 8. The 1.8 declarations are supported baselines rather than claims that every used feature first appeared in 1.8.

COBOL uses `language: cobol`, integer `cobolVersion` (1985, 2002, 2014 or 2023), `cobolFormat` (`fixed` or `free`), and `cobol` fences, optionally `cobol primary`. Free format requires a 2002-or-later standard. Standard years are language baselines rather than compiler product versions. Preserve fixed-format columns, including leading spaces: columns 1–6 are the sequence area, column 7 is the indicator, and source occupies columns 8–72. The bundled fixed-format programs leave columns 1–7 blank. Copy code preserves those spaces and does not add imports. COBOL has no metadata imports/Imports tab: keep COPY statements at the correct source location and document copybook/compiler/encoding requirements in notes. New snippets start as free-format COBOL 2002. Metadata validation checks the standard/format and fenced content, not vendor syntax or copybook availability.

Use fenced `java`, `python`, `csharp`, `cpp`, `c`, `sql`, `typescript`, `javascript`, `go`, `kotlin` or `cobol` blocks matching the snippet's language. The first matching block is copied by default; add **`primary`** after the language name (for example, **`sql primary`**) to explicitly choose it. Additional matching blocks appear separately in the preview. Copy code preserves indentation and omits frontmatter imports/headers. Copy with imports/headers adds language-appropriate directives above the primary block; SQL and COBOL offer only Copy code. Notes render as safe plain text, preserving Markdown source text and line breaks rather than executing HTML.

Example Python file:

````markdown
---
id: python-read-settings
language: python
title: Read settings as JSON
description: Load a UTF-8 JSON document.
category: Data formats
tags: [json, file]
pythonVersion: "3.5"
imports:
  - import json
  - from pathlib import Path
---

```python
settings = json.loads(Path("settings.json").read_text(encoding="utf-8"))
```

## Notes

The file must exist and contain valid JSON. Uses only the standard library.
````

Example C# file:

````markdown
---
id: csharp-hello
language: csharp
title: Print a message
description: Write a message to the console.
category: C# Basics
tags: [console]
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports:
  - System
---

```csharp
Console.WriteLine("Hello, C#!");
```
````

Example C++ file:

````markdown
---
id: cpp-hello
language: cpp
title: Print a message
description: Write a message to standard output.
category: C++ Basics
tags: [console]
cppVersion: 17
imports:
  - <iostream>
---

```cpp
std::cout << "Hello, C++!\n";
```
````

## Search and controls

- **Ctrl+K** focuses search; search spans title, tags, description, category and all matching code blocks, with weights in that order.
- Search and filters apply only to the active language section. Filter by category, tag, favorites or maximum supported version. For example, Java 11 compatible includes snippets requiring Java 8 or 11; Python 3.10 compatible includes examples requiring 3.9.
- Arrow keys, Home and End navigate focused results; Arrow Down in search moves focus into results. Escape clears search or returns focus to results.
- Star snippets to save favorites; Recently viewed keeps the last 30 IDs.
- Drag panel dividers to resize, or focus a divider and use left/right arrows. Collapse navigation with its upper-right control.
- Settings offers dark/light/system appearance and code font size. Theme changes apply immediately.

## Development

Prerequisites: Node.js 22.12+ with npm, stable Rust (MSVC target), Visual Studio 2022 C++ desktop build tools and Windows SDK, and WebView2. A JDK 21+ is only needed to verify the Java examples. Install packages once with network access:

```powershell
git clone https://github.com/SirFunky/CodeSnippetLibrary.git
cd CodeSnippetLibrary
npm ci
npm run desktop
```

If you already have a project-local Rust toolchain under ignored `.tools/`, the helper can use it without changing your system PATH. Toolchains are not included in the repository:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/desktop.ps1 dev
```

`npm run dev` starts a **browser preview** at `http://127.0.0.1:1420`. It uses browser localStorage for a separate demo library, and downloads exported files through the browser. It does not read the desktop library. Folder access is available in the desktop app. The production desktop build embeds all frontend assets and default Markdown files.

## Verification

```powershell
npm test                              # parser, validation, search, filters, persistence, CRUD, import/export
npm run build                         # strict TypeScript + production frontend
npm run test:ui                       # Edge end-to-end browser interactions
cargo test --manifest-path src-tauri/Cargo.toml
node scripts/verify-java.mjs           # javac --release at each declared minimum
npm run verify:python                  # development-only Python grammar and behavior checks
npm run verify:csharp                  # compile C# examples and assert behavior on their .NET target
npm run verify:cpp                     # MSVC standard-mode compilation and behavior checks
npm run verify:c                       # MSVC C11/C17 compilation and behavior checks
npm run verify:sql                     # SQLite fixture results + offline SQL Server syntax checks
npm run verify:typescript              # strict compiler checks and isolated behavior assertions
npm run verify:javascript              # Node syntax checks and isolated behavior assertions
npm run verify:go                      # Go compiler language-mode and output/file checks
npm run verify:kotlin                  # Kotlin language/API modes, JVM target and output/file checks
npm run verify:cobol                   # GnuCOBOL standard/source-format and output/file checks
npm run verify:starters                # compile/run all eleven complete Hello World templates
npm run verify:everyday                # check the 243 everyday examples
npm run verify:extras                  # check the 32 practical extras
```

Or run the Rust tests through `scripts/desktop.ps1 test`. Browser tests use installed Microsoft Edge. `verify-java.mjs` downloads the exact documented Jackson/OpenJFX jars into ignored `artifacts/` on its first run; it compiles all 36 Java snippets with explicit context variables. It does not execute external HTTP calls, SQL statements or JavaFX windows. Runtime database behavior requires your own JDBC driver/schema; network and UI examples require their normal external environment.

`verify:python` requires Python 3.9+ available through the Windows `py` launcher, or an interpreter path in the `PYTHON` environment variable. This development script checks Python grammar and runs the original 15 trusted examples with assertions and temporary test files. It verifies behavior on the installed interpreter, not every old minimum-version interpreter.

`verify:csharp` requires a .NET SDK supporting C# 12 plus the .NET 8 targeting pack and runtime. It compiles the original 15 C# examples with its declared `LangVersion` and `net8.0` target, then checks results with assertions and isolated file fixtures. It disables CLI telemetry and package sources, uses no NuGet dependencies and writes generated projects only under ignored `artifacts/`. Neither Java, Python nor C# snippets are ever executed by the library application.

`verify:cpp` runs on Windows with Visual Studio C++ Build Tools. The helper finds the existing installation using `vswhere` and sets up a local developer-command environment. It compiles the original 15 C++ examples using `/std:c++14`, `/std:c++17` or `/std:c++20` as declared, then checks results in isolated fixtures under ignored `artifacts/`. It does not install a compiler or download dependencies. MSVC has no strict C++11 mode, so this verifier makes no claim to test C++11 or C++23; the bundled examples use 14/17/20. C++ snippets are also never executed by the application.

`verify:sql` requires Python 3.9+ (`py -3` or `PYTHON`), a .NET SDK plus .NET 8 targeting/runtime packs, and Microsoft's ScriptDom DLL from SQL Server Management Studio 21. Set `SQL_SCRIPTDOM` to the DLL path for another installation. It checks nine trusted queries against isolated, in-memory SQLite fixtures and parses all six procedure definitions and their usage blocks with the SQL Server 2017 parser. It uses no NuGet packages or database service. Procedure execution, schema compatibility, permissions and transaction integration are not tested. The SQL snippets are never executed by the app.

`verify:typescript` uses the project-installed TypeScript compiler (5.7.3 in this workspace), strict mode, ES2020 and no third-party type packages. It compiles all 15 trusted examples with isolated local-module fixtures, then asserts their behavior in a JavaScript context under ignored `artifacts/`. The declared 4.9/5.0 supported baselines were not separately exercised with older compilers; these are supported baselines, not claims that every feature first appeared in that version. Verification is development-only and requires Node and npm dependencies.

`verify:c` requires the existing Visual Studio C++ Build Tools and uses `cl.exe /TC /std:c11` or `/std:c17`, with warnings treated as errors. It compiles the original 15 complete C programs, checks their output, and checks the written file in an isolated temporary fixture. `_CRT_SECURE_NO_WARNINGS` only suppresses Microsoft's deprecation warnings for standard C library calls during verification. It does not change app runtime. No exact C89/C99/C23 compiler modes are checked; these standards remain available for users' own metadata and filters. [Microsoft documents the C compiler standard modes](https://learn.microsoft.com/en-us/cpp/build/reference/std-specify-language-standard-version).

`verify:javascript` uses the installed Node runtime (22.15.0 in this workspace) to syntax-check and run assertions for all 15 trusted bundled examples, including success/error cases for validation and promises. It creates isolated ES module fixtures under ignored `artifacts/` and does not download packages or contact services. It does not test older runtime implementations or browser APIs. The declared ECMAScript years were reviewed against the language specifications; a successful Node check alone does not prove minimum-version compatibility. [ES2020 specification](https://tc39.es/ecma262/2020/) and [ES2022 specification](https://tc39.es/ecma262/2022/) describe the newer features used here. Execution is confined to this development script, never app runtime.

`verify:go` uses `GO_BINARY`, the ignored project-local `.tools/go/bin/go.exe`, or `go` on PATH. It compiles the 15 trusted examples with `-gcflags=-lang=go1.x` at each declared language version and checks program output plus written-file contents in isolated fixtures under ignored `artifacts/`. Standard libraries come from the installed compiler; separate old standard libraries/toolchains are not exercised. This workspace verified the examples using Go 1.27.4, downloaded from the official Go release list and checked against its published SHA-256. No global Go installation is needed. During verification, module downloads, automatic toolchain downloads, CGO and telemetry are disabled; caches and GOPATH remain under artifacts. The verifier is development-only. Newer library requirements are documented using the [Go 1.20](https://go.dev/doc/go1.20) and [Go 1.21](https://go.dev/doc/go1.21) release notes.

`verify:kotlin` requires an unpacked standalone Kotlin compiler in `.tools/kotlinc` or `KOTLIN_HOME`, and Java through `JAVA_BINARY`, `JAVA_HOME`, the detected local JDK 24 path, or PATH. This workspace uses Kotlin 2.2.21, downloaded from the official JetBrains release and verified against its published SHA-256, with JDK 24.0.1. It compiles all 15 trusted programs using each declared `-language-version`, `-api-version` and `-jvm-target`, then checks output and written-file contents in isolated fixtures under ignored `artifacts/`. It uses no Gradle build, dependency resolution or services. Older Kotlin distributions, older JVM runtimes, Android, Kotlin/Native and Kotlin/JS were not separately exercised. JVM 8 denotes the bytecode target; the behavior checks ran on Java 24. Compilation/execution remain development-only. See the [standalone compiler instructions](https://kotlinlang.org/docs/command-line.html) and [stable Kotlin 1.9 features](https://kotlinlang.org/docs/whatsnew19.html).

`verify:cobol` requires a portable GnuCOBOL Windows distribution in `.tools/cobol` or `COBOL_HOME`, including its C compiler, headers, libraries and runtime DLLs. This workspace uses the [contributor-maintained GnuCOBOL 3.2 Windows distribution](https://www.arnoldtrembley.com/GnuCOBOL.htm), with MinGW GCC 9.2, unpacked locally without a system installation. The script compiles all 15 trusted programs with `-std=cobol85`/`-std=cobol2002`, `-fixed`/`-free`, and warnings treated as errors. It checks output, fixed-column widths, and sequential-file bytes in isolated fixtures. These are GnuCOBOL/Windows checks; mainframe vendors, other encodings/file representations and COBOL 2023 were not tested. COBOL 1985 error branches display a message and stop without guaranteeing a nonzero process status. The app has no compiler/runtime dependency. See the [GnuCOBOL compiler manual](https://gnucobol.sourceforge.io/doc/gnucobol.html).

`verify:starters` checks every trusted Hello World source as a complete program and asserts exactly `Hello, World!` plus a newline. SQL is checked as an isolated in-memory SQLite query with its expected column and row. The Windows helper sets up the existing Visual Studio C/C++ toolchain; the script also uses the installed JDK, Python, .NET SDK/runtime, TypeScript/Node, and project-local Go, Kotlin and GnuCOBOL tools. Build products/caches stay under ignored `artifacts/`. It uses no third-party application packages or external services, and is never invoked by the desktop app. The existing per-language verifiers cover the older examples separately.

`verify:extras` uses the same development-only runner and local toolchains with `scripts/extra-cases.json` to check the new extras, including isolated SQLite results and syntax-only SQL Server procedures. Optional language arguments select a subset.

`verify:everyday` compiles/runs the trusted everyday programs and checks their sample output against `scripts/everyday-cases.json`. It uses the same local toolchains as the starter verifier, with no application dependencies or network services. SQLite queries are checked in fresh private in-memory databases; SQL Server procedures receive offline ScriptDom syntax checks only. No existing database is opened. Optional language arguments (for example `npm run verify:everyday -- c cpp`) select a subset. Declared language modes/API targets do not replace testing on actual older runtimes; see VERIFICATION.md for the tool versions used.

## Build a Windows installer

```powershell
npm run installer
# With this workspace's local Rust toolchain:
powershell -ExecutionPolicy Bypass -File scripts/desktop.ps1 build
```

Output: `src-tauri/target/release/bundle/nsis/`. The first build needs network access for Rust crates, NSIS and WebView2 packaging tools. Subsequent offline builds require those tools and dependencies to be cached. Release installers are unsigned; Windows may display SmartScreen until you sign releases with your own certificate. The installer is per user and does not require administrator access in the usual configuration.

## Architecture

- `src/models/`: snippet and preference types, language labels, import formatting and version comparisons.
- `src/services/`: safe YAML/Markdown parsing and platform storage adapter.
- `src/search/`: weighted Fuse index, filters and metadata-derived category tree.
- `src/components/`: shared Shiki code viewer and live Markdown editor.
- `src/hooks/`: keyboard focus containment for modals.
- `src/App.tsx`, `src/styles/`: three-panel interface, navigation and interactions.
- `src-tauri/`: library-scoped filesystem commands, atomic persistence, native export dialog, clipboard and window-state integration. No general filesystem or shell plugin is exposed to the frontend.
- `DefaultSnippets/`: 36 individually editable bundled Java examples. These are compiled into the executable and copied only during initialization.
- `DefaultPythonSnippets/`: 15 bundled Python examples, added once through their own upgrade marker.
- `DefaultCSharpSnippets/`: 15 bundled C# examples, added once to `CSharp/` through their own upgrade marker.
- `DefaultCSnippets/`: 15 C programs, added once to `C/` through an independent upgrade marker.
- `DefaultCppSnippets/`: 15 bundled C++ examples, added once to `Cpp/` through an independent upgrade marker.
- `DefaultSqlSnippets/`: nine SQLite queries and six SQL Server procedures, added once to `SQL/` through an independent upgrade marker.
- `ExtraSnippets/`: 32 practical examples, added once using an independent marker; produces 42-44 snippets per section, 472 total.
- `EverydaySnippets/`: 243 complete everyday programs/SQL examples, added once using an independent marker; formed the 40-per-language baseline before extras were added.
- `StarterSnippets/`: eleven complete Hello World programs and run instructions, added once to each section through an independent starter migration.
- `DefaultCobolSnippets/`: 15 COBOL programs, added once to `COBOL/` through an independent upgrade marker.
- `DefaultKotlinSnippets/`: 15 Kotlin/JVM programs, added once to `Kotlin/` through an independent upgrade marker.
- `DefaultGoSnippets/`: 15 Go programs, added once to `Go/` through an independent upgrade marker.
- `DefaultJavaScriptSnippets/`: 15 JavaScript examples, added once to `JavaScript/` through an independent upgrade marker.
- `DefaultTypeScriptSnippets/`: 15 TypeScript examples, added once to `TypeScript/` through an independent upgrade marker.
- `tests/`, `scripts/`: automated verification and packaging helpers.

Offline syntax highlighting includes Java, Python, C++, C, C#, SQL, TypeScript, JavaScript, Go, Kotlin, COBOL and two themes, using Shiki's JavaScript regex engine. The C++, C, SQL, TypeScript, JavaScript, Go, Kotlin and COBOL grammars are bundled locally and loaded on demand when their sections are viewed, preserving startup behavior for other sections. Vite may emit size warnings for the main bundle and C++ grammar-data chunk; no network fetch is needed at runtime. Notes are intentionally plain text. Search is in memory; the eight-second refresh rebuilds the index after external changes. The app is intended for a single local user/library, not collaborative editing or network shares. Browser preview storage is upgraded separately from the desktop library; each new language has its own initialization marker and preserves older sections.

COBOL uses a small project-owned TextMate grammar loaded by Shiki. It highlights core keywords, literals and fixed/free comment forms; it is a basic highlighter, not a compiler or a complete vendor-specific lexer. No highlighting assets are fetched at runtime.
