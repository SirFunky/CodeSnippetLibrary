---
id: "kt-use-reader"
language: "kotlin"
title: "Close a reader with use"
description: "Close a reader with use."
category: "Files & I/O"
tags: ["use-reader", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: ["java.io.File"]
---

```kotlin
package snippets

fun main() {
    val firstLine = File("lines.txt").bufferedReader(Charsets.UTF_8).use { reader ->
        reader.readLine()
    }
    println(firstLine ?: "Empty file")
}
```

## Notes

Kotlin/JVM example. use closes the reader even when the block throws. Requires lines.txt; opening or reading can fail with IOException/security errors. Do not return a lazy reader-backed sequence from inside use. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
