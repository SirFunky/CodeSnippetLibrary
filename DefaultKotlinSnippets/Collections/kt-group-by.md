---
id: "kt-group-by"
language: "kotlin"
title: "Group items by a property"
description: "Group items by a property."
category: "Collections"
tags: ["group-by", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

data class Member(val team: String, val name: String)
fun main() {
    val members = listOf(Member("a", "Ada"), Member("b", "Linus"), Member("a", "Grace"))
    val groups = members.groupBy { it.team }
    println(groups["a"]?.map { it.name })
    println(groups["missing"].orEmpty())
}
```

## Notes

Grouped values preserve input order and share the original objects. orEmpty handles a missing group without using the non-null assertion operator. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
