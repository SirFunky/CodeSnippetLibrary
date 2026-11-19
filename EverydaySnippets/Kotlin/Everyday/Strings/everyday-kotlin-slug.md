---
id: "everyday-kotlin-slug"
language: "kotlin"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    println(" Ada Lovelace! ".lowercase(java.util.Locale.ROOT).replace(Regex("[^a-z0-9]+"),"-").trim('-'))
}
```

## Notes

ASCII-only output; non-ASCII letters removed. Uniqueness is separate.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
