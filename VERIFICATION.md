# Verification

## Version 1.13.0 - November 19, 2026

- Added **32 practical extras**, two to four per language, bringing the bundled library to **472 snippets**. Section totals now vary: Java 43, Python 44, C# 43, C++ 42, C 42, SQL 44, TypeScript 43, JavaScript 44, Go 43, Kotlin 42 and COBOL 42. Existing default, everyday and starter sources are unchanged. SQL totals are 28 queries and 16 procedures.
- **285 frontend tests passed**, including validation of all 472 snippets, exact per-language totals, unique IDs, verification-manifest coverage for every extra, and an upgrade from the previous 440-example library that preserves raw contents, occupied paths/IDs and subsequent edits/deletions. Earlier collection tests retain a separate 440-example baseline without installing extras.
- **53 Rust tests passed**, including independent extras seeding, preservation of earlier content, existing-ID/occupied-path handling and no reseeding of edited/deleted extras. Native metadata validation covers the new bundled files. Changed Rust was formatted with rustfmt.
- **All 15 Edge end-to-end tests passed** against the production build. The new test finds, highlights and copies one complete extra in every section, compares clipboard content with bundled source and checks section persistence. Existing flows pass with varied counts and updated version/query/procedure filters.
- **All 32 new verification cases passed** through `npm run verify:extras`: 28 complete programs produced exact expected output, two SQLite queries matched expected rows in private in-memory databases, and two SQL Server 2017 procedures passed offline ScriptDom syntax checks. Procedures were not deployed, executed, schema-bound or tested for permissions/concurrency against a server. No existing database was opened.
- Used the existing local toolchains: JDK 24.0.1 at Java release 8; Python 3.13.7; MSVC C11/C++14 with warnings as errors; .NET SDK 9.0.302 with C# 8/.NET 8; strict TypeScript 5.7.3/ES2020 and Node 22.15; Go 1.27.4 in Go 1.20 language mode; Kotlin 2.2.21 at language/API 1.8 and JVM 8 bytecode on Java 24; GnuCOBOL 3.2.0 in COBOL 2002 free format with warnings as errors; SQLite 3.50.4. Older runtimes, older Go standard libraries and other COBOL vendors were not separately tested. Runtime compilation/execution remains outside the app.
- **Every existing per-language verifier passed**, including all 36 Java compile-time cases and the Python, C#, C++, C, SQL, TypeScript, JavaScript, Go, Kotlin and COBOL checks. The shared verifier's original collection mode also passed 48 JavaScript/SQL everyday cases, including eight syntax-only procedures, after adding extras selection.
- **Windows release executable and NSIS installer built successfully**, producing `Code Snippet Library_1.13.0_x64-setup.exe`. The installer is unsigned and was not installed over an older release during verification.
- **Strict TypeScript and production Vite build passed**. Vite emits size warnings for the approximately 929 KB main bundle and 638 KB C++ grammar chunk. The independent `extras-initialized-v1` marker (browser `jsl.extras-initialized.v1`) preserves all older markers, edits/deletions, app identity, configuration and library paths. Runtime assets remain bundled and offline.

Browser checks use browser-local persistence and clipboard APIs; native tests verify disk operations. These do not test native dialogs or the clipboard plugin through Edge.

## Version 1.12.0 - November 19, 2026

