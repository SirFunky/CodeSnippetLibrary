---
id: "extra-csharp-case-insensitive-map"
language: "csharp"
title: "Use ordinal case-insensitive dictionary keys"
description: "Use ordinal case-insensitive dictionary keys."
category: "Collections"
subcategory: "Practical extras"
tags: ["case-insensitive-map", "practical", "csharp"]
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports: []
---

```csharp
using System;
using System.Collections.Generic;
class Program {
    static void Main() {
        var settings = new Dictionary<string, string>(
            StringComparer.OrdinalIgnoreCase) { ["Theme"] = "dark" };
        Console.WriteLine(settings.TryGetValue("THEME", out var theme) ? theme
                                                                       : "missing");
        Console.WriteLine(settings.TryGetValue("font", out var font) ? font : "missing");
    }
}
```

## Notes

OrdinalIgnoreCase is appropriate for case-insensitive machine keys. It is not linguistic sorting or Unicode normalization; add an explicit normalization policy if required.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
