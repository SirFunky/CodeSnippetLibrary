---
id: "everyday-kotlin-safe-divide"
language: "kotlin"
title: "Handle invalid floating-point division"
description: "Handle invalid floating-point division."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun divide(a:Double,b:Double):Double?  {
        if(!a.isFinite() || !b.isFinite() || b==0.0)return null
        return (a/b).takeIf  {
            it.isFinite()
        }
    }
    println(divide(10.0,4.0))
    println(divide(1.0,0.0))
}
```

## Notes

Null for non-finite inputs/results or a zero divisor; normal binary rounding remains.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
