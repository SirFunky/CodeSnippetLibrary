---
id: "everyday-kotlin-duration"
language: "kotlin"
title: "Format elapsed seconds"
description: "Format elapsed seconds."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    val s=3661L
    require(s>=0)
    println(listOf(s/3600,s%3600/60,s%60).joinToString(":") {
        it.toString().padStart(2,'0')
    }
    )
}
```

## Notes

Nonnegative elapsed whole seconds, not a clock or timezone. Hours may exceed 23.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
