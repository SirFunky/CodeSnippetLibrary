---
id: "kt-read-text"
language: "kotlin"
title: "Read a UTF-8 text file"
description: "Read a UTF-8 text file."
category: "Files & I/O"
tags: ["read-text", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: ["java.io.File"]
---

```kotlin
package snippets

fun main() {
    val content = File("example.txt").readText(Charsets.UTF_8)
    println(content)
}
```

## Notes

Kotlin/JVM example. Requires example.txt in the working directory. Reads the whole file; handle IOException/security failures in application code and use streaming for large inputs. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
