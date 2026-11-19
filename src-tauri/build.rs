fn main() {
    println!("cargo:rerun-if-changed=../DefaultSnippets");
    println!("cargo:rerun-if-changed=../DefaultPythonSnippets");
    println!("cargo:rerun-if-changed=../DefaultCSharpSnippets");
    println!("cargo:rerun-if-changed=../DefaultCppSnippets");
    println!("cargo:rerun-if-changed=../DefaultSqlSnippets");
    println!("cargo:rerun-if-changed=../DefaultTypeScriptSnippets");
    println!("cargo:rerun-if-changed=../DefaultCSnippets");
    println!("cargo:rerun-if-changed=../DefaultJavaScriptSnippets");
    println!("cargo:rerun-if-changed=../DefaultGoSnippets");
    println!("cargo:rerun-if-changed=../DefaultKotlinSnippets");
    println!("cargo:rerun-if-changed=../DefaultCobolSnippets");
    println!("cargo:rerun-if-changed=../StarterSnippets");
    println!("cargo:rerun-if-changed=../EverydaySnippets");
    println!("cargo:rerun-if-changed=../ExtraSnippets");
    tauri_build::build()
}
