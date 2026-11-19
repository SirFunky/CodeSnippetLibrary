---
id: "everyday-kotlin-transpose"
language: "kotlin"
title: "Transpose a rectangular matrix"
description: "Transpose a rectangular matrix."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val rows=listOf(listOf(1,2,3),listOf(4,5,6))
    val width=rows.firstOrNull()?.size?:0
    require(rows.all  {
        it.size==width
    }
    )
    println((0 until width).map  {
        c->rows.map  {
            it[c]
        }
    }
    )
}
```

## Notes

Ragged matrices rejected with IllegalArgumentException; empty input returns empty.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
