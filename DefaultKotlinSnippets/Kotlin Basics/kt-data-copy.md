---
id: "kt-data-copy"
language: "kotlin"
title: "Copy a data class with changed fields"
description: "Copy a data class with changed fields."
category: "Kotlin Basics"
tags: ["data-copy", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

data class Settings(val theme: String, val fontSize: Int)
fun main() {
    val original = Settings("dark", 13)
    val updated = original.copy(fontSize = 16)
    println(original)
    println(updated)
}
```

## Notes

copy is shallow. Referenced mutable objects would still be shared unless explicitly copied; these sample fields are immutable values. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
