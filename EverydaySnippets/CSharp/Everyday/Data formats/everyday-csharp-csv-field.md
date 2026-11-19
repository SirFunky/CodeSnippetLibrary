---
id: "everyday-csharp-csv-field"
language: "csharp"
title: "Escape one CSV field"
description: "Escape one CSV field."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-field", "everyday", "csharp"]
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
        string Field(string s) => s.IndexOfAny(new[] { ',', '"', '\r', '\n' }) < 0
                                      ? s
                                      : "\"" + s.Replace("\"", "\"\"") + "\"";
        Console.WriteLine(Field("Ada, \"A\""));
        Console.WriteLine(Field("plain"));
    }
}
```

## Notes

Escapes a comma-separated field, not a whole document. Spreadsheet formulas need a separate policy.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
