---
id: "kt-parse-integer"
language: "kotlin"
title: "Parse an integer without throwing"
description: "Parse an integer without throwing."
category: "Types & Validation"
tags: ["parse-integer", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

fun main() {
    println("42".toIntOrNull())
    println("42x".toIntOrNull())
    println("999999999999999999999".toIntOrNull())
}
```

## Notes

toIntOrNull returns null for syntax or Int-range failures. It does not trim whitespace; validate whether surrounding whitespace is allowed before trimming. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
