---
id: "everyday-csharp-merge-sorted"
language: "csharp"
title: "Merge two sorted sequences"
description: "Merge two sorted sequences."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "csharp"]
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
        int[] a = { 1, 3, 5 }, b = { 2, 3, 4 };
        int i = 0, j = 0;
        var output = new List<int>();
        while (i < a.Length && j < b.Length)
            output.Add(a[i] <= b[j] ? a[i++] : b[j++]);
        output.AddRange(a.Skip(i));
        output.AddRange(b.Skip(j));
        Console.WriteLine(string.Join(",", output));
    }
}
```

## Notes

Inputs must already be ascending; duplicates are preserved. Linear time.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
