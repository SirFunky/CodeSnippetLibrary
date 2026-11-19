---
id: "everyday-kotlin-chunk-list"
language: "kotlin"
title: "Split a list into chunks"
description: "Split a list into chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    println((1..5).toList().chunked(2))
    println(emptyList<Int>().chunked(2))
}
```

## Notes

Positive chunk size required; creates separate lists with shared element references.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