- Added **243 everyday examples**, giving **40 snippets in each of 11 languages, 440 total**. Existing default collections and Hello World starters are unchanged. SQL now contains 26 queries and 14 stored procedures. Each new console example is complete source with imports/headers and sample input; notes document bounds, error behavior and assumptions.
- **282 frontend tests passed**. New coverage checks all 440 snippets, per-language counts, globally unique identities, exact verification-manifest coverage, SQL query/procedure coverage, one-time upgrades from the previous 197-example library, byte-preserved older files, occupied paths/IDs, and preservation of edits and deletions after subsequent loads.
- **51 Rust tests passed**, including the new additive collection migration, existing-file preservation, occupied-path/ID reservation and preservation of later edits/deletions. Native migrations validate all bundled metadata before copying. Changed Rust was formatted with rustfmt.
- **All 14 Edge end-to-end tests passed** against the final production build. The new workflow browses all eleven 40-example sections, finds a new everyday example in each, verifies highlighting, compares copied complete source with the bundled file, and checks section persistence. Existing language workflows, filters, CRUD/import/export, favorites, templates, themes and minimum layouts still pass with the expanded counts.
- **All 243 new verification cases passed** using `npm run verify:everyday`: 219 complete programs compiled/interpreted and produced the exact expected output, 16 read-only SQLite queries matched expected result rows in separate private in-memory databases, and eight SQL Server 2017 procedures passed offline Microsoft ScriptDom `TSql140Parser` syntax checks. SQL Server procedures were **not executed**, bound to a schema, or tested for permissions/concurrency against a server. No existing database was opened.
- Toolchains: JDK 24.0.1 (`--release 8` for new Java examples); Python 3.13.7; local MSVC C11/C++14 with `/W4 /WX`; .NET SDK 9.0.302 with C# 8/.NET 8 and no NuGet sources; strict TypeScript 5.7.3 targeting ES2020 and Node 22.15.0; Go 1.27.4 in declared Go 1.20 language mode with downloads, telemetry and CGO disabled; Kotlin 2.2.21 at language/API 1.8 and JVM 8 bytecode target on Java 24; GnuCOBOL 3.2.0 in COBOL 2002 free format with warnings treated as errors; SQLite 3.50.4. Older Python/TypeScript/ECMAScript runtime implementations, older Go standard libraries, older JVMs and other COBOL vendors were not separately exercised.
- **Every existing per-language verifier also passed**: 36 Java compile-time cases and the existing Python, C#, C++, C, TypeScript, JavaScript, Go, Kotlin, COBOL and isolated SQL checks. These remain development-only; the desktop app never compiles or runs snippets.
- **Strict TypeScript, production Vite build, Windows release executable and NSIS installer passed**, producing `Code Snippet Library_1.12.0_x64-setup.exe`. Vite's size warnings remain for the approximately 891 KB main bundle and 638 KB C++ grammar chunk. The installer is unsigned and was not installed over an earlier release during verification.
- The separate `everyday-initialized-v1` migration (browser `jsl.everyday-initialized.v1`) preserves older collection markers, user paths/IDs, preferences and app identity. A customized library can contain fewer or more than forty entries per language. Runtime assets remain bundled and offline.

Edge uses browser-local persistence and clipboard APIs; Rust tests exercise disk operations. These do not claim native dialog or clipboard-plugin integration testing.

## Version 1.11.0 — November 19, 2026

- Added **11 complete Hello World starters**, one per language, bringing the bundled library to 197 snippets. Source includes its required imports/headers, and notes explain filenames, build/run commands and runtime assumptions. SQL supplies a table-free SQLite query.
- **279 frontend unit tests passed**, including complete starter metadata/coverage, one-time installation, ID/path reservation, preservation of edits/deletions, independent template copying and retention of code, notes and extra metadata. The editor captures its initial draft once so generated IDs and discard checks remain stable.
- **49 Rust tests passed**, including starter installation into each section's existing path, preservation of earlier files and markers, occupied-path/ID handling, and no restoration of edited/deleted starters. Changed Rust code was formatted with rustfmt.
- **All thirteen Edge end-to-end tests passed**, plus a final starter workflow rerun for theme screenshots. The new test browses all eleven starters, copies complete source, opens template drafts, saves a modified Java copy and confirms the original remains unchanged. It also checks persistence and the template action at minimum window size. Existing section workflows pass with updated counts. Starter dark/light screenshots were visually inspected.
- **All eleven starters produced exactly Hello, World!** (newline for console programs; expected message column/row for the in-memory SQLite query). Java compiled with JDK 24 at release 8 and ran on Java 24; C/C++ used MSVC C11/C++14; C# used C# 8/.NET 8; TypeScript used strict TypeScript 5.7.3/ES2020 and Node 22.15; JavaScript ran on Node 22.15; Python used the installed Python 3.13 interpreter; Go used its declared 1.20 language mode; Kotlin used its declared 1.8 language/API mode and JVM 8 bytecode target on Java 24; COBOL used GnuCOBOL 3.2 in COBOL 2002 free format. Older runtime implementations were not separately exercised.
- **Every existing per-language verifier also passed**: Java compilation, Python/C#/C++/C/TypeScript/JavaScript/Go/Kotlin/COBOL behavior checks, nine SQLite query checks and six SQL Server procedure syntax checks. SQL Server procedures were not executed against a server.
- **Strict TypeScript, production Vite build, Windows executable and NSIS installer passed** (`Code Snippet Library_1.11.0_x64-setup.exe`). Expected Vite size warnings remain for the approximately 589 KB main bundle and 638 KB C++ grammar chunk. The installer is unsigned; installation over an older release was not exercised.
- Starters have their own native/browser initialization marker, preserving earlier paths, IDs, edits, deletions, preferences and app identity. Use as template saves a new snippet rather than overwriting its source. Compilation/execution occur only in development verification; the application never runs snippets.

