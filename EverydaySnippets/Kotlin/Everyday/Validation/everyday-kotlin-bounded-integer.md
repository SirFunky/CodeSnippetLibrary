---
id: "everyday-kotlin-bounded-integer"
language: "kotlin"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun bounded(s:String):Int?  {
        if(!s.matches(Regex("[+-]?[0-9]+")))return null
        return s.toIntOrNull()?.takeIf  {
            it in 0..100
        }
    }
    for(s in listOf("42","42x","999"))println(bounded(s))
}
```

## Notes

Rejects whitespace, overflow, partial parses and out-of-range input.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
