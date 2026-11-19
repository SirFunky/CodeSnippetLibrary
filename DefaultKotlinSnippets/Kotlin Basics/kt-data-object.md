---
id: "kt-data-object"
language: "kotlin"
title: "Represent a singleton with a data object"
description: "Represent a singleton with a data object."
category: "Kotlin Basics"
tags: ["data-object", "kotlin"]
kotlinVersion: "1.9"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

sealed interface ReadResult
data class NumberResult(val value: Int) : ReadResult
data object EndOfInput : ReadResult
fun describe(result: ReadResult): String = when (result) {
    is NumberResult -> "Value: ${result.value}"
    EndOfInput -> "End"
}
fun main() {
    println(EndOfInput)
    println(describe(EndOfInput))
}
```

## Notes

Data objects became stable in Kotlin 1.9. They provide generated toString/equals/hashCode for a named singleton and pair naturally with sealed hierarchies. https://kotlinlang.org/docs/whatsnew19.html Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