Browser tests use browser-local persistence; Rust tests exercise actual disk operations. Native dialogs and the clipboard plugin are not tested through Edge.

## Version 1.10.0 — November 19, 2026

- **275 frontend unit tests passed**, including COBOL standard/source-format validation, mixed-language/import rejection, multiple/primary fences, column-preserving copying, section/version/favorites filters, preferences, CRUD/conflicts, upgrade preservation and globally unique IDs across 186 snippets. A separate Shiki test checks the project-owned grammar and HTML escaping in both themes.
- **47 Rust tests passed**, including COBOL metadata/format/fence validation, native disk CRUD/conflicts, ID reservation and independent one-time seeding preserving earlier sections and later edits/deletions. Changed Rust code was formatted with rustfmt.
- **All twelve Edge end-to-end tests passed** against the production frontend. COBOL checks cover 1985 versus 2002 filtering, highlighting, exact leading columns on the clipboard, hidden Imports UI, favorites/persistence, creation/editing, cross-section import/export, deletion, invalid metadata, minimum window size and collapsed navigation. Existing language flows also pass. COBOL dark/light screenshots were visually inspected.
- **All 15 COBOL programs compiled with warnings treated as errors and passed output checks using GnuCOBOL 3.2.0/MinGW GCC 9.2 on Windows**. Thirteen use `-std=cobol85 -fixed`; two use `-std=cobol2002 -free`. Fixed-column widths and sequential-file bytes were checked with isolated fixtures. The contributor-maintained portable toolchain was unpacked under ignored `.tools/cobol`, without a system installation. COBOL 1985 error branches print a message and stop without guaranteeing a nonzero exit status. Other vendors, mainframes, character encodings/file representations and COBOL 2023 were not tested.
- **Strict TypeScript and production Vite build passed**. A basic project-owned COBOL TextMate grammar is bundled and loaded lazily by Shiki; no runtime grammar download is used. Vite emits size warnings for the approximately 576 KB main bundle and 638 KB C++ grammar chunk.
- **Version 1.10.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.10.0_x64-setup.exe`), including the final tested fix for highlighting hyphenated identifiers. The installer is unsigned; installation over an earlier release was not exercised.
- Earlier storage/configuration paths, app identity, preference keys and upgrade markers remain compatible. COBOL defaults use their own one-time marker. The app does not compile/run COBOL or resolve copybooks; compilation/execution are confined to development checks of trusted defaults.

Browser checks use browser-local storage; Rust tests exercise native disk operations. Native dialogs and the clipboard plugin are not tested through Edge.

## Version 1.9.0 — November 19, 2026

- **248 frontend unit tests passed**, including Kotlin quoted language versions, integer JVM targets, qualified/aliased imports, mixed-language rejection, primary/multiple fences, package-aware copying, component version comparisons, preferences, CRUD/conflicts, ID reservation, upgrades preserving earlier content/edits/deletions, and globally unique IDs across 171 snippets.
- **43 Rust tests passed**, including Kotlin version/target/import/fence validation, native disk CRUD/conflicts, ID reservation and independent one-time seeding preserving older sections and later edits/deletions. Changed Rust code was formatted with rustfmt.
- **All eleven Edge end-to-end tests passed** against the production frontend. Kotlin checks cover 1.8 versus 1.9 filters, highlighting, package-aware imports on the clipboard, favorites/persistence, creation/editing, cross-section import/export, deletion, invalid metadata, minimum window size and collapsed navigation. The two-column language selector passed existing language workflows. Kotlin dark/light screenshots were visually inspected.
- **All 15 Kotlin/JVM examples compiled and passed output checks with Kotlin 2.2.21 and Java 24.0.1**, using declared Kotlin language/API modes and JVM 8 bytecode targets. The official standalone compiler archive was verified against its published SHA-256 and installed only under ignored `.tools/`. File examples used isolated fixtures and the writer's output bytes were checked. No Gradle/dependency downloads or external services were used. Separate older Kotlin distributions/JVM runtimes, Android, Native and JS targets were not exercised; JVM 8 denotes bytecode target, not an actual Java 8 runtime test.
- **Strict TypeScript and production Vite build passed**. Kotlin highlighting is bundled locally and loads on demand. Vite emits size warnings for the approximately 556 KB main bundle and 638 KB C++ grammar chunk; runtime network access is not required.
- **Version 1.9.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.9.0_x64-setup.exe`). The installer is unsigned; installation over an earlier release was not exercised.
- Earlier storage/configuration paths, app identity, preference keys and upgrade markers remain compatible. Kotlin defaults have their own one-time marker. Compilation/execution remain confined to development verification of trusted defaults; the application never executes Kotlin snippets.

