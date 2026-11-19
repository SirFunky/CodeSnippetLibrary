---
id: "everyday-csharp-chunk-list"
language: "csharp"
title: "Split a sequence into chunks"
description: "Split a sequence into chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "csharp"]
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
        foreach (var part in Enumerable.Range(1, 5).Chunk(2))
            Console.WriteLine(string.Join(",", part));
    }
}
```

## Notes

Chunk requires a positive size and returns separate arrays. Available in the declared .NET runtime.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
