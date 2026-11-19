---
id: "extra-kotlin-strip-accents"
language: "kotlin"
title: "Remove combining accents for a search key"
description: "Remove combining accents for a search key."
category: "Strings"
subcategory: "Practical extras"
tags: ["strip-accents", "practical", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
import java.text.Normalizer
fun main() {
    val decomposed = Normalizer.normalize("Café", Normalizer.Form.NFD)
    val key = decomposed.replace(Regex("\\p{M}+"), "")
    println(key)
}
```

## Notes

JVM-only normalization and Unicode mark removal. This is a lossy search-key transformation, not complete transliteration; keep original display text. Removing all marks may erase meaningful distinctions in other scripts.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
