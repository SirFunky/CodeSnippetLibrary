---
id: "everyday-csharp-bounded-integer"
language: "csharp"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "csharp"]
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
        foreach (var s in new[] { "42", "42x", "999" }) {
            bool ok = Regex.IsMatch(s, @"\A[+-]?[0-9]+\z") &&
                      int.TryParse(s, NumberStyles.AllowLeadingSign,
                                   CultureInfo.InvariantCulture, out _);
            int n;
            Console.WriteLine(ok && int.TryParse(s, out n) && n >= 0 && n <= 100
                                  ? n.ToString(CultureInfo.InvariantCulture)
                                  : "invalid");
        }
    }
}
```

## Notes

Rejects whitespace, partial parses, overflow and values outside inclusive 0–100.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
