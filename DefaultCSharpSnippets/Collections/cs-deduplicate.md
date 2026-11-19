---
id: cs-deduplicate
title: Remove duplicate list values
description: Remove duplicate names with an explicit comparer.
language: csharp
category: Collections
subcategory: Lists
tags:
  - list
  - distinct
  - linq
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System
  - System.Linq
---

```csharp
var names = new[] { "Ada", "Linus", "Ada" };
var unique = names.Distinct(StringComparer.Ordinal).ToList();
```

## Notes

Uses case-sensitive ordinal comparison. Distinct is deferred until ToList materializes the result; its documented result is unordered.
