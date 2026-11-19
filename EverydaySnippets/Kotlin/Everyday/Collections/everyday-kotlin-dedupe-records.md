---
id: "everyday-kotlin-dedupe-records"
language: "kotlin"
title: "Keep the first record for each ID"
description: "Keep the first record for each ID."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    data class Row(val id:Int,val name:String)
    val rows=listOf(Row(1,"Ada"),Row(1,"Other"),Row(2,"Linus"))
    for(r in rows.distinctBy  {
        it.id
    }
    )println("${r.id}:${r.name}")
}
```

## Notes

distinctBy retains the first item per key and source order.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