Browser checks use browser-local persistence; Rust tests exercise native disk operations. Native dialogs and the clipboard plugin are not tested through Edge.

## Version 1.8.0 — November 19, 2026

- **217 frontend unit tests passed**, including Go quoted-version/import-path validation, mixed-language rejection, primary/multiple fences, package-aware copying, component version comparisons, section/favorites filters, preferences, CRUD/conflicts, upgrades preserving earlier content/edits/deletions, and globally unique IDs across 156 snippets.
- **39 Rust tests passed**, including Go validation, native disk CRUD/conflicts, ID reservation and independent one-time Go seeding preserving older sections and later edits/deletions. Changed Rust code was formatted with rustfmt.
- **All ten Edge end-to-end tests passed** against the production frontend. Go checks cover 1.20 versus 1.21 filtering, highlighting, package-aware copied imports, favorites/persistence, creation/editing, cross-section import/export, deletion, invalid metadata, minimum window size and collapsed navigation. Existing language workflows also pass. Go dark/light screenshots were visually inspected.
- **All 15 Go examples compiled at their declared language modes and passed output checks with Go 1.27.4**, installed only under ignored `.tools/` from an official archive verified against its published SHA-256. File examples used isolated fixtures and the writer's output bytes were checked. The compiler uses `-gcflags=-lang=go1.x`; its standard library is current, so separate older toolchain/library compatibility was not exercised. Verification disables module/toolchain downloads and CGO, with caches and GOPATH under artifacts. The final run used an isolated telemetry directory with mode `off`; `go env` confirmed that mode and directory.
- **Strict TypeScript and production Vite build passed**. Go highlighting is bundled locally and loads on demand. Vite emits size warnings for the approximately 538 KB main bundle and 638 KB C++ grammar chunk; no runtime network connection is needed.
- **Version 1.8.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.8.0_x64-setup.exe`). The installer is unsigned; installation over an earlier release was not exercised.
- Earlier library/configuration paths, app identity, preference keys and upgrade markers remain compatible. Go defaults have their own initialization marker. The application never compiles or executes Go; only the separate development verifier runs trusted bundled programs.

Browser checks use browser-local storage; Rust tests exercise native disk operations. Native dialogs and the clipboard plugin are not tested through Edge.

## Version 1.7.0 — November 19, 2026

- **189 frontend unit tests passed**, including JavaScript integer ECMAScript-year/import validation, mixed-language rejection, primary/multiple fences, section/version/favorites filters, preferences, CRUD/conflicts, ID reservation, upgrades preserving older content/edits/deletions, and globally unique IDs across 141 snippets.
- **35 Rust tests passed**, including JavaScript metadata/import/fence validation, native CRUD/conflicts, ID reservation and one-time installation preserving earlier sections and later edits/deletions. Changed Rust code was formatted with rustfmt.
- **All nine Edge end-to-end tests passed** across the suite and final JavaScript rerun. JavaScript checks include ES2020 versus ES2022 filters, highlighting, copying module imports, favorites/persistence, creation/editing, cross-section import/export, deletion, invalid year metadata, minimum window size and collapsed navigation. Existing language workflows also pass. JavaScript dark/light screenshots were visually inspected.
- **All 15 JavaScript examples passed Node 22.15.0 syntax checks and behavior assertions**, with isolated ES module fixtures, no downloaded dependencies or service calls. Checks include JSON validation failure paths and rejected/fulfilled promises. Declared ECMAScript years were reviewed against the language specifications; older runtimes and browser APIs were not separately tested. A modern Node run alone does not prove minimum-version compatibility.
- **Strict TypeScript and production Vite build passed**. JavaScript highlighting is bundled locally and loaded on demand. Vite emits size warnings for the approximately 523 KB main bundle and 638 KB C++ grammar chunk; runtime network access is not required.
- **Version 1.7.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.7.0_x64-setup.exe`). The installer is unsigned; installation over an earlier release was not exercised.
- Legacy storage/configuration paths, app identity, preference keys and earlier markers remain compatible. JavaScript defaults have their own one-time marker. The app never runs JavaScript snippets or resolves their imports; execution is confined to development verification of trusted defaults.

