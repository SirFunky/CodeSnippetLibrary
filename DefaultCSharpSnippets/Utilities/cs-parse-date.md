---
id: cs-parse-date
title: Parse an ISO date
description: Parse an exact date using DateOnly and invariant culture.
language: csharp
category: Utilities
subcategory: Date & time
tags:
  - date
  - iso
  - parse
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System
  - System.Globalization
---

```csharp
var day = DateOnly.ParseExact(
    "2026-11-19", "yyyy-MM-dd", CultureInfo.InvariantCulture);
```

## Notes

DateOnly has no time-of-day or time-zone component. Invalid input throws FormatException. DateOnly requires .NET 6+; this example is verified against the declared .NET 8 target.
