---
id: "everyday-csharp-transpose"
language: "csharp"
title: "Transpose a rectangular array"
description: "Transpose a rectangular array."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "csharp"]
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
        int[,] a = { { 1, 2, 3 }, { 4, 5, 6 } };
        for (int c = 0; c < a.GetLength(1); c++) {
            var row = new List<int>();
            for (int r = 0; r < a.GetLength(0); r++)
                row.Add(a[r, c]);
            Console.WriteLine(string.Join(",", row));
        }
    }
}
```

## Notes

A rectangular multidimensional array avoids ragged-row ambiguity.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