Edge checks use browser-local storage; Rust tests exercise disk operations. Native dialogs and the clipboard plugin are not exercised through Edge.

## Version 1.6.0 — November 19, 2026

- **166 frontend unit tests passed**, including C integer-standard/header validation, wrong-language and primary fences, chronological C89/C99/C11/C17/C23 comparisons, section/favorites filters, preferences, lossless CRUD/import/export, ID reservation, safe one-time upgrades and globally unique IDs across all 126 bundled snippets.
- **31 Rust tests passed**, including native C validation, CRUD/conflicts, ID reservation and one-time C seeding preserving earlier sections and subsequent edits/deletions. Changed Rust code was formatted with rustfmt.
- **All eight Edge end-to-end tests passed** against the production frontend. C checks include separate navigation, chronological standard choices, C11 versus C17 filters, highlighting, Copy with headers, favorites/persistence, creation/editing, cross-section import/export, deletion, invalid standard metadata, minimum window size and collapsed navigation. Existing language workflows also pass. C dark/light screenshots were visually inspected.
- **All 15 bundled C programs compiled and passed output assertions with MSVC in their declared C11/C17 modes** (`/TC`, `/W4`, `/WX`). File examples used isolated fixtures; the writer's resulting bytes were checked. `_CRT_SECURE_NO_WARNINGS` suppresses Microsoft deprecation warnings for standard C calls during this development check. No exact C89/C99/C23 compiler modes were tested. Two examples declare C17 as a supported baseline without claiming C17-only syntax.
- **Strict TypeScript and production Vite build passed**. C highlighting is bundled locally and loaded on demand. Vite emits size warnings for the approximately 509 KB main bundle and 638 KB C++ grammar chunk; no runtime CDN or network access is required.
- **Version 1.6.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.6.0_x64-setup.exe`). The installer is unsigned; installation over an earlier release was not exercised.
- Storage/configuration paths, app identity, earlier preference keys and upgrade markers stay compatible. C defaults use their own initialization marker. The app does not compile or execute C; compiler invocation is confined to development verification.

Browser tests use browser-local persistence; Rust tests exercise native disk operations. Native dialogs and the clipboard plugin are not tested through Edge.

## Version 1.5.0 — November 19, 2026

- **136 frontend unit tests passed**, including TypeScript metadata/import validation, lossless primary/multiple-block parsing, numeric compiler-version filters, preferences, CRUD/conflicts, globally unique IDs across 111 snippets, and upgrades preserving earlier content, edits and deletions.
- **27 Rust tests passed**, including TypeScript quoted-version/import/fence validation, native disk CRUD/conflicts, ID reservation, and one-time seeding that preserves older sections and user edits/deletions.
- **All seven Edge end-to-end tests passed** across the suite and the final TypeScript rerun. TypeScript checks cover section isolation, 4.9 versus 5.0 filtering, bundled highlighting, type imports on the clipboard, favorites/persistence, creation/editing, cross-section import/export, deletion, invalid metadata, minimum window size and collapsed navigation. Dark/light TypeScript screenshots were visually inspected.
- **All 15 bundled TypeScript examples compiled in strict mode with TypeScript 5.7.3 and passed behavior assertions**, using ES2020 and isolated local-module fixtures. The verifier treats each example as an independent module. Declared 4.9/5.0 supported baselines were not separately exercised with older compilers; these declarations do not claim every feature first appeared in that release.
- **Strict TypeScript and production Vite build passed**. The TypeScript grammar is bundled locally and loads on demand, with no CDN/runtime network dependency. Vite's existing C++ grammar size warning remains.
- **Version 1.5.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.5.0_x64-setup.exe`). The installer is unsigned; installation over an earlier release was not exercised.
- Earlier storage/configuration paths, app identity, preference keys and upgrade markers remain compatible. TypeScript defaults use their own initialization marker. Compilation and execution are confined to development verification; the app only stores and displays snippet text.

