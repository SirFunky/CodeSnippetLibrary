---
id: "everyday-kotlin-rotate"
language: "kotlin"
title: "Rotate a list by a signed offset"
description: "Rotate a list by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val a=listOf(1,2,3,4)
    val offset=-1
    val n=if(a.isEmpty())0 else Math.floorMod(offset,a.size)
    println(a.drop(n)+a.take(n))
}
```

## Notes

Positive offsets rotate left; negative right; returns a new shallow list.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
