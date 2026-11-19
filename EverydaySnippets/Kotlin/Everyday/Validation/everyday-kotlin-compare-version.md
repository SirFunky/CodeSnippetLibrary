---
id: "everyday-kotlin-compare-version"
language: "kotlin"
title: "Compare numeric dotted versions"
description: "Compare numeric dotted versions."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["compare-version", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun compare(a:String,b:String):Int  {
        fun parts(s:String):List<Int> {
            require(s.matches(Regex("[0-9]+(\\.[0-9]+)*")))
            return s.split('.').map  {
                it.toInt()
            }
        }
        val x=parts(a)
        val y=parts(b)
        for(i in 0 until maxOf(x.size,y.size)) {
            val c=(x.getOrNull(i)?:0).compareTo(y.getOrNull(i)?:0)
            if(c!=0)return c
        }
        return 0
    }
    println(compare("1.9","1.10"))
    println(compare("2.0","2"))
}
```

## Notes

Numeric dotted versions only, components must fit Int; invalid input throws. Not SemVer.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
