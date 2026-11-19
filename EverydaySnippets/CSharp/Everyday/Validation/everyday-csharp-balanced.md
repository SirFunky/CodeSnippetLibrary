---
id: "everyday-csharp-balanced"
language: "csharp"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "csharp"]
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
        bool Balanced(string text) {
            var stack = new Stack<char>();
            string open = "([{", close = ")]}";
            foreach (char c in text) {
                if (open.Contains(c))
                    stack.Push(c);
                else {
                    int i = close.IndexOf(c);
                    if (i >= 0 && (stack.Count == 0 || stack.Pop() != open[i]))
                        return false;
                }
            }
            return stack.Count == 0;
        }
        Console.WriteLine(Balanced("{a:[(b)]}") ? "true" : "false");
        Console.WriteLine(Balanced("([)]") ? "true" : "false");
    }
}
```

## Notes

Ignores other characters; does not parse quoted strings or comments.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
