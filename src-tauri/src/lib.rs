use include_dir::{include_dir, Dir};
use serde::{Deserialize, Serialize};
use std::{
    fs,
    io::{Read, Write},
    path::{Component, Path, PathBuf},
    sync::Mutex,
};
use tauri::{Manager, State};

static DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultSnippets");
static PYTHON_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultPythonSnippets");
static CSHARP_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultCSharpSnippets");
static CPP_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultCppSnippets");
static SQL_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultSqlSnippets");
static TYPESCRIPT_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultTypeScriptSnippets");
static C_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultCSnippets");
static JAVASCRIPT_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultJavaScriptSnippets");
static GO_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultGoSnippets");
static KOTLIN_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultKotlinSnippets");
static COBOL_DEFAULTS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../DefaultCobolSnippets");
static STARTERS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../StarterSnippets");
static EVERYDAY: Dir = include_dir!("$CARGO_MANIFEST_DIR/../EverydaySnippets");
static EXTRAS: Dir = include_dir!("$CARGO_MANIFEST_DIR/../ExtraSnippets");
const MAX_FILE: u64 = 2_000_000;
struct Library {
    root: PathBuf,
    preferences: PathBuf,
    lock: Mutex<()>,
}
#[derive(Serialize)]
struct LibraryFile {
    path: String,
    content: String,
}
#[derive(Serialize)]
struct LibraryResult {
    files: Vec<LibraryFile>,
    errors: Vec<String>,
    folder: String,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Metadata {
    id: String,
    title: String,
    description: String,
    category: String,
    subcategory: Option<String>,
    tags: Vec<String>,
    #[serde(default = "default_language")]
    language: String,
    java_version: Option<u32>,
    python_version: Option<String>,
    csharp_version: Option<String>,
    dotnet_version: Option<String>,
    cpp_version: Option<u32>,
    c_version: Option<u32>,
    sql_dialect: Option<String>,
    sql_kind: Option<String>,
    sql_version: Option<String>,
    typescript_version: Option<String>,
    javascript_version: Option<u32>,
    go_version: Option<String>,
    kotlin_version: Option<String>,
    jvm_target: Option<u32>,
    cobol_version: Option<u32>,
    cobol_format: Option<String>,
    imports: Option<Vec<String>>,
    related: Option<Vec<String>>,
    dependency: Option<String>,
}
fn default_language() -> String {
    "java".into()
}
fn valid_python_version(version: &str) -> bool {
    version.strip_prefix("3.").is_some_and(|minor| {
        !minor.is_empty()
            && minor.len() <= 2
            && (minor.len() == 1 || !minor.starts_with('0'))
            && minor.bytes().all(|b| b.is_ascii_digit())
    })
}
fn valid_csharp_version(version: &str) -> bool {
    version.split_once('.').is_some_and(|(major, minor)| {
        !major.starts_with('0')
            && !major.is_empty()
            && major.len() <= 2
            && major.bytes().all(|b| b.is_ascii_digit())
            && !minor.is_empty()
            && minor.len() <= 2
            && (minor.len() == 1 || !minor.starts_with('0'))
            && minor.bytes().all(|b| b.is_ascii_digit())
    })
}
fn valid_dotnet_version(version: &str) -> bool {
    valid_csharp_version(version)
        && version.split_once('.').is_some_and(|(major, minor)| {
            minor == "0" && major.parse::<u32>().is_ok_and(|v| v >= 5)
        })
}
fn valid_kotlin_import(value: &str) -> bool {
    fn identifier(value: &str) -> bool {
        value
            .as_bytes()
            .first()
            .is_some_and(|c| c.is_ascii_alphabetic() || *c == b'_')
            && value
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || c == b'_')
    }
    let (path, alias) = value
        .split_once(" as ")
        .map_or((value, None), |(p, a)| (p, Some(a)));
    let path = path.strip_suffix(".*").unwrap_or(path);
    path.split('.').all(identifier) && alias.is_none_or(identifier)
}
fn valid_go_import(path: &str) -> bool {
    path.as_bytes()
        .first()
        .is_some_and(|b| b.is_ascii_alphanumeric())
        && path
            .bytes()
            .all(|b| b.is_ascii_alphanumeric() || b"._/-".contains(&b))
        && path
            .split('/')
            .all(|part| !part.is_empty() && part != "." && part != "..")
}
fn valid_cpp_header(header: &str) -> bool {
    header
        .strip_prefix('<')
        .and_then(|v| v.strip_suffix('>'))
        .or_else(|| header.strip_prefix('"').and_then(|v| v.strip_suffix('"')))
        .is_some_and(|v| {
            !v.is_empty()
                && v.bytes()
                    .all(|b| b.is_ascii_alphanumeric() || b"_./-".contains(&b))
        })
}

