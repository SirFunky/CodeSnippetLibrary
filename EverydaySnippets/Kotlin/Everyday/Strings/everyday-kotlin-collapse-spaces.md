---
id: "everyday-kotlin-collapse-spaces"
language: "kotlin"
title: "Collapse runs of whitespace"
description: "Collapse runs of whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    println(" Ada\t Linus\nGrace ".trim().replace(Regex("\\s+")," "))
}
```

## Notes

Normalizes whitespace; do not apply to code or whitespace-sensitive data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
