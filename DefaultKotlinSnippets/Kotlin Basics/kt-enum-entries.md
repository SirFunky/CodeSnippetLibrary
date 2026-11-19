---
id: "kt-enum-entries"
language: "kotlin"
title: "List enum constants using entries"
description: "List enum constants using entries."
category: "Kotlin Basics"
tags: ["enum-entries", "kotlin"]
kotlinVersion: "1.9"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

enum class Color { RED, GREEN, BLUE }
fun main() {
    println(Color.entries.joinToString { it.name.lowercase() })
}
```

## Notes

Enum entries became stable in Kotlin 1.9. It provides an immutable list in declaration order. https://kotlinlang.org/docs/whatsnew19.html Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
