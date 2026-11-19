---
id: py-deduplicate
title: Remove duplicate list values
description: Remove duplicates while preserving encounter order.
language: python
category: Collections
subcategory: Lists
tags:
  - list
  - deduplicate
  - dict
pythonVersion: "3.7"
---

```python
names = ["Ada", "Linus", "Ada"]
unique = list(dict.fromkeys(names))
```

## Notes

Values must be hashable. Dictionary insertion order is a language guarantee from Python 3.7.
