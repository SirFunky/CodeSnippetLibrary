---
id: "everyday-csharp-dedupe-records"
language: "csharp"
title: "Keep the first record for each ID"
description: "Keep the first record for each ID."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "csharp"]
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
        var records = new[] { (Id: 1, Name: "Ada"), (Id: 1, Name: "Other"),
                              (Id: 2, Name: "Linus") };
        var seen = new HashSet<int>();
        foreach (var r in records)
            if (seen.Add(r.Id))
                Console.WriteLine($"{r.Id}:{r.Name}");
    }
}
```

## Notes

Explicit first-wins duplicate policy preserves input order.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
