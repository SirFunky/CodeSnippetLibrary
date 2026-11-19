---
id: "everyday-kotlin-pagination"
language: "kotlin"
title: "Calculate pagination bounds"
description: "Calculate pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val total=23
    val page=3
    val size=10
    require(total>=0 && page>=1 && size>=1)
    val start=minOf((page.toLong()-1)*size,total.toLong())
    val end=minOf(start+size,total.toLong())
    println("$start,$end")
}
```

## Notes

One-based page, zero-based end-exclusive range. Widened multiplication avoids Int overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
