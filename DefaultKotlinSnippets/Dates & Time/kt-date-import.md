---
id: "kt-date-import"
language: "kotlin"
title: "Parse a date with an aliased import"
description: "Parse a date with an aliased import."
category: "Dates & Time"
tags: ["date-import", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: ["java.time.LocalDate as Date"]
---

```kotlin
package snippets

fun main() {
    val date = Date.parse("2024-01-02")
    println(date.plusDays(1))
}
```

## Notes

Kotlin/JVM example using Java 8 java.time, with no timezone database or network dependency. Invalid date text throws DateTimeParseException. The alias keeps the source name Date local to this file. Standard Kotlin/JVM and JDK libraries only; no third-party dependencies or coroutine library. This is a complete program. Copy with imports places metadata imports after the package declaration. JVM 8 is the bytecode target; Kotlin language/API versions are separate.
