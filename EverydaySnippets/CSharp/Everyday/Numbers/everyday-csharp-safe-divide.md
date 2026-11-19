---
id: "everyday-csharp-safe-divide"
language: "csharp"
title: "Handle invalid floating-point division"
description: "Handle invalid floating-point division."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "csharp"]
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
        double ? Divide(double a, double b) {
            if (!double.IsFinite(a) || !double.IsFinite(b) || b == 0)
                return null;
            double x = a / b; return double.IsFinite(x) ? x : (double?)null;
        }
        Console.WriteLine(Divide(10, 4)?.ToString(CultureInfo.InvariantCulture));
        Console.WriteLine(Divide(1, 0)?.ToString() ?? "invalid");
    }
}
```

## Notes

Returns null for zero divisors and non-finite inputs/results. Floating-point rounding remains.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
