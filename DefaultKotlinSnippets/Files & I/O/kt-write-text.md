---
id: "kt-write-text"
language: "kotlin"
title: "Write a UTF-8 text file"
description: "Write a UTF-8 text file."
category: "Files & I/O"
tags: ["write-text", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: ["java.io.File"]
---

```kotlin
package snippets

fun main() {
    File("output.txt").writeText("Hello, Kotlin!", Charsets.UTF_8)
    println("Written")
}
```

## Notes

Kotlin/JVM example. Creates or truncates output.txt and can throw IOException/security failures. This is not an atomic replacement; propagate or handle errors in application code. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
