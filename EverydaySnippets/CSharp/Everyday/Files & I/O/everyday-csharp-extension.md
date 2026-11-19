---
id: "everyday-csharp-extension"
language: "csharp"
title: "Extract a lexical filename extension"
description: "Extract a lexical filename extension."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "csharp"]
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
        string Ext(string path) {
            string name = path.Replace('\\', '/').Split('/').Last();
            int dot = name.LastIndexOf('.');
            return dot > 0 && dot < name.Length - 1
                       ? name.Substring(dot + 1).ToLowerInvariant()
                       : "";
        }
        Console.WriteLine(Ext(@"C:eports\data.CSV"));
        Console.WriteLine(Ext(".env").Length);
    }
}
```

## Notes

Handles slash/backslash lexically; a dotfile has no extension. Does not validate file contents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
