---
id: py-json-write
title: Serialize JSON
description: Serialize Python values as readable JSON.
language: python
category: Data formats
subcategory: JSON
tags:
  - json
  - serialize
pythonVersion: "3.0"
imports:
  - import json
---

```python
data = {"name": "Ada", "active": True}
text = json.dumps(data, indent=2, ensure_ascii=False)
```

## Notes

The returned string is Unicode. When writing it to a file, explicitly choose UTF-8. Unsupported object types raise TypeError.
