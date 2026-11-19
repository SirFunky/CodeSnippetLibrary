---
id: "everyday-csharp-duration"
language: "csharp"
title: "Format elapsed seconds"
description: "Format elapsed seconds."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "csharp"]
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
        long seconds = 3661;
        Console.WriteLine($"{seconds/3600:D2}:{seconds%3600/60:D2}:{seconds%60:D2}");
    }
}
```

## Notes

Nonnegative whole seconds are a precondition. Hours can exceed 23; this is a duration, not a timestamp.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
