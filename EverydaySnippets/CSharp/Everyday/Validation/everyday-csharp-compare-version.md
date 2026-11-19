---
id: "everyday-csharp-compare-version"
language: "csharp"
title: "Compare numeric dotted versions"
description: "Compare numeric dotted versions."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["compare-version", "everyday", "csharp"]
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
        Console.WriteLine(Math.Sign(new Version("1.9").CompareTo(new Version("1.10"))));
        Console.WriteLine(new Version("2.0").Equals(new Version("2.0")) ? "equal"
                                                                        : "different");
    }
}
```

## Notes

System.Version accepts 2–4 nonnegative integer components. Not SemVer; missing components have distinct semantics.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
