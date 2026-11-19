---
id: "everyday-kotlin-format-cents"
language: "kotlin"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    for(c in listOf(12345L,-5L)) {
        val sign=if(c<0)"-" else ""
        val q=c/100
        val r=c%100
        println(sign+kotlin.math.abs(q)+"."+kotlin.math.abs(r).toString().padStart(2,'0'))
    }
}
```

## Notes

Quotient/remainder avoids negating Long.MIN_VALUE. Literal decimal point; no locale/currency policy.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
