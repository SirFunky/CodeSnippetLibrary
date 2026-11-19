---
id: "everyday-kotlin-csv-field"
language: "kotlin"
title: "Escape one CSV field"
description: "Escape one CSV field."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-field", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun field(s:String)=if(s.any  {
        it in ",\"\r\n"
    }
    ) "\""+s.replace("\"","\"\"")+"\"" else s
    println(field("Ada, \"A\""))
    println(field("plain"))
}
```

## Notes

Comma-separated field escaping; formula handling in spreadsheets requires a separate policy.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
