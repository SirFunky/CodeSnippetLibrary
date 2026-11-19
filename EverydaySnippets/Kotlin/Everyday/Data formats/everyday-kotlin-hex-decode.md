---
id: "everyday-kotlin-hex-decode"
language: "kotlin"
title: "Validate and decode hexadecimal"
description: "Validate and decode hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun decode(s:String):List<Int>?  {
        if(s.length%2!=0 || !s.matches(Regex("[0-9a-fA-F]*")))return null
        return s.chunked(2).map  {
            it.toInt(16)
        }
    }
    println(decode("000fff"))
    println(decode("0x"))
}
```

## Notes

Requires even-length hexadecimal without prefixes or whitespace.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
