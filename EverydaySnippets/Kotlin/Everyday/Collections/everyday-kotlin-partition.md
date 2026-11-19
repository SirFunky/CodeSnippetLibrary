---
id: "everyday-kotlin-partition"
language: "kotlin"
title: "Partition values while keeping order"
description: "Partition values while keeping order."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val (even,odd)=listOf(1,2,3,4).partition  {
        it%2==0
    }
    println(even)
    println(odd)
}
```

## Notes

Single-pass partition; each result preserves input order.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
