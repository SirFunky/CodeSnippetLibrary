---
id: "kt-filter-map"
language: "kotlin"
title: "Filter and transform a collection"
description: "Filter and transform a collection."
category: "Collections"
tags: ["filter-map", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
package snippets

fun main() {
    val values = listOf(-2, 1, 0, 3)
    val doubled = values.filter { it > 0 }.map { it * 2 }
    println(doubled)
    println(values)
}
```

## Notes

filter and map return new collections. This example uses small Int values; arithmetic on arbitrary Int input can overflow. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
