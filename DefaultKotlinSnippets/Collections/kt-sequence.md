---
id: "kt-sequence"
language: "kotlin"
title: "Process a sequence lazily"
description: "Process a sequence lazily."
category: "Collections"
tags: ["sequence", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

fun main() {
    val result = sequenceOf(1, 2, 3, 4, 5)
        .filter { it % 2 != 0 }
        .map { it * 10 }
        .take(2)
        .toList()
    println(result)
}
```

## Notes

Sequence operations run when the terminal operation consumes them. Repeated consumption may repeat work; avoid relying on side effects in intermediate operations. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
