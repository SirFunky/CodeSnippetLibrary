---
id: "everyday-csharp-pagination"
language: "csharp"
title: "Calculate pagination bounds"
description: "Calculate pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "csharp"]
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
        int total = 23, page = 3, size = 10;
        if (total < 0 || page < 1 || size < 1)
            throw new ArgumentOutOfRangeException();
        long start = Math.Min((long)(page - 1) * size, total);
        long end = Math.Min(start + size, total);
        Console.WriteLine($"{start},{end}");
    }
}
```

## Notes

One-based pages; end-exclusive offsets. Widening multiplication to long prevents int overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
