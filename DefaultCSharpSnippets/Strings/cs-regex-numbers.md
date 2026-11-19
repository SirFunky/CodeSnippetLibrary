---
id: cs-regex-numbers
title: Extract numbers with a regular expression
description: Find ASCII digit sequences and collect the matches.
language: csharp
category: Strings
subcategory: Regular expressions
tags:
  - regex
  - parsing
  - linq
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System.Linq
  - System.Text.RegularExpressions
---

```csharp
var text = "Order 123 contains 45 items";
var numbers = Regex.Matches(text, @"[0-9]+")
    .Cast<Match>()
    .Select(match => match.Value)
    .ToList();
```

## Notes

Returns strings. [0-9] limits matches to ASCII digits. For untrusted patterns or large input, select an appropriate regex timeout.
