---
id: "everyday-csharp-rotate"
language: "csharp"
title: "Rotate an array by a signed offset"
description: "Rotate an array by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "csharp"]
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
        int offset = -1;
        int n = a.Length == 0 ? 0 : ((offset % a.Length) + a.Length) % a.Length;
        Console.WriteLine(string.Join(",", a.Skip(n).Concat(a.Take(n))));
    }
}
```

## Notes

Positive offsets rotate left; negative offsets rotate right. Empty arrays remain empty.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
