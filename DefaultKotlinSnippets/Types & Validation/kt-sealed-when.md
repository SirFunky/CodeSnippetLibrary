---
id: "kt-sealed-when"
language: "kotlin"
title: "Handle a sealed hierarchy exhaustively"
description: "Handle a sealed hierarchy exhaustively."
category: "Types & Validation"
tags: ["sealed-when", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

sealed interface Outcome
data class Success(val value: Int) : Outcome
data class Failure(val message: String) : Outcome
fun describe(outcome: Outcome): String = when (outcome) {
    is Success -> "Value: ${outcome.value}"
    is Failure -> outcome.message
}
fun main() {
    println(describe(Success(42)))
    println(describe(Failure("Missing")))
}
```

## Notes

A sealed hierarchy lets when expressions cover all known implementations. Adding another implementation requires handling it here. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
