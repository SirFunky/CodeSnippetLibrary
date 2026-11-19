---
id: cs-parse-int
title: Parse an integer safely
description: Handle invalid numeric input without an exception.
language: csharp
category: C# Basics
subcategory: Conversion
tags:
  - integer
  - parse
  - tryparse
csharpVersion: "7.0"
dotnetVersion: "8.0"
imports:
  - System
  - System.Globalization
---

```csharp
var text = "42";
if (int.TryParse(text, NumberStyles.Integer,
        CultureInfo.InvariantCulture, out int value))
{
    Console.WriteLine(value);
}
```

## Notes

TryParse returns false for invalid or out-of-range input. The inline out variable requires C# 7.0. The invariant culture avoids machine-specific parsing.
