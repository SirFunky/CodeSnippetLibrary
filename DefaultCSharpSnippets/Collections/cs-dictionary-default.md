---
id: cs-dictionary-default
title: Read a dictionary value with a default
description: Use TryGetValue to provide a fallback for a missing key.
language: csharp
category: Collections
subcategory: Dictionaries
tags:
  - dictionary
  - default
  - trygetvalue
csharpVersion: "7.0"
dotnetVersion: "8.0"
imports:
  - System.Collections.Generic
---

```csharp
var settings = new Dictionary<string, string>();
var theme = settings.TryGetValue("theme", out string stored)
    ? stored
    : "dark";
```

## Notes

An existing key with a null value returns null rather than the fallback. The inline out variable requires C# 7.0.
