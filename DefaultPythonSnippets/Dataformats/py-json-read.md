---
id: py-json-read
title: Parse JSON text
description: Parse a JSON document into Python values.
language: python
category: Data formats
subcategory: JSON
tags:
  - json
  - parse
pythonVersion: "3.0"
imports:
  - import json
---

```python
data = json.loads('{"name": "Ada", "active": true}')
name = data["name"]
```

## Notes

Raises json.JSONDecodeError for invalid JSON and KeyError if name is absent. Uses the standard library; no third-party package is required.
