---
id: "everyday-csharp-valid-date"
language: "csharp"
title: "Validate a Gregorian calendar date"
description: "Validate a Gregorian calendar date."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "csharp"]
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports: []
---

```csharp
using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;

class Program {

    static void Main() {
        foreach (int year in new[] { 2024, 2023 })
            Console.WriteLine(DateTime.TryParseExact($"{year}-02-29", "yyyy-MM-dd",
                                                     CultureInfo.InvariantCulture,
                                                     DateTimeStyles.None, out _)
                                  ? "true"
                                  : "false");
    }
}
```

## Notes

Exact invariant format validates leap days. Dates have no timezone in this example.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
