---
id: "everyday-kotlin-parse-flag"
language: "kotlin"
title: "Parse a configuration boolean"
description: "Parse a configuration boolean."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["parse-flag", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun flag(s:String):Boolean? = when(s.trim().lowercase(java.util.Locale.ROOT)) {
        "true","yes","1"->true
        "false","no","0"->false
        else->null
    }
    println(flag(" YES "))
    println(flag("maybe"))
}
```

## Notes

Explicit accepted vocabulary; unknown values return null.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
