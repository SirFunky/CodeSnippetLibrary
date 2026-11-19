---
id: "extra-kotlin-adjacent-changes"
language: "kotlin"
title: "Calculate changes between adjacent readings"
description: "Calculate changes between adjacent readings."
category: "Collections"
subcategory: "Practical extras"
tags: ["adjacent-changes", "practical", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main() {
    val readings = listOf(10L, 15L, 12L)
    val changes = readings.zipWithNext { previous, current -> Math.subtractExact(current, previous) }
    println(changes)
    println(emptyList<Long>().zipWithNext { a, b -> b - a })
}
```

## Notes

zipWithNext preserves input order and returns no pairs for fewer than two values. Math.subtractExact throws ArithmeticException on Long overflow.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
