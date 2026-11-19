---
id: "everyday-kotlin-window-sums"
language: "kotlin"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val a=listOf(1L,2L,3L,4L)
    val width=3
    require(width>0)
    var sum=0L
    val result=mutableListOf<Long>()
    for(i in a.indices) {
        sum+=a[i]
        if(i>=width)sum-=a[i-width]
        if(i>=width-1)result.add(sum)
    }
    println(result)
}
```

## Notes

O(n) rolling sums. All intermediates must fit Long; width beyond input produces an empty list.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
