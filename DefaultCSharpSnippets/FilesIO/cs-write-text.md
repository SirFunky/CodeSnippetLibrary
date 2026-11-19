---
id: cs-write-text
title: Write a text file asynchronously
description: Create or replace a UTF-8 text file asynchronously.
language: csharp
category: Files & I/O
subcategory: Writing
tags:
  - file
  - write
  - async
csharpVersion: "5.0"
dotnetVersion: "8.0"
imports:
  - System.IO
  - System.Text
---

```csharp
await File.WriteAllTextAsync(
    "output.txt", "Hello, C#!", Encoding.UTF8);
```

## Notes

Place this inside an async method. Replaces existing content; parent directories must exist. Handle I/O and access exceptions.
