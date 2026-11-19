---
id: "everyday-csharp-slug"
language: "csharp"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "csharp"]
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
        Console.WriteLine(Regex.Replace(
            Regex.Replace("  Ada Lovelace! ".ToLowerInvariant(), "[^a-z0-9]+", "-"),
            "^-+|-+$", ""));
    }
}
```

## Notes

ASCII letters and digits only; not transliteration and not a uniqueness guarantee.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
