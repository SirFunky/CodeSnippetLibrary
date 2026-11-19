---
id: "everyday-kotlin-valid-date"
language: "kotlin"
title: "Validate a Gregorian calendar date"
description: "Validate a Gregorian calendar date."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    for(y in listOf(2024,2023)) {
        val valid=try  {
            java.time.LocalDate.of(y,2,29)
            true
        }
        catch(e:java.time.DateTimeException) {
            false
        }
        println(valid)
    }
}
```

## Notes

Uses Java 8 LocalDate. Invalid components raise DateTimeException, converted to false.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
