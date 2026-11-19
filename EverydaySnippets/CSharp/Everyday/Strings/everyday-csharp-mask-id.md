---
id: "everyday-csharp-mask-id"
language: "csharp"
title: "Mask an identifier for display"
description: "Mask an identifier for display."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "csharp"]
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
        string Mask(string s) =>
            s.Length <= 4 ? s : new string('*', s.Length - 4) + s.Substring(s.Length - 4);
        Console.WriteLine(Mask("ABC123456"));
        Console.WriteLine(Mask("123"));
    }
}
```

## Notes

Counts UTF-16 code units. Presentation masking is not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
