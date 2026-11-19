---
id: "everyday-csharp-window-sums"
language: "csharp"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "csharp"]
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
        int[] a = { 1, 2, 3, 4 };
        int width = 3;
        var sums = new List<long>();
        long sum = 0;
        for (int i = 0; i < a.Length; i++) {
            sum += a[i];
            if (i >= width)
                sum -= a[i - width];
            if (i >= width - 1)
                sums.Add(sum);
        }
        Console.WriteLine(string.Join(",", sums));
    }
}
```

## Notes

Positive width is a precondition. Uses long accumulation for int input; validate total range in large workloads.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
