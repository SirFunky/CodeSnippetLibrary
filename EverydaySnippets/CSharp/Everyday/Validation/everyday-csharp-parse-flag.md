---
id: "everyday-csharp-parse-flag"
language: "csharp"
title: "Parse a configuration boolean"
description: "Parse a configuration boolean."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["parse-flag", "everyday", "csharp"]
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
        bool ? Parse(string s) {
            switch (s.Trim().ToLowerInvariant()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
                return false;
            default:
                return null;
            }
        }
        Console.WriteLine(Parse(" YES ") == true ? "true" : "false");
        Console.WriteLine(Parse("maybe")?.ToString() ?? "invalid");
    }
}
```

## Notes

Explicit vocabulary avoids treating any nonempty string as true.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
