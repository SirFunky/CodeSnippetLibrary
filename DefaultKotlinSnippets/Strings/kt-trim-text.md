---
id: "kt-trim-text"
language: "kotlin"
title: "Trim surrounding whitespace"
description: "Trim surrounding whitespace."
category: "Strings"
tags: ["trim-text", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

fun main() {
    val text = "  Ada\t\n"
    println(text.trim())
}
```

## Notes

trim removes matching whitespace at the edges; it does not collapse internal whitespace. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
