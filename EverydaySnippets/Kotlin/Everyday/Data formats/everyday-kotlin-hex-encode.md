---
id: "everyday-kotlin-hex-encode"
language: "kotlin"
title: "Encode bytes as hexadecimal"
description: "Encode bytes as hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-encode", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    println(byteArrayOf(0,15,-1).joinToString("")  {
        "%02x".format(it.toInt() and 255)
    }
    )
}
```

## Notes

Signed bytes are masked to 0–255 before formatting. Encoding is not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
