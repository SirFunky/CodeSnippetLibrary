---
id: "kt-associate"
language: "kotlin"
title: "Build a lookup map with associateBy"
description: "Build a lookup map with associateBy."
category: "Collections"
tags: ["associate", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

data class User(val id: Int, val name: String)
fun main() {
    val users = listOf(User(1, "Ada"), User(2, "Linus"), User(1, "Grace"))
    val byId = users.associateBy { it.id }
    println(byId[1]?.name)
    println(byId.size)
}
```

## Notes

With duplicate keys, the last value wins. Use groupBy when all values for each key must be preserved. Read-only collection interfaces do not guarantee deep immutability. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
