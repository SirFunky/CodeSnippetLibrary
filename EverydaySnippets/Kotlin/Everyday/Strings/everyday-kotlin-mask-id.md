---
id: "everyday-kotlin-mask-id"
language: "kotlin"
title: "Mask an identifier for display"
description: "Mask an identifier for display."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun mask(s:String)=if(s.length<=4)s else "*".repeat(s.length-4)+s.takeLast(4)
    println(mask("ABC123456"))
    println(mask("123"))
}
```

## Notes

Counts UTF-16 units. Display masking is not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
