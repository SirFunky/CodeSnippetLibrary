---
id: "everyday-csharp-partition"
language: "csharp"
title: "Partition values while keeping order"
description: "Partition values while keeping order."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "csharp"]
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
        var yes = new List<int>();
        var no = new List<int>();
        foreach (int n in new[] { 1, 2, 3, 4 })
            (n % 2 == 0 ? yes : no).Add(n);
        Console.WriteLine(string.Join(",", yes));
        Console.WriteLine(string.Join(",", no));
    }
}
```

## Notes

Each value is examined once; both partitions retain source order.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
