---
id: "everyday-kotlin-running-totals"
language: "kotlin"
title: "Calculate checked running totals"
description: "Calculate checked running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    var total=0L
    println(listOf(2L,-1L,4L).map  {
        total=Math.addExact(total,it)
        total
    }
    )
}
```

## Notes

Math.addExact raises ArithmeticException on Long overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