Edge checks use browser-local persistence; Rust tests cover native disk operations. Native dialogs and the clipboard plugin are not exercised by browser tests.

## Version 1.4.0 — November 19, 2026

- **116 frontend unit tests passed**, including SQL dialect/type/version validation, primary and usage blocks, dialect-scoped version filters, SQL CRUD/import/export, preferences, upgrades preserving earlier sections/edits/deletions, and unique IDs across 96 bundled snippets.
- **23 Rust tests passed**, including SQL metadata validation, native CRUD/conflict handling, duplicate IDs and one-time SQL installation preserving existing content and deleted defaults.
- **6 Edge end-to-end tests passed** against the production frontend. SQL checks cover queries versus procedures, dialect/version filters, highlighting, copying only the primary definition, favorites/persistence, creating/editing procedures, cross-section imports/exports, deletion, validation, collapsed navigation and minimum window size. Existing language tests also pass. SQL dark/light screenshots were visually inspected.
- **Nine SQLite query examples passed result assertions on SQLite 3.37.2**, using Python 3.9 and isolated in-memory fixtures. Their declared SQLite 3.25 minimum was not exercised on a separate 3.25 runtime.
- **Six SQL Server stored procedures and all usage blocks passed Microsoft's SQL Server 2017 syntax parser** (TSql140Parser). No database service was contacted. Procedure execution, schema compatibility, permissions and transaction integration were not tested.
- **Strict TypeScript and production Vite build passed**. SQL highlighting is bundled locally and loads on demand. The existing C++ grammar chunk still produces Vite's size warning.
- **Version 1.4.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.4.0_x64-setup.exe`). The installer is unsigned; installation over an existing release was not exercised.
- Legacy library/configuration paths, app identity, preferences and earlier upgrade markers remain compatible. SQL uses a separate one-time upgrade marker. The application never executes SQL or connects to a database; SQLite and ScriptDom checks are development-only.

Browser checks use browser-local persistence; Rust tests cover disk operations. Native dialogs and the clipboard plugin are not exercised through Edge.

## Version 1.3.0 — November 19, 2026

- **90 frontend unit tests passed**, covering C++ standards, header tokens/include formatting, primary blocks, section/version/favorites filters, preference migration, lossless CRUD/import/export, one-time upgrades preserving prior sections/IDs/edits/deletions, and globally unique IDs across all 81 bundled snippets.
- **19 Rust tests passed**, including C++ integer-standard and header validation, wrong-language fences, duplicate IDs, native C++ create/edit/delete conflict handling, and one-time installation that preserves earlier sections and subsequent user edits/deletions.
- **5 Edge end-to-end tests passed** against the production frontend. C++ checks include separate navigation/categories/results/favorites, persistence after reload, C++17 versus C++20 filtering, highlighting, copying include directives, the Headers tab, editor defaults, editing, cross-section import/export, deletion, collapsed navigation and minimum window size. Existing Java, Python and C# interaction tests also pass.
- **All 15 bundled C++ examples compiled and passed behavioral assertions with MSVC in their declared C++14, C++17 or C++20 mode**. Test fixtures are isolated under ignored artifacts. This does not verify C++11 or C++23 modes; the bundled collection uses 14/17/20.
- **Strict TypeScript and production Vite build passed**. The bundled C++ grammar loads on demand; Vite emits an expected large-chunk warning for the approximately 733 KB grammar-data chunk (about 64 KB compressed). It does not require a CDN or runtime network access. Dark/light C++ previews were visually inspected.
- **Version 1.3.0 Windows executable and NSIS installer built successfully** (`Code Snippet Library_1.3.0_x64-setup.exe`). The installer is unsigned; installing it over an existing release was not exercised.
- Existing snippets, preference keys, app identity, storage paths and earlier upgrade markers remain compatible. The app never compiles or executes snippets; MSVC invocation is confined to a development-only verification script.

Browser tests use browser-local persistence, while Rust tests cover actual disk operations. Native dialogs and the clipboard plugin are not exercised by browser tests.

## Version 1.2.1 — November 19, 2026

- Renamed the public product, window/document titles, header/footer, npm package, Rust crate/library and executable to **Code Snippet Library**.
- **68 frontend unit tests, 15 Rust tests and 4 Edge end-to-end tests passed**, together with strict TypeScript and the production frontend build.
- The legacy app identifier, Documents library folder, preference keys and upgrade markers are preserved. Existing snippets and preferences do not require a data migration for this rename.
- The renamed native executable and Windows NSIS installer built successfully: `code-snippet-library.exe` and `Code Snippet Library_1.2.1_x64-setup.exe`. Installer upgrade behavior over an existing installation has not been exercised.

## Version 1.2.0 — November 19, 2026

- **68 frontend unit tests passed**, including C# metadata, quoted C#/.NET versions, using directives, multiple/primary fences, section and version filters, persistence, CRUD/import/export, preservation of existing sections, and globally unique IDs across all 66 bundled examples.
- **15 Rust tests passed**. New tests cover C# version/fence validation, native C# creation/editing/deletion with conflicts, and adding C# without overwriting existing Java/Python content, duplicate IDs, edits or deletions. Both upgrade paths share the tested file operations while retaining independent initialization markers.
- **4 Edge end-to-end tests passed**, covering the existing Java/Python workflows and C# section switching, categories, favorites, remembered section/category, C# 8 versus 12 filtering, .NET target display, syntax highlighting, using directives on the clipboard, creation/editing, cross-section imports, export, deletion, collapsed navigation and the minimum window size.
- **All 15 C# examples compiled at their declared C# language version and passed behavior assertions against .NET 8**, using SDK 9.0.302, installed .NET 8 targeting/runtime packs, no NuGet dependencies, and isolated file fixtures. The .NET target is the verified supported baseline; it does not imply all used APIs first appeared in that release.
- **Strict TypeScript and production Vite build passed**. Java, Python and C# grammars are bundled offline. C# dark/light theme screenshots were visually inspected.
- **Version 1.2.0 Windows release and NSIS installer built successfully** (`Java Snippet Library_1.2.0_x64-setup.exe`). The installer is unsigned and was not installed over an existing release during these checks.
- Existing Java and Python Markdown example files are unchanged, and existing library/configuration paths, app identity and per-language upgrade markers are preserved.

Browser checks use the preview storage adapter; Rust tests verify disk operations. These are not native dialog or clipboard-plugin integration tests. The desktop application never executes snippets; compilation/execution above is confined to a separate development-only verifier.

## Version 1.1.0 — November 19, 2026

- **47 frontend unit tests passed**, including Python metadata and primary blocks, legacy Java compatibility, section-scoped search, component-based Python version comparisons, Python CRUD/import/export, globally unique IDs, preferences migration, and one-time default installation that preserves edits and deletions.
- **11 Rust tests passed**, including strict quoted Python version validation, adding defaults to an existing Java library, preserving existing IDs/edits/deletions, and native Python creation/editing/deletion with conflict detection and atomic writes.
- **3 Edge end-to-end tests passed** against the production frontend. The new Python flow checks separate categories/results/favorites, persisted section/category after reload, Python 3.9 versus 3.10 filtering, syntax highlighting, clipboard contents, editor defaults, editing, cross-section imports, exports, deletion and the minimum window size. Clipboard assertions run serially because Windows shares the clipboard between browser contexts.
- **All 15 bundled Python examples passed grammar and behavioral checks on Python 3.9.13**, with temporary fixtures and output assertions. Minimum versions are metadata/API compatibility declarations; separate old Python interpreters were not installed or exercised. The development verifier is not part of app runtime.
- **Strict TypeScript and production Vite build passed** with Java and Python grammars bundled locally. Dark/light Python previews were visually inspected.
- **Version 1.1.0 Windows release and NSIS installer built successfully** (`Java Snippet Library_1.1.0_x64-setup.exe`). The installer is unsigned and has not been installed over an existing release as part of these checks.
- The 36 existing Java example files are unchanged. Existing library/configuration paths and the app identifier are preserved; Python defaults use their own upgrade marker.

The browser tests exercise browser persistence, while Rust tests exercise actual disk operations. These checks do not claim that native dialogs or the Windows clipboard plugin were tested through Edge. Neither language is executed by the desktop application.

## Version 1.0.0 — November 12, 2026

Verified on Windows 11 x64 with Node.js 22.15, Rust 1.100 (MSVC), Visual Studio 2022 C++ tools, Microsoft Edge and JDK 24.

- **25 frontend unit tests passed**: frontmatter parsing, metadata validation, multiple/primary blocks, duplicate IDs (including invalid existing files), fuzzy and code search, combined filters, generated categories, preference/favorites persistence, CRUD with edit conflict detection, lossless import/export, empty libraries and all bundled metadata.
- **7 Rust tests passed**: metadata/fences, path traversal rejection, atomic replacement without clobbering new files, first-run seeding that preserves edits, native CRUD, duplicate ID rejection and stale edit/delete detection. Filesystem tests run outside the execution sandbox because its Windows rename restrictions prevent atomic file replacement in temporary directories.
- **2 Edge end-to-end tests passed** against the production frontend: browsing, search, clipboard contents, persistent favorites/category after reload, editing/creation, Markdown import/export, deletion, invalid metadata, duplicate ID rejection, empty results, keyboard navigation/Escape, light/dark themes, font settings, collapsed navigation and minimum window layout.
- **TypeScript and production Vite build passed**. Java-only Shiki highlighting is bundled in a separate local chunk.
- **All 36 Java examples compiled with `javac --release` at their declared minimum version** (8, 11, 17 or 21). Jackson 2.17.3 and OpenJFX 17.0.12 examples compile against those exact dependencies.
- **Tauri Windows release and per-user NSIS installer built successfully**. The native executable was launched and visibly loaded all 36 snippets from the initialized Documents library.
- **npm audit reported zero known vulnerabilities** after updating the development test runner.

## Limits

The Edge tests exercise the browser storage adapter, not native dialogs or the Windows clipboard plugin. Rust tests cover actual disk persistence; the desktop launch is a separate visual smoke check. The installer is built but has not been installed over another release, and is unsigned. Windows 10 is a supported target but was not tested on a separate Windows 10 machine.

Java verification checks compilation, not live external services or every behavioral edge case. HTTP, JDBC and JavaFX examples need their documented runtime context in the consumer's project. The library never runs snippets. The app works offline; development dependency downloads and installing WebView2 on machines missing it require network access or separately supplied offline installers.

Notes are displayed as safe plain text. Library file changes refresh on focus/manual refresh or every eight seconds while visible. Symbolic links and Windows reparse points in library paths are unsupported. See README.md for storage, backup and build instructions.
