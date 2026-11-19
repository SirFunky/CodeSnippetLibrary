---
id: cs-filter-map
title: Filter and transform a list
description: Keep nonblank names and convert them to uppercase.
language: csharp
category: Collections
subcategory: LINQ
tags:
  - linq
  - filter
  - map
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System
  - System.Linq
---

```csharp
var names = new[] { "Ada", "", "Linus" };
var uppercase = names
    .Where(name => !string.IsNullOrWhiteSpace(name))
    .Select(name => name.ToUpperInvariant())
    .ToList();
```

## Notes

Invariant casing avoids the current culture. ToList creates a new list; the source is unchanged.
