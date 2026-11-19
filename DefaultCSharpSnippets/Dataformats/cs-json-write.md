---
id: cs-json-write
title: Serialize JSON with System.Text.Json
description: Serialize a small object into a JSON string.
language: csharp
category: Data formats
subcategory: JSON
tags:
  - json
  - serialize
csharpVersion: "3.0"
dotnetVersion: "8.0"
imports:
  - System.Text.Json
---

```csharp
var data = new { name = "Ada", active = true };
var json = JsonSerializer.Serialize(data);
```

## Notes

Anonymous types serialize their public properties. The declared .NET target includes System.Text.Json without a separate package. Configure serializer options for naming or formatting requirements.
