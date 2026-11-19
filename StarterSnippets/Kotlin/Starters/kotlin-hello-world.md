---
id: "starter-kotlin-hello-world"
language: "kotlin"
title: "Hello World — Kotlin"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main() {
    println("Hello, World!")
}
```

## Notes

Outputs Hello, World! followed by a newline.

Kotlin/JVM starter. Save as Main.kt. With the standalone Kotlin compiler and a compatible JDK: kotlinc Main.kt -jvm-target 1.8 -include-runtime -d hello.jar. Run: java -jar hello.jar. Kotlin 1.8 is a supported language/API baseline; JVM 8 is the bytecode target, separate from the JDK used for compilation/testing.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
