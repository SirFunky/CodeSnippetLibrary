---
id: "kt-null-safety"
language: "kotlin"
title: "Use safe calls with an Elvis default"
description: "Use safe calls with an Elvis default."
category: "Kotlin Basics"
tags: ["null-safety", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

fun displayName(name: String?): String = name?.trim()?.takeIf { it.isNotEmpty() } ?: "Anonymous"
fun main() {
    println(displayName(" Ada "))
    println(displayName(null))
    println(displayName("  "))
}
```

## Notes

Safe calls avoid dereferencing null. takeIf also handles blank input after trimming; the Elvis operator supplies the fallback. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
