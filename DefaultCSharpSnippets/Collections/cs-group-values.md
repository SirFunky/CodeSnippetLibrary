---
id: cs-group-values
title: Group names by first character
description: Build a dictionary of names grouped by initial.
language: csharp
category: Collections
subcategory: Dictionaries
tags:
  - dictionary
  - group
  - linq
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System
  - System.Linq
---

```csharp
var names = new[] { "Ada", "Alan", "Linus", "" };
var groups = names
    .Where(name => !string.IsNullOrEmpty(name))
    .GroupBy(name => name[0])
    .ToDictionary(group => group.Key, group => group.ToList());
```

## Notes

The key is the first UTF-16 code unit, not necessarily a complete Unicode character. Empty and null names are skipped.
