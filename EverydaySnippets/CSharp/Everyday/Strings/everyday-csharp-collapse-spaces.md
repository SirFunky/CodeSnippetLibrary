---
id: "everyday-csharp-collapse-spaces"
language: "csharp"
title: "Collapse runs of whitespace"
description: "Collapse runs of whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "csharp"]
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
        Console.WriteLine(Regex.Replace(" Ada\t  Linus\nGrace ".Trim(), @"\s+", " "));
    }
}
```

## Notes

Do not normalize whitespace in code or data where it is significant.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
