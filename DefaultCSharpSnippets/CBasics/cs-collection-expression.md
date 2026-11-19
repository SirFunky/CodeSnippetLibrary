---
id: cs-collection-expression
title: Create an array with a collection expression
description: Use C# 12 collection expressions to initialize an array.
language: csharp
category: C# Basics
subcategory: Collections
tags:
  - array
  - collection-expression
  - csharp12
csharpVersion: "12.0"
dotnetVersion: "8.0"
---

```csharp
int[] numbers = [1, 2, 3];
```

## Notes

Requires C# 12 and a target type such as int[]. Collection expressions do not have a standalone natural type, so var numbers = [1, 2, 3] is invalid.
