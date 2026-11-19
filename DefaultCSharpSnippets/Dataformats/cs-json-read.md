---
id: cs-json-read
title: Parse JSON with System.Text.Json
description: Read a field from a JSON document.
language: csharp
category: Data formats
subcategory: JSON
tags:
  - json
  - parse
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports:
  - System.Text.Json
---

```csharp
using var document = JsonDocument.Parse("{\"name\":\"Ada\"}");
var name = document.RootElement.GetProperty("name").GetString();
```

## Notes

The using declaration requires C# 8.0 and disposes the document at the end of the scope. Invalid JSON or missing properties cause exceptions. System.Text.Json is included in the declared .NET target; no NuGet package is needed.
