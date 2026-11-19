---
id: "everyday-csharp-hex-encode"
language: "csharp"
title: "Encode bytes as hexadecimal"
description: "Encode bytes as hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-encode", "everyday", "csharp"]
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
        Console.WriteLine(
            Convert.ToHexString(new byte[] { 0, 15, 255 }).ToLowerInvariant());
    }
}
```

## Notes

Hexadecimal is reversible representation, not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
