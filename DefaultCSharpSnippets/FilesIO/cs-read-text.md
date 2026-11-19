---
id: cs-read-text
title: Read a text file asynchronously
description: Read UTF-8 text without blocking the calling thread.
language: csharp
category: Files & I/O
subcategory: Reading
tags:
  - file
  - read
  - async
csharpVersion: "5.0"
dotnetVersion: "8.0"
imports:
  - System.IO
  - System.Text
---

```csharp
var content = await File.ReadAllTextAsync(
    "example.txt", Encoding.UTF8);
```

## Notes

Place this inside an async method returning Task or Task<T>. Loads the entire file into memory. Handle I/O and access exceptions as appropriate.
