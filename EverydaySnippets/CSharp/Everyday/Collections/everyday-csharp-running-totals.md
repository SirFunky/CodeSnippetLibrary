---
id: "everyday-csharp-running-totals"
language: "csharp"
title: "Calculate checked running totals"
description: "Calculate checked running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "csharp"]
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
        long sum = 0;
        foreach (int n in new[] { 2, -1, 4 }) {
            sum = checked(sum + n);
            Console.WriteLine(sum);
        }
    }
}
```

## Notes

Checked arithmetic throws OverflowException rather than wrapping.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
