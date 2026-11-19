---
id: "everyday-csharp-hex-decode"
language: "csharp"
title: "Validate and decode hexadecimal"
description: "Validate and decode hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "csharp"]
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
        foreach (var text in new[] { "000fff", "0x" }) {
            try {
                Console.WriteLine(string.Join(",", Convert.FromHexString(text)));
            } catch (FormatException) {
                Console.WriteLine("invalid");
            }
        }
    }
}
```

## Notes

Convert.FromHexString rejects odd lengths and non-hexadecimal characters.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
