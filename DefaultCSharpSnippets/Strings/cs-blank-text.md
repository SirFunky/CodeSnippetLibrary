---
id: cs-blank-text
title: Check for blank text
description: Check for null, empty or whitespace-only text.
language: csharp
category: Strings
subcategory: Validation
tags:
  - string
  - blank
  - validation
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System
---

```csharp
var text = "  ";
var blank = string.IsNullOrWhiteSpace(text);
```

## Notes

Does not modify the source string. Uses the Unicode whitespace rules of the .NET runtime.
