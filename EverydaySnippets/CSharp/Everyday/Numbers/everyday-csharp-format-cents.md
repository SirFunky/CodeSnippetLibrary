---
id: "everyday-csharp-format-cents"
language: "csharp"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "csharp"]
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
        foreach (long cents in new long[] { 12345, -5 })
            Console.WriteLine(
                (cents / 100m).ToString("0.00", CultureInfo.InvariantCulture));
    }
}
```

## Notes

Decimal division keeps integer cents exact; locale and currency are separate decisions.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
