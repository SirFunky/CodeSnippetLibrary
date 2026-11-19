---
id: cs-join-strings
title: Join strings with a delimiter
description: Combine names into one comma-separated string.
language: csharp
category: Strings
subcategory: Formatting
tags:
  - string
  - join
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System
---

```csharp
var names = new[] { "Ada", "Linus" };
var joined = string.Join(", ", names);
```

## Notes

Null elements are treated as empty strings. This is display formatting, not CSV escaping.
