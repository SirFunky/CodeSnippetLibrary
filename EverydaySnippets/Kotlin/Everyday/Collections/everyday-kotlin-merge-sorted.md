---
id: "everyday-kotlin-merge-sorted"
language: "kotlin"
title: "Merge two sorted lists"
description: "Merge two sorted lists."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val a=listOf(1,3,5)
    val b=listOf(2,3,4)
    val out=mutableListOf<Int>()
    var i=0
    var j=0
    while(i<a.size && j<b.size)out.add(if(a[i]<=b[j])a[i++] else b[j++])
    out.addAll(a.drop(i))
    out.addAll(b.drop(j))
    println(out)
}
```

## Notes

Ascending inputs required. Linear merge preserves duplicates.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