fn err(e: impl std::fmt::Display) -> String {
    e.to_string()
}
fn valid_sql_version(version: &str) -> bool {
    let parts = version.split('.').collect::<Vec<_>>();
    (1..=3).contains(&parts.len())
        && parts.iter().all(|part| {
            !part.is_empty()
                && part.len() <= 4
                && (part.len() == 1 || !part.starts_with('0'))
                && part.bytes().all(|b| b.is_ascii_digit())
        })
}
fn valid_id(id: &str) -> bool {
    !id.is_empty()
        && id.len() <= 180
        && id.split('-').all(|part| {
            !part.is_empty()
                && part
                    .bytes()
                    .all(|c| c.is_ascii_lowercase() || c.is_ascii_digit())
        })
}
fn metadata(content: &str) -> Result<Metadata, String> {
    if content.len() as u64 > MAX_FILE {
        return Err("Snippet exceeds the 2 MB limit.".into());
    }
    let text = content.trim_start_matches('\u{feff}').replace("\r\n", "\n");
    let rest = text
        .strip_prefix("---\n")
        .ok_or("Missing YAML frontmatter.")?;
    let (yaml, body) = rest
        .split_once("\n---\n")
        .ok_or("Missing frontmatter closing delimiter.")?;
    // serde_yaml can coerce numeric scalars into Rust strings. Python versions
    // must stay quoted strings so 3.10 never becomes the number 3.1.
    let value: serde_yaml::Value = serde_yaml::from_str(yaml).map_err(err)?;
    if value
        .get("cppVersion")
        .is_some_and(|version| version.as_u64().is_none())
    {
        return Err("C++ standard must be an integer.".into());
    }
    for field in [
        "pythonVersion",
        "csharpVersion",
        "dotnetVersion",
        "sqlVersion",
        "typescriptVersion",
        "goVersion",
        "kotlinVersion",
    ] {
        if value.get(field).is_some_and(|version| !version.is_string()) {
            return Err(format!("{field} must be a quoted major.minor string."));
        }
    }
    if value
        .get("cVersion")
        .is_some_and(|version| version.as_u64().is_none())
    {
        return Err("C standard must be an integer.".into());
    }
    if value
        .get("javascriptVersion")
        .is_some_and(|version| version.as_u64().is_none())
    {
        return Err("JavaScript version must be an integer ECMAScript year.".into());
    }
    if value.get("jvmTarget").is_some_and(|v| v.as_u64().is_none()) {
        return Err("JVM target must be an integer.".into());
    }
    if value
        .get("cobolVersion")
        .is_some_and(|v| v.as_u64().is_none())
    {
        return Err("COBOL standard must be an integer.".into());
    }
    let m: Metadata = serde_yaml::from_value(value).map_err(err)?;
    if !valid_id(&m.id)
        || m.title.trim().is_empty()
        || m.description.trim().is_empty()
        || m.category.trim().is_empty()
        || !matches!(
            m.language.as_str(),
            "java"
                | "python"
                | "csharp"
                | "cpp"
                | "sql"
                | "typescript"
                | "c"
                | "javascript"
                | "go"
                | "kotlin"
                | "cobol"
        )
        || (m.language != "cobol" && (m.cobol_version.is_some() || m.cobol_format.is_some()))
        || (m.language == "cobol"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.cobol_version
                    .is_none_or(|v| ![1985, 2002, 2014, 2023].contains(&v))
                || !matches!(m.cobol_format.as_deref(), Some("fixed" | "free"))
                || (m.cobol_format.as_deref() == Some("free")
                    && m.cobol_version.is_some_and(|v| v < 2002))
                || m.imports
                    .as_ref()
                    .is_some_and(|imports| !imports.is_empty())))
        || (m.language != "kotlin" && (m.kotlin_version.is_some() || m.jvm_target.is_some()))
        || (m.language == "kotlin"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.kotlin_version
                    .as_deref()
                    .is_none_or(|v| !valid_csharp_version(v))
                || m.jvm_target.is_none_or(|v| ![8, 11, 17, 21].contains(&v))
                || m.imports
                    .as_ref()
                    .is_some_and(|imports| imports.iter().any(|v| !valid_kotlin_import(v)))))
        || (m.language != "go" && m.go_version.is_some())
        || (m.language == "go"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.go_version.as_deref().is_none_or(|v| {
                    !v.strip_prefix("1.").is_some_and(|minor| {
                        !minor.is_empty()
                            && minor.len() <= 2
                            && (minor.len() == 1 || !minor.starts_with('0'))
                            && minor.bytes().all(|b| b.is_ascii_digit())
                    })
                })
                || m.imports
                    .as_ref()
                    .is_some_and(|imports| imports.iter().any(|path| !valid_go_import(path)))))
        || (m.language != "javascript" && m.javascript_version.is_some())
        || (m.language == "javascript"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.javascript_version
                    .is_none_or(|v| !(2015..=2099).contains(&v))
                || m.imports.as_ref().is_some_and(|imports| {
                    imports.iter().any(|line| {
                        !line.starts_with("import ")
                            || line
                                .strip_prefix("import type")
                                .is_some_and(|tail| tail.starts_with(char::is_whitespace))
                            || !(line.ends_with('\'') || line.ends_with('"'))
                    })
                })))
        || (m.language != "typescript" && m.typescript_version.is_some())
        || (m.language == "typescript"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.typescript_version
                    .as_deref()
                    .is_none_or(|v| !valid_csharp_version(v))
                || m.imports.as_ref().is_some_and(|imports| {
                    imports.iter().any(|line| {
                        !line.starts_with("import ")
                            || !(line.ends_with('\'') || line.ends_with('"'))
                    })
                })))
        || (m.language != "sql"
            && (m.sql_dialect.is_some() || m.sql_kind.is_some() || m.sql_version.is_some()))
        || (m.language == "sql"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || !matches!(
                    m.sql_dialect.as_deref(),
                    Some("sqlserver" | "postgresql" | "mysql" | "sqlite")
                )
                || !matches!(m.sql_kind.as_deref(), Some("query" | "procedure"))
                || (m.sql_dialect.as_deref() == Some("sqlite")
                    && m.sql_kind.as_deref() == Some("procedure"))
                || m.sql_version
                    .as_deref()
                    .is_none_or(|v| !valid_sql_version(v))
                || m.imports
                    .as_ref()
                    .is_some_and(|imports| !imports.is_empty())))
        || (m.language != "c" && m.c_version.is_some())
        || (m.language == "c"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.c_version
                    .is_none_or(|v| ![89, 99, 11, 17, 23].contains(&v))))
        || (m.language != "cpp" && m.cpp_version.is_some())
        || (m.language == "cpp"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.cpp_version
                    .is_none_or(|v| ![11, 14, 17, 20, 23].contains(&v))))
        || (m.language != "csharp" && (m.csharp_version.is_some() || m.dotnet_version.is_some()))
        || (m.language == "csharp"
            && (m.java_version.is_some()
                || m.python_version.is_some()
                || m.csharp_version
                    .as_deref()
                    .is_none_or(|v| !valid_csharp_version(v))
                || m.dotnet_version
                    .as_deref()
                    .is_none_or(|v| !valid_dotnet_version(v))))
        || (m.language == "java"
            && (m
                .java_version
                .is_none_or(|version| !(8..=99).contains(&version))
                || m.python_version.is_some()))
        || (m.language == "python"
            && (m.java_version.is_some()
                || m.python_version
                    .as_deref()
                    .is_none_or(|version| !valid_python_version(version))))
        || m.tags.iter().any(|t| t.trim().is_empty())
    {
        return Err("Invalid required metadata.".into());
    }
    if m.imports.as_ref().is_some_and(|v| {
        v.iter()
            .any(|x| x.trim().is_empty() || x.contains(['\n', '\r', ';']))
    }) || m
        .related
        .as_ref()
        .is_some_and(|v| v.iter().any(|x| x.trim().is_empty()))
    {
        return Err("Invalid imports or related snippets.".into());
    }
    if m.language == "sql" {
        let version = m
            .sql_version
            .as_deref()
            .ok_or("Missing database version.")?;
        let major = version
            .split('.')
            .next()
            .ok_or("Missing version component.")?
            .parse::<u32>()
            .map_err(err)?;
        if m.sql_dialect.as_deref() == Some("sqlserver")
            && !(version.len() == 4
                && version.starts_with("20")
                && version.bytes().all(|b| b.is_ascii_digit()))
        {
            return Err("SQL Server versions use the release year, such as 2017.".into());
        }
        if m.sql_dialect.as_deref() == Some("sqlite") && !version.starts_with("3.") {
            return Err("SQLite versions use 3.x.".into());
        }
        if m.sql_kind.as_deref() == Some("procedure")
            && ((m.sql_dialect.as_deref() == Some("postgresql") && major < 11)
                || (m.sql_dialect.as_deref() == Some("mysql") && major < 5))
        {
            return Err("Stored procedures are not supported in this database version.".into());
        }
    }
    let _ = (&m.subcategory, &m.dependency);
    if (m.language == "cpp" || m.language == "c")
        && m.imports
            .as_ref()
            .is_some_and(|headers| headers.iter().any(|header| !valid_cpp_header(header)))
    {
        return Err(
            "C++ headers must use <header> or quoted header syntax, without #include.".into(),
        );
    }
    let mut in_java = false;
    let mut in_other = false;
    let mut has_code = false;
    let mut block_has_code = false;
    let mut primary = false;
    let mut primary_count = 0;
    let mut block_count = 0;
    let mut first_has_code = None;
    let mut primary_has_code = None;
    for line in body.lines() {
        let line = line.trim_end();
        if line == "```" && (in_java || in_other) {
            if in_java {
                first_has_code.get_or_insert(block_has_code);
                if primary {
                    primary_has_code = Some(block_has_code);
                }
                block_count += 1;
                has_code |= block_has_code;
            }
            in_java = false;
            in_other = false;
        } else if !in_java && !in_other && line.starts_with("```") {
            let language = line
                .strip_prefix("```")
                .unwrap()
                .split_whitespace()
                .collect::<Vec<_>>();
            in_java =
                language == [m.language.as_str()] || language == [m.language.as_str(), "primary"];
            in_other = !in_java;
            primary = language == [m.language.as_str(), "primary"];
            primary_count += u32::from(primary);
            block_has_code = false;
        } else if in_java && !line.trim().is_empty() {
            block_has_code = true;
        }
    }
    if in_java || primary_count > 1 {
        return Err("Close every code fence and mark at most one block primary.".into());
    }
    if !has_code || block_count == 0 {
        return Err(format!(
            "A nonempty fenced {} block is required.",
            m.language
        ));
    }
    if !primary_has_code.or(first_has_code).unwrap_or(false) {
        return Err("The primary code block cannot be empty.".into());
    }
    Ok(m)
}
// Restrict every operation to an ordinary, relative .md file under the library.
// Reject reparse points/symlinks in every existing path component, including root.
fn reject_links(path: &Path) -> Result<(), String> {
    let mut current = PathBuf::new();
    for part in path.components() {
        current.push(part);
        match fs::symlink_metadata(&current) {
            Ok(meta) => {
                if meta.file_type().is_symlink() {
                    return Err("Symbolic links are not supported in the library path.".into());
                }
                #[cfg(windows)]
                {
                    use std::os::windows::fs::MetadataExt;
                    if meta.file_attributes() & 0x400 != 0 {
                        return Err("Reparse points are not supported in the library path.".into());
                    }
                }
            }
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
            Err(e) => return Err(err(e)),
        }
    }
    Ok(())
}
fn safe_path(root: &Path, relative: &str) -> Result<PathBuf, String> {
    let path = Path::new(relative);
    if path
        .components()
        .any(|c| !matches!(c, Component::Normal(_)))
        || relative.contains(':')
        || path.extension().and_then(|x| x.to_str()) != Some("md")
    {
        return Err("Invalid library file path.".into());
    }
    let target = root.join(path);
    reject_links(&target)?;
    Ok(target)
}
fn read_text(path: &Path) -> Result<String, String> {
    let file = fs::File::open(path).map_err(err)?;
    if file.metadata().map_err(err)?.len() > MAX_FILE {
        return Err("File exceeds the 2 MB limit.".into());
    }
    let mut text = String::new();
    file.take(MAX_FILE + 1)
        .read_to_string(&mut text)
        .map_err(err)?;
    if text.len() as u64 > MAX_FILE {
        return Err("File exceeds the 2 MB limit.".into());
    }
    Ok(text)
}
fn atomic_write(path: &Path, content: &str, create_only: bool) -> Result<(), String> {
    let parent = path.parent().ok_or("Missing parent directory.")?;
    let mut temp = tempfile::NamedTempFile::new_in(parent).map_err(err)?;
    temp.write_all(content.as_bytes()).map_err(err)?;
    temp.as_file().sync_all().map_err(err)?;
    if create_only {
        temp.persist_noclobber(path).map_err(err)?;
    } else {
        temp.persist(path).map_err(err)?;
    }
    Ok(())
}
fn seed(dir: &Dir, root: &Path) -> Result<(), String> {
    for file in dir.files() {
        let target = root.join(file.path());
        reject_links(&target)?;
        if let Some(parent) = target.parent() {
            fs::create_dir_all(parent).map_err(err)?;
        }
        if !target.exists() {
            let content = file
                .contents_utf8()
                .ok_or("Default snippet is not UTF-8.")?;
            atomic_write(&target, content, true)?;
        }
    }
    for child in dir.dirs() {
        seed(child, root)?;
    }
    Ok(())
}
fn scan(root: &Path, dir: &Path, files: &mut Vec<LibraryFile>, errors: &mut Vec<String>) {
    let entries = match fs::read_dir(dir) {
        Ok(e) => e,
        Err(e) => {
            errors.push(format!("{}: {e}", dir.display()));
            return;
        }
    };
    for entry in entries {
        let entry = match entry {
            Ok(x) => x,
            Err(e) => {
                errors.push(err(e));
                continue;
            }
        };
        let path = entry.path();
        if let Err(e) = reject_links(&path) {
            errors.push(format!("{}: {e}", path.display()));
            continue;
        }
        if path.is_dir() {
            scan(root, &path, files, errors);
        } else if path.extension().and_then(|s| s.to_str()) == Some("md") {
            let relative = match path.strip_prefix(root) {
                Ok(p) => p.to_string_lossy().replace('\\', "/"),
                Err(e) => {
                    errors.push(err(e));
                    continue;
                }
            };
            match read_text(&path) {
                Ok(content) => files.push(LibraryFile {
                    path: relative,
                    content,
                }),
                Err(e) => errors.push(format!("{}: {e}", path.display())),
            }
        }
    }
}
// A separate upgrade marker adds Python to existing installations exactly once.
// Existing paths and globally unique IDs always take precedence over defaults.
fn seed_python_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(
        root,
        config,
        &PYTHON_DEFAULTS,
        "Python",
        "python-initialized-v1",
    )
}
fn seed_csharp_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(
        root,
        config,
        &CSHARP_DEFAULTS,
        "CSharp",
        "csharp-initialized-v1",
    )
}
fn seed_c_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &C_DEFAULTS, "C", "c-initialized-v1")
}
fn seed_cpp_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &CPP_DEFAULTS, "Cpp", "cpp-initialized-v1")
}
fn seed_extras_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &EXTRAS, "", "extras-initialized-v1")
}
fn seed_everyday_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &EVERYDAY, "", "everyday-initialized-v1")
}
fn seed_starters_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &STARTERS, "", "starters-initialized-v1")
}
fn seed_cobol_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(
        root,
        config,
        &COBOL_DEFAULTS,
        "COBOL",
        "cobol-initialized-v1",
    )
}
fn seed_kotlin_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(
        root,
        config,
        &KOTLIN_DEFAULTS,
        "Kotlin",
        "kotlin-initialized-v1",
    )
}
fn seed_go_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &GO_DEFAULTS, "Go", "go-initialized-v1")
}
fn seed_javascript_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(
        root,
        config,
        &JAVASCRIPT_DEFAULTS,
        "JavaScript",
        "javascript-initialized-v1",
    )
}
fn seed_typescript_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(
        root,
        config,
        &TYPESCRIPT_DEFAULTS,
        "TypeScript",
        "typescript-initialized-v1",
    )
}
fn seed_sql_upgrade(root: &Path, config: &Path) -> Result<(), String> {
    seed_language_upgrade(root, config, &SQL_DEFAULTS, "SQL", "sql-initialized-v1")
}
fn seed_language_upgrade(
    root: &Path,
    config: &Path,
    defaults: &Dir,
    folder: &str,
    marker_name: &str,
) -> Result<(), String> {
    let marker = config.join(marker_name);
    reject_links(&marker)?;
    if marker.exists() {
        return Ok(());
    }
    let mut files = vec![];
    let mut errors = vec![];
    scan(root, root, &mut files, &mut errors);
    if !errors.is_empty() {
        return Err(format!(
            "Could not inspect the library before adding {folder}: {}",
            errors.join("; ")
        ));
    }
    let mut ids = std::collections::HashSet::new();
    for file in files {
        let normalized = file
            .content
            .trim_start_matches('\u{feff}')
            .replace("\r\n", "\n");
        if let Some(yaml) = normalized
            .strip_prefix("---\n")
            .and_then(|s| s.split_once("\n---\n").map(|(yaml, _)| yaml))
        {
            if let Ok(value) = serde_yaml::from_str::<serde_yaml::Value>(yaml) {
                if let Some(id) = value.get("id").and_then(|v| v.as_str()) {
                    ids.insert(id.to_owned());
                }
            }
        }
    }
    fn copy(
        dir: &Dir,
        root: &Path,
        folder: &str,
        ids: &mut std::collections::HashSet<String>,
    ) -> Result<(), String> {
        for file in dir.files() {
            let content = file
                .contents_utf8()
                .ok_or("Default snippet is not UTF-8.")?;
            let m = metadata(content)?;
            let target = root.join(folder).join(file.path());
            reject_links(&target)?;
            if target.exists() || ids.contains(&m.id) {
                continue;
            }
            fs::create_dir_all(target.parent().ok_or("Missing snippet directory.")?)
                .map_err(err)?;
            atomic_write(&target, content, true)?;
            ids.insert(m.id);
        }
        for child in dir.dirs() {
            copy(child, root, folder, ids)?;
        }
        Ok(())
    }
    copy(defaults, root, folder, &mut ids)?;
    atomic_write(&marker, "1", true)
}
#[tauri::command]
fn load_library(state: State<Library>) -> Result<LibraryResult, String> {
    let _guard = state.lock.lock().map_err(err)?;
    reject_links(&state.root)?;
    let mut files = vec![];
    let mut errors = vec![];
    scan(&state.root, &state.root, &mut files, &mut errors);
    Ok(LibraryResult {
        files,
        errors,
        folder: state.root.to_string_lossy().into(),
    })
}
#[tauri::command]
fn save_snippet(
    state: State<Library>,
    content: String,
    path: Option<String>,
    expected: Option<String>,
) -> Result<String, String> {
    save_library_snippet(&state, content, path, expected)
}
fn save_library_snippet(
    state: &Library,
    content: String,
    path: Option<String>,
    expected: Option<String>,
) -> Result<String, String> {
    let _guard = state.lock.lock().map_err(err)?;
    let m = metadata(&content)?;
    let relative = path.clone().unwrap_or_else(|| {
        format!(
            "{}{}.md",
            if m.language == "python" {
                "Python/"
            } else if m.language == "csharp" {
                "CSharp/"
            } else if m.language == "c" {
                "C/"
            } else if m.language == "cpp" {
                "Cpp/"
            } else if m.language == "cobol" {
                "COBOL/"
            } else if m.language == "kotlin" {
                "Kotlin/"
            } else if m.language == "go" {
                "Go/"
            } else if m.language == "javascript" {
                "JavaScript/"
            } else if m.language == "typescript" {
                "TypeScript/"
            } else if m.language == "sql" {
                "SQL/"
            } else {
                ""
            },
            m.id
        )
    });
    let target = safe_path(&state.root, &relative)?;
    if path.is_none() {
        if let Some(parent) = target.parent() {
            fs::create_dir_all(parent).map_err(err)?;
        }
    }
    if path.is_some() && read_text(&target)? != expected.ok_or("Missing original file content.")? {
        return Err("This file changed outside the editor. Reload before saving.".into());
    }
    let mut files = vec![];
    let mut errors = vec![];
    scan(&state.root, &state.root, &mut files, &mut errors);
    if !errors.is_empty() {
        return Err(format!(
            "Could not check the entire library for duplicate IDs: {}",
            errors.join("; ")
        ));
    }
    for file in files {
        if file.path == relative.replace('\\', "/") {
            continue;
        }
        // Read just the YAML ID even if the rest of an existing snippet is invalid.
        let normalized = file.content.replace("\r\n", "\n");
        if let Some(front) = normalized
            .trim_start_matches('\u{feff}')
            .strip_prefix("---\n")
            .and_then(|s| s.split_once("\n---\n").map(|(yaml, _)| yaml))
        {
            if let Ok(value) = serde_yaml::from_str::<serde_yaml::Value>(front) {
                if value.get("id").and_then(|id| id.as_str()) == Some(m.id.as_str()) {
                    return Err(format!("Duplicate ID: {}", m.id));
                }
            }
        }
    }
    atomic_write(&target, &content, path.is_none())?;
    Ok(relative)
}
#[tauri::command]
fn delete_snippet(state: State<Library>, path: String, expected: String) -> Result<(), String> {
    delete_library_snippet(&state, path, expected)
}
fn delete_library_snippet(state: &Library, path: String, expected: String) -> Result<(), String> {
    let _guard = state.lock.lock().map_err(err)?;
    let target = safe_path(&state.root, &path)?;
    if read_text(&target)? != expected {
        return Err("File changed. Reload before deleting.".into());
    }
    fs::remove_file(target).map_err(err)
}
#[tauri::command]
fn load_preferences(state: State<Library>) -> Result<serde_json::Value, String> {
    let _guard = state.lock.lock().map_err(err)?;
    if !state.preferences.exists() {
        return Ok(serde_json::json!({}));
    }
    serde_json::from_str(&read_text(&state.preferences)?).map_err(err)
}
#[tauri::command]
fn save_preferences(state: State<Library>, preferences: serde_json::Value) -> Result<(), String> {
    let _guard = state.lock.lock().map_err(err)?;
    let text = serde_json::to_string_pretty(&preferences).map_err(err)?;
    if text.len() > 200_000 {
        return Err("Preferences are too large.".into());
    }
    reject_links(&state.preferences)?;
    atomic_write(&state.preferences, &text, false)
}
#[tauri::command]
fn open_library(state: State<Library>) -> Result<(), String> {
    reject_links(&state.root)?;
    #[cfg(windows)]
    {
        std::process::Command::new("explorer.exe")
            .arg(&state.root)
            .spawn()
            .map_err(err)?;
        Ok(())
    }
    #[cfg(not(windows))]
    {
        Err("Opening the library folder is supported on Windows.".into())
    }
}
#[tauri::command]
async fn export_snippet(content: String, id: String) -> Result<bool, String> {
    metadata(&content)?;
    if !valid_id(&id) {
        return Err("Invalid ID.".into());
    }
    tauri::async_runtime::spawn_blocking(move || {
        let path = rfd::FileDialog::new()
            .add_filter("Markdown", &["md"])
            .set_file_name(format!("{id}.md"))
            .save_file();
        if let Some(path) = path {
            reject_links(&path)?;
            atomic_write(&path, &content, false)?;
            Ok(true)
        } else {
            Ok(false)
        }
    })
    .await
    .map_err(err)?
}
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(|app| {
            let root = app.path().document_dir()?.join("Java Snippet Library");
            reject_links(&root).map_err(std::io::Error::other)?;
            fs::create_dir_all(&root)?;
            let config = app.path().app_config_dir()?;
            reject_links(&config).map_err(std::io::Error::other)?;
            fs::create_dir_all(&config)?;
            let marker = config.join("library-initialized-v1");
            if !marker.exists() {
                seed(&DEFAULTS, &root).map_err(std::io::Error::other)?;
                atomic_write(&marker, "1", true).map_err(std::io::Error::other)?;
            }
            seed_python_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_csharp_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_cpp_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_c_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_sql_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_typescript_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_javascript_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_go_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_kotlin_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_cobol_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_starters_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_everyday_upgrade(&root, &config).map_err(std::io::Error::other)?;
            seed_extras_upgrade(&root, &config).map_err(std::io::Error::other)?;
            app.manage(Library {
                root,
                preferences: config.join("preferences.json"),
                lock: Mutex::new(()),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            load_library,
            save_snippet,
            delete_snippet,
            load_preferences,
            save_preferences,
            open_library,
            export_snippet
        ])
        .run(tauri::generate_context!())
        .expect("Failed to start Code Snippet Library");
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn starter_upgrade_preserves_existing_content_and_deleted_templates() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        seed_cobol_upgrade(library.path(), config.path()).unwrap();
        let mut before = vec![];
        scan(library.path(), library.path(), &mut before, &mut vec![]);
        seed_starters_upgrade(library.path(), config.path()).unwrap();
        let mut after = vec![];
        scan(library.path(), library.path(), &mut after, &mut vec![]);
        assert_eq!(after.len(), before.len() + 11);
        for file in before {
            assert_eq!(
                read_text(&library.path().join(file.path)).unwrap(),
                file.content
            );
        }
        let deleted = library.path().join("Starters/java-hello-world.md");
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join("Python/Starters/python-hello-world.md");
        fs::write(&edited, "keep my edits").unwrap();
        seed_starters_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep my edits");
    }
    #[test]
    fn starter_upgrade_respects_user_ids_and_occupied_paths() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = STARTERS
            .get_file("Starters/java-hello-world.md")
            .unwrap()
            .contents_utf8()
            .unwrap();
        fs::write(library.path().join("custom.md"), custom).unwrap();
        let occupied = library.path().join("Python/Starters/python-hello-world.md");
        fs::create_dir_all(occupied.parent().unwrap()).unwrap();
        fs::write(&occupied, "keep user file").unwrap();
        seed_starters_upgrade(library.path(), config.path()).unwrap();
        assert!(!library.path().join("Starters/java-hello-world.md").exists());
        assert_eq!(read_text(&occupied).unwrap(), "keep user file");
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn everyday_upgrade_preserves_existing_content_and_deleted_templates() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        seed_cobol_upgrade(library.path(), config.path()).unwrap();
        seed_starters_upgrade(library.path(), config.path()).unwrap();
        let mut before = vec![];
        scan(library.path(), library.path(), &mut before, &mut vec![]);
        seed_everyday_upgrade(library.path(), config.path()).unwrap();
        let mut after = vec![];
        scan(library.path(), library.path(), &mut after, &mut vec![]);
        assert_eq!(after.len(), before.len() + 243);
        for file in before {
            assert_eq!(
                read_text(&library.path().join(file.path)).unwrap(),
                file.content
            );
        }
        let deleted = library
            .path()
            .join("Everyday/Files & I/O/everyday-java-normalize-path.md");
        fs::remove_file(&deleted).unwrap();
        let edited = library
            .path()
            .join("Python/Everyday/Strings/everyday-python-slug.md");
        fs::write(&edited, "keep my edits").unwrap();
        seed_everyday_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep my edits");
    }
    #[test]
    fn everyday_upgrade_respects_user_ids_and_occupied_paths() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = EVERYDAY
            .get_file("Everyday/Files & I/O/everyday-java-normalize-path.md")
            .unwrap()
            .contents_utf8()
            .unwrap();
        fs::write(library.path().join("custom.md"), custom).unwrap();
        let occupied = library
            .path()
            .join("Python/Everyday/Strings/everyday-python-slug.md");
        fs::create_dir_all(occupied.parent().unwrap()).unwrap();
        fs::write(&occupied, "keep user file").unwrap();
        seed_everyday_upgrade(library.path(), config.path()).unwrap();
        assert!(!library
            .path()
            .join("Everyday/Files & I/O/everyday-java-normalize-path.md")
            .exists());
        assert_eq!(read_text(&occupied).unwrap(), "keep user file");
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn extras_upgrade_preserves_existing_content_and_deleted_templates() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        seed_cobol_upgrade(library.path(), config.path()).unwrap();
        seed_starters_upgrade(library.path(), config.path()).unwrap();
        seed_everyday_upgrade(library.path(), config.path()).unwrap();
        let mut before = vec![];
        scan(library.path(), library.path(), &mut before, &mut vec![]);
        seed_extras_upgrade(library.path(), config.path()).unwrap();
        let mut after = vec![];
        scan(library.path(), library.path(), &mut after, &mut vec![]);
        assert_eq!(after.len(), before.len() + 32);
        for file in before {
            assert_eq!(
                read_text(&library.path().join(file.path)).unwrap(),
                file.content
            );
        }
        let deleted = library
            .path()
            .join("Extras/Data formats/extra-java-base64-text.md");
        fs::remove_file(&deleted).unwrap();
        let edited = library
            .path()
            .join("Python/Extras/Data formats/extra-python-html-escape.md");
        fs::write(&edited, "keep my edits").unwrap();
        seed_extras_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep my edits");
    }
    #[test]
    fn extras_upgrade_respects_user_ids_and_occupied_paths() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = EXTRAS
            .get_file("Extras/Data formats/extra-java-base64-text.md")
            .unwrap()
            .contents_utf8()
            .unwrap();
        fs::write(library.path().join("custom.md"), custom).unwrap();
        let occupied = library
            .path()
            .join("Python/Extras/Data formats/extra-python-html-escape.md");
        fs::create_dir_all(occupied.parent().unwrap()).unwrap();
        fs::write(&occupied, "keep user file").unwrap();
        seed_extras_upgrade(library.path(), config.path()).unwrap();
        assert!(!library
            .path()
            .join("Extras/Data formats/extra-java-base64-text.md")
            .exists());
        assert_eq!(read_text(&occupied).unwrap(), "keep user file");
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    const SQL_SNIPPET:&str="---\nid: sql-test\nlanguage: sql\ntitle: SQL test\ndescription: Test SQL.\ncategory: Stored Procedures\ntags: []\nsqlDialect: sqlserver\nsqlKind: procedure\nsqlVersion: \"2017\"\n---\n\n```sql\nCREATE OR ALTER PROCEDURE dbo.Answer AS SELECT 42 AS answer;\n```\n";
    #[test]
    fn validates_sql_dialects_versions_kinds_and_fences() {
        assert_eq!(metadata(SQL_SNIPPET).unwrap().language, "sql");
        assert!(metadata(&SQL_SNIPPET.replace("\"2017\"", "2017")).is_err());
        assert!(metadata(&SQL_SNIPPET.replace("\"2017\"", "\"16.0\"")).is_err());
        assert!(metadata(&SQL_SNIPPET.replace("sqlserver", "oracle")).is_err());
        assert!(metadata(
            &SQL_SNIPPET
                .replace("sqlserver", "sqlite")
                .replace("\"2017\"", "\"3.25\"")
        )
        .is_err());
        assert!(metadata(
            &SQL_SNIPPET
                .replace("sqlserver", "postgresql")
                .replace("\"2017\"", "\"10\"")
        )
        .is_err());
        assert!(metadata(
            &SQL_SNIPPET
                .replace("sqlserver", "postgresql")
                .replace("\"2017\"", "\"11\"")
        )
        .is_ok());
        assert!(metadata(&SQL_SNIPPET.replace("```sql", "```java")).is_err());
        assert!(
            metadata(&SQL_SNIPPET.replace("sqlDialect:", "javaVersion: 8\nsqlDialect:")).is_err()
        );
        assert!(
            metadata(&SQL_SNIPPET.replace("sqlDialect:", "imports: [System]\nsqlDialect:"))
                .is_err()
        );
    }
    #[test]
    fn sql_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 61);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let sql = files
            .iter()
            .filter(|f| f.path.starts_with("SQL/"))
            .collect::<Vec<_>>();
        assert_eq!(sql.len(), 15);
        let deleted = library.path().join(&sql[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&sql[1].path);
        atomic_write(&edited, "keep SQL edit", false).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep SQL edit");
    }
    #[test]
    fn sql_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = SQL_SNIPPET.replace("sql-test", "sql-proc-input");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: sql-proc-input"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn sql_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, SQL_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "SQL/sql-test.md");
        assert!(save_library_snippet(&state, SQL_SNIPPET.into(), None, None).is_err());
        let updated = SQL_SNIPPET.replace("SELECT 42", "SELECT 43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(SQL_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), SQL_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    const CPP_SNIPPET:&str="---\nid: cpp-test\nlanguage: cpp\ntitle: Cpp test\ndescription: Test Cpp.\ncategory: Cpp Basics\ntags: []\ncppVersion: 17\nimports: [\"<iostream>\"]\n---\n\n```cpp\nstd::cout << 42;\n```\n";
    #[test]
    fn validates_cpp_standards_headers_and_fences() {
        assert_eq!(metadata(CPP_SNIPPET).unwrap().language, "cpp");
        for replacement in ["\"17\"", "17.5", "98"] {
            assert!(metadata(
                &CPP_SNIPPET.replace("cppVersion: 17", &format!("cppVersion: {replacement}"))
            )
            .is_err());
        }
        assert!(metadata(&CPP_SNIPPET.replace("<iostream>", "#include <iostream>")).is_err());
        assert!(metadata(&CPP_SNIPPET.replace("```cpp", "```java")).is_err());
        assert!(
            metadata(&CPP_SNIPPET.replace("cppVersion:", "javaVersion: 8\ncppVersion:")).is_err()
        );
        assert!(metadata(&format!(
            "{CPP_SNIPPET}\n```cpp primary\nint x=1;\n```\n```cpp primary\nint y=2;\n```\n"
        ))
        .is_err());
    }
    const TYPESCRIPT_SNIPPET: &str = "---\nid: ts-test\nlanguage: typescript\ntitle: TypeScript test\ndescription: Typed value.\ncategory: TypeScript Basics\ntags: []\ntypescriptVersion: \"4.9\"\nimports: [\"import type { User } from './models'\"]\n---\n\n```typescript\nconst value: number = 42;\n```\n";
    #[test]
    fn validates_typescript_metadata_and_fences() {
        assert_eq!(metadata(TYPESCRIPT_SNIPPET).unwrap().language, "typescript");
        for invalid in ["4.9", "\"04.9\"", "\"5\"", "\"5.x\""] {
            assert!(metadata(&TYPESCRIPT_SNIPPET.replace("\"4.9\"", invalid)).is_err());
        }
        assert!(metadata(
            &TYPESCRIPT_SNIPPET.replace("typescriptVersion:", "javaVersion: 8\ntypescriptVersion:")
        )
        .is_err());
        assert!(metadata(&TYPESCRIPT_SNIPPET.replace("```typescript", "```java")).is_err());
        assert!(metadata(
            &TYPESCRIPT_SNIPPET.replace("import type { User } from './models'", "console.log(42)")
        )
        .is_err());
        assert!(metadata(&TYPESCRIPT_SNIPPET.replace(
            "import type { User } from './models'",
            "import type { User } from './models';"
        ))
        .is_err());
    }
    const JAVASCRIPT_SNIPPET: &str = "---\nid: js-test\nlanguage: javascript\ntitle: JavaScript test\ndescription: Test JavaScript.\ncategory: JavaScript Basics\ntags: []\njavascriptVersion: 2020\nimports: [\"import { greet } from './greeting.js'\"]\n---\n\n```javascript\nconst value = 42;\n```\n";
    #[test]
    fn validates_javascript_metadata_and_fences() {
        assert_eq!(metadata(JAVASCRIPT_SNIPPET).unwrap().language, "javascript");
        for invalid in ["\"2020\"", "2020.5", "2014", "2100"] {
            assert!(metadata(&JAVASCRIPT_SNIPPET.replace(
                "javascriptVersion: 2020",
                &format!("javascriptVersion: {invalid}")
            ))
            .is_err());
        }
        assert!(metadata(
            &JAVASCRIPT_SNIPPET.replace("javascriptVersion:", "javaVersion: 8\njavascriptVersion:")
        )
        .is_err());
        assert!(metadata(&JAVASCRIPT_SNIPPET.replace("```javascript", "```typescript")).is_err());
        assert!(metadata(&JAVASCRIPT_SNIPPET.replace(
            "import { greet } from './greeting.js'",
            "import type { User } from './models'"
        ))
        .is_err());
        assert!(metadata(&JAVASCRIPT_SNIPPET.replace(
            "import { greet } from './greeting.js'",
            "import './greeting.js';"
        ))
        .is_err());
    }
    const GO_SNIPPET: &str = "---\nid: go-test\nlanguage: go\ntitle: Go test\ndescription: Test Go.\ncategory: Go Basics\ntags: []\ngoVersion: \"1.20\"\nimports: [fmt]\n---\n\n```go\npackage main\n\nfunc main() { fmt.Println(42) }\n```\n";
    #[test]
    fn validates_go_metadata_and_fences() {
        assert_eq!(metadata(GO_SNIPPET).unwrap().language, "go");
        for invalid in ["1.20", "\"1.020\"", "\"2.0\"", "\"1\""] {
            assert!(metadata(&GO_SNIPPET.replace("\"1.20\"", invalid)).is_err());
        }
        for invalid in ["import fmt", "../fmt", "a//b", "alias fmt"] {
            assert!(metadata(
                &GO_SNIPPET.replace("imports: [fmt]", &format!("imports: [\"{invalid}\"]"))
            )
            .is_err());
        }
        assert!(metadata(&GO_SNIPPET.replace("goVersion:", "javaVersion: 8\ngoVersion:")).is_err());
        assert!(metadata(&GO_SNIPPET.replace("```go", "```java")).is_err());
    }
    const KOTLIN_SNIPPET: &str = "---\nid: kt-test\nlanguage: kotlin\ntitle: Kotlin test\ndescription: Test Kotlin.\ncategory: Kotlin Basics\ntags: []\nkotlinVersion: \"1.8\"\njvmTarget: 8\nimports: [java.time.LocalDate as Date]\n---\n\n```kotlin\npackage sample\n\nfun main() { println(42) }\n```\n";
    #[test]
    fn validates_kotlin_metadata_and_fences() {
        assert_eq!(metadata(KOTLIN_SNIPPET).unwrap().language, "kotlin");
        for invalid in ["1.8", "\"01.8\"", "\"1\""] {
            assert!(metadata(&KOTLIN_SNIPPET.replace("\"1.8\"", invalid)).is_err());
        }
        for invalid in ["\"8\"", "9", "8.5"] {
            assert!(metadata(
                &KOTLIN_SNIPPET.replace("jvmTarget: 8", &format!("jvmTarget: {invalid}"))
            )
            .is_err());
        }
        for invalid in [
            "import java.time.LocalDate",
            "java..time",
            "java.time.LocalDate;",
            "java.time.LocalDate as bad-name",
        ] {
            assert!(
                metadata(&KOTLIN_SNIPPET.replace("java.time.LocalDate as Date", invalid)).is_err()
            );
        }
        assert!(metadata(
            &KOTLIN_SNIPPET.replace("kotlinVersion:", "javaVersion: 8\nkotlinVersion:")
        )
        .is_err());
        assert!(metadata(&KOTLIN_SNIPPET.replace("```kotlin", "```java")).is_err());
    }
    const COBOL_SNIPPET: &str = "---\nid: cobol-test\nlanguage: cobol\ntitle: COBOL test\ndescription: Test COBOL.\ncategory: COBOL Basics\ntags: []\ncobolVersion: 2002\ncobolFormat: free\n---\n\n```cobol\nIDENTIFICATION DIVISION.\nPROGRAM-ID. EXAMPLE.\nPROCEDURE DIVISION.\n    DISPLAY 42\n    STOP RUN.\n```\n";
    #[test]
    fn validates_cobol_metadata_formats_and_fences() {
        assert_eq!(metadata(COBOL_SNIPPET).unwrap().language, "cobol");
        for invalid in ["\"2002\"", "2002.5", "1999"] {
            assert!(metadata(
                &COBOL_SNIPPET.replace("cobolVersion: 2002", &format!("cobolVersion: {invalid}"))
            )
            .is_err());
        }
        assert!(
            metadata(&COBOL_SNIPPET.replace("cobolVersion: 2002", "cobolVersion: 1985")).is_err()
        );
        assert!(
            metadata(&COBOL_SNIPPET.replace("cobolFormat: free", "cobolFormat: variable")).is_err()
        );
        assert!(metadata(
            &COBOL_SNIPPET.replace("cobolFormat:", "imports: [copybook]\ncobolFormat:")
        )
        .is_err());
        assert!(
            metadata(&COBOL_SNIPPET.replace("cobolVersion:", "javaVersion: 8\ncobolVersion:"))
                .is_err()
        );
        assert!(metadata(&COBOL_SNIPPET.replace("```cobol", "```java")).is_err());
    }
    #[test]
    fn cobol_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        seed_cobol_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 151);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("COBOL/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep COBOL edit", false).unwrap();
        seed_cobol_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep COBOL edit");
    }
    #[test]
    fn cobol_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = COBOL_SNIPPET.replace("cobol-test", "cobol-hello");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_cobol_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: cobol-hello"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn cobol_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, COBOL_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "COBOL/cobol-test.md");
        assert!(save_library_snippet(&state, COBOL_SNIPPET.into(), None, None).is_err());
        let updated = COBOL_SNIPPET.replace("42", "43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(COBOL_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), COBOL_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    #[test]
    fn kotlin_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 136);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("Kotlin/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep Kotlin edit", false).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep Kotlin edit");
    }
    #[test]
    fn kotlin_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = KOTLIN_SNIPPET.replace("kt-test", "kt-read-text");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_kotlin_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: kt-read-text"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn kotlin_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, KOTLIN_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "Kotlin/kt-test.md");
        assert!(save_library_snippet(&state, KOTLIN_SNIPPET.into(), None, None).is_err());
        let updated = KOTLIN_SNIPPET.replace("42", "43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(KOTLIN_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), KOTLIN_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    #[test]
    fn go_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 121);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("Go/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep Go edit", false).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep Go edit");
    }
    #[test]
    fn go_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = GO_SNIPPET.replace("go-test", "go-read-text");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_go_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: go-read-text"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn go_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, GO_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "Go/go-test.md");
        assert!(save_library_snippet(&state, GO_SNIPPET.into(), None, None).is_err());
        let updated = GO_SNIPPET.replace("42", "43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(GO_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), GO_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    #[test]
    fn javascript_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 106);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("JavaScript/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep JavaScript edit", false).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep JavaScript edit");
    }
    #[test]
    fn javascript_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = JAVASCRIPT_SNIPPET.replace("js-test", "js-module-import");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_javascript_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: js-module-import"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn javascript_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, JAVASCRIPT_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "JavaScript/js-test.md");
        assert!(save_library_snippet(&state, JAVASCRIPT_SNIPPET.into(), None, None).is_err());
        let updated = JAVASCRIPT_SNIPPET.replace("42", "43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(JAVASCRIPT_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), JAVASCRIPT_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    #[test]
    fn typescript_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 76);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("TypeScript/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep TypeScript edit", false).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep TypeScript edit");
    }
    #[test]
    fn typescript_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = TYPESCRIPT_SNIPPET.replace("ts-test", "ts-type-import");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: ts-type-import"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn typescript_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, TYPESCRIPT_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "TypeScript/ts-test.md");
        assert!(save_library_snippet(&state, TYPESCRIPT_SNIPPET.into(), None, None).is_err());
        let updated = TYPESCRIPT_SNIPPET.replace("42", "43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(TYPESCRIPT_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), TYPESCRIPT_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    const C_SNIPPET:&str="---\nid: c-test\nlanguage: c\ntitle: C test\ndescription: Test C.\ncategory: C Basics\ntags: []\ncVersion: 17\nimports: [\"<stdio.h>\"]\n---\n\n```c\nputs(\"Hello, C!\");\n```\n";
    #[test]
    fn validates_c_standards_headers_and_fences() {
        assert_eq!(metadata(C_SNIPPET).unwrap().language, "c");
        for replacement in ["\"17\"", "17.5", "98"] {
            assert!(metadata(
                &C_SNIPPET.replace("cVersion: 17", &format!("cVersion: {replacement}"))
            )
            .is_err());
        }
        assert!(metadata(&C_SNIPPET.replace("<stdio.h>", "#include <stdio.h>")).is_err());
        assert!(metadata(&C_SNIPPET.replace("```c", "```java")).is_err());
        assert!(metadata(&C_SNIPPET.replace("cVersion:", "javaVersion: 8\ncVersion:")).is_err());
        assert!(metadata(&format!(
            "{C_SNIPPET}\n```c primary\nint x=1;\n```\n```c primary\nint y=2;\n```\n"
        ))
        .is_err());
    }
    #[test]
    fn c_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        seed_sql_upgrade(library.path(), config.path()).unwrap();
        seed_typescript_upgrade(library.path(), config.path()).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 91);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("C/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep C edit", false).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep C edit");
    }
    #[test]
    fn c_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = C_SNIPPET.replace("c-test", "c-read-text");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_c_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: c-read-text"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn c_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, C_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "C/c-test.md");
        assert!(save_library_snippet(&state, C_SNIPPET.into(), None, None).is_err());
        let updated = C_SNIPPET.replace("Hello, C!", "Hello, edited C!");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(C_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), C_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    #[test]
    fn cpp_upgrade_preserves_earlier_sections_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 46);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("Cpp/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep C++ edit", false).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep C++ edit");
    }
    #[test]
    fn cpp_upgrade_reserves_user_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = CPP_SNIPPET.replace("cpp-test", "cpp-read-text");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_cpp_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: cpp-read-text"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn cpp_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, CPP_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "Cpp/cpp-test.md");
        assert!(save_library_snippet(&state, CPP_SNIPPET.into(), None, None).is_err());
        let updated = CPP_SNIPPET.replace("<< 42", "<< 43");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(CPP_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), CPP_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    const CSHARP_SNIPPET:&str="---\nid: csharp-test\nlanguage: csharp\ntitle: Csharp test\ndescription: Test Csharp.\ncategory: Csharp Basics\ntags: []\ncsharpVersion: \"8.0\"\ndotnetVersion: \"8.0\"\nimports: [System]\n---\n\n```csharp\nConsole.WriteLine(42);\n```\n";
    #[test]
    fn validates_csharp_versions_and_fences() {
        assert_eq!(metadata(CSHARP_SNIPPET).unwrap().language, "csharp");
        assert!(metadata(&CSHARP_SNIPPET.replacen("\"8.0\"", "8.0", 1)).is_err());
        assert!(
            metadata(&CSHARP_SNIPPET.replace("dotnetVersion: \"8.0\"", "dotnetVersion: 8.0"))
                .is_err()
        );
        assert!(metadata(
            &CSHARP_SNIPPET.replace("dotnetVersion: \"8.0\"", "dotnetVersion: \"4.8\"")
        )
        .is_err());
        assert!(metadata(&CSHARP_SNIPPET.replace("```csharp", "```java")).is_err());
        assert!(metadata(
            &CSHARP_SNIPPET.replace("csharpVersion:", "javaVersion: 8\ncsharpVersion:")
        )
        .is_err());
        assert!(metadata(&format!("{CSHARP_SNIPPET}\n```csharp primary\nint x=1;\n```\n```csharp primary\nint y=2;\n```\n")).is_err());
    }
    #[test]
    fn csharp_upgrade_preserves_existing_library_edits_and_deletions() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("java.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 31);
        assert_eq!(read_text(&library.path().join("java.md")).unwrap(), SNIPPET);
        let examples = files
            .iter()
            .filter(|f| f.path.starts_with("CSharp/"))
            .collect::<Vec<_>>();
        assert_eq!(examples.len(), 15);
        let deleted = library.path().join(&examples[0].path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(&examples[1].path);
        atomic_write(&edited, "keep C# edit", false).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep C# edit");
    }
    #[test]
    fn csharp_upgrade_reserves_existing_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = CSHARP_SNIPPET.replace("csharp-test", "cs-read-text");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_csharp_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: cs-read-text"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn csharp_create_edit_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, CSHARP_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "CSharp/csharp-test.md");
        assert!(save_library_snippet(&state, CSHARP_SNIPPET.into(), None, None).is_err());
        let updated = CSHARP_SNIPPET.replace("WriteLine(42)", "WriteLine(43)");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(CSHARP_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), CSHARP_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    const PYTHON_SNIPPET:&str="---\nid: python-test\nlanguage: python\ntitle: Python test\ndescription: Python example\ncategory: Python Basics\ntags: []\npythonVersion: \"3.9\"\nimports: [from pathlib import Path]\n---\n\n```python\nif True:\n    print(42)\n```\n";
    #[test]
    fn validates_python_and_legacy_java() {
        assert_eq!(metadata(SNIPPET).unwrap().language, "java");
        assert_eq!(metadata(PYTHON_SNIPPET).unwrap().language, "python");
        assert!(metadata(&PYTHON_SNIPPET.replace("\"3.9\"", "3.9")).is_err());
        assert!(metadata(&PYTHON_SNIPPET.replace("\"3.9\"", "\"3.09\"")).is_err());
        assert!(metadata(&PYTHON_SNIPPET.replace("```python", "```java")).is_err());
        assert!(metadata(
            &PYTHON_SNIPPET.replace("pythonVersion:", "javaVersion: 8\npythonVersion:")
        )
        .is_err());
        assert!(metadata(&format!(
            "{PYTHON_SNIPPET}\n```python primary\nx=1\n```\n```python primary\ny=2\n```\n"
        ))
        .is_err());
    }
    #[test]
    fn python_upgrade_preserves_java_edits_and_deleted_defaults() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        fs::write(library.path().join("edited.md"), SNIPPET).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        assert_eq!(
            read_text(&library.path().join("edited.md")).unwrap(),
            SNIPPET
        );
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(files.len(), 16);
        let python = files
            .iter()
            .find(|file| file.path.starts_with("Python/"))
            .unwrap();
        let deleted = library.path().join(&python.path);
        fs::remove_file(&deleted).unwrap();
        let edited = library.path().join(
            &files
                .iter()
                .filter(|file| file.path.starts_with("Python/"))
                .nth(1)
                .unwrap()
                .path,
        );
        atomic_write(&edited, "keep user edit", false).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        assert!(!deleted.exists());
        assert_eq!(read_text(&edited).unwrap(), "keep user edit");
    }
    #[test]
    fn python_upgrade_reserves_existing_ids() {
        let library = tempfile::tempdir().unwrap();
        let config = tempfile::tempdir().unwrap();
        let custom = PYTHON_SNIPPET.replace("python-test", "py-read-text");
        fs::write(library.path().join("custom.md"), &custom).unwrap();
        seed_python_upgrade(library.path(), config.path()).unwrap();
        let mut files = vec![];
        scan(library.path(), library.path(), &mut files, &mut vec![]);
        assert_eq!(
            files
                .iter()
                .filter(|f| f.content.contains("id: py-read-text"))
                .count(),
            1
        );
        assert_eq!(
            read_text(&library.path().join("custom.md")).unwrap(),
            custom
        );
    }
    #[test]
    fn python_create_edit_and_delete_on_disk() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, PYTHON_SNIPPET.into(), None, None).unwrap();
        assert_eq!(path, "Python/python-test.md");
        assert!(save_library_snippet(&state, PYTHON_SNIPPET.into(), None, None).is_err());
        let updated = PYTHON_SNIPPET.replace("print(42)", "print(43)");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(PYTHON_SNIPPET.into()),
        )
        .unwrap();
        assert_eq!(read_text(&state.root.join(&path)).unwrap(), updated);
        assert!(delete_library_snippet(&state, path.clone(), PYTHON_SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    const SNIPPET:&str="---\nid: test-snippet\ntitle: Test\ndescription: Test snippet\ncategory: Utilities\ntags: []\njavaVersion: 8\n---\n\n```java\nint x = 1;\n```\n";
    #[test]
    fn validates_metadata() {
        assert!(metadata(SNIPPET).is_ok());
        assert!(metadata(&SNIPPET.replace("test-snippet", "../escape")).is_err());
    }
    #[test]
    fn validates_java_fences() {
        assert!(metadata(&SNIPPET.replace("```java", "```java   ")).is_ok());
        assert!(metadata(&SNIPPET.replace("\n```\n", "\n")).is_err());
        assert!(metadata(&format!(
            "{SNIPPET}\n```java primary\nint y=2;\n```\n```java primary\nint z=3;\n```\n"
        ))
        .is_err());
    }
    #[test]
    fn rejects_traversal() {
        let temp = tempfile::tempdir().unwrap();
        assert!(safe_path(temp.path(), "../other.md").is_err());
        assert!(safe_path(temp.path(), "C:\\other.md").is_err());
        assert!(safe_path(temp.path(), "snippet.txt").is_err());
    }
    #[test]
    fn atomic_replacement_and_no_clobber() {
        let temp = tempfile::tempdir().unwrap();
        let file = temp.path().join("test.md");
        atomic_write(&file, "original", true).unwrap();
        assert!(atomic_write(&file, "overwrite", true).is_err());
        assert_eq!(read_text(&file).unwrap(), "original");
        atomic_write(&file, "updated", false).unwrap();
        assert_eq!(read_text(&file).unwrap(), "updated");
    }
    #[test]
    fn seeds_preserve_edits() {
        let temp = tempfile::tempdir().unwrap();
        seed(&DEFAULTS, temp.path()).unwrap();
        let mut files = vec![];
        scan(temp.path(), temp.path(), &mut files, &mut vec![]);
        assert!(files.len() >= 30);
        let target = temp.path().join(&files[0].path);
        atomic_write(&target, "user edit", false).unwrap();
        seed(&DEFAULTS, temp.path()).unwrap();
        assert_eq!(read_text(&target).unwrap(), "user edit");
    }
    #[test]
    fn create_edit_duplicate_and_conflict() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        let path = save_library_snippet(&state, SNIPPET.into(), None, None).unwrap();
        assert!(save_library_snippet(&state, SNIPPET.into(), None, None).is_err());
        let other = SNIPPET.replace("test-snippet", "other-id");
        save_library_snippet(&state, other.clone(), None, None).unwrap();
        assert!(save_library_snippet(
            &state,
            SNIPPET.into(),
            Some("other-id.md".into()),
            Some(other)
        )
        .unwrap_err()
        .contains("Duplicate ID"));
        let updated = SNIPPET.replace("int x = 1;", "int x = 2;");
        save_library_snippet(
            &state,
            updated.clone(),
            Some(path.clone()),
            Some(SNIPPET.into()),
        )
        .unwrap();
        assert!(save_library_snippet(
            &state,
            SNIPPET.into(),
            Some(path.clone()),
            Some(SNIPPET.into())
        )
        .unwrap_err()
        .contains("changed outside"));
        assert!(delete_library_snippet(&state, path.clone(), SNIPPET.into()).is_err());
        delete_library_snippet(&state, path.clone(), updated).unwrap();
        assert!(!state.root.join(path).exists());
    }
    #[test]
    fn invalid_existing_file_still_reserves_id() {
        let temp = tempfile::tempdir().unwrap();
        let state = Library {
            root: temp.path().to_owned(),
            preferences: temp.path().join("preferences.json"),
            lock: Mutex::new(()),
        };
        fs::write(
            temp.path().join("broken.md"),
            SNIPPET.replace("```java", "```text"),
        )
        .unwrap();
        assert!(save_library_snippet(&state, SNIPPET.into(), None, None)
            .unwrap_err()
            .contains("Duplicate ID"));
    }
}
