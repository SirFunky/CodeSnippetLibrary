---
id: py-merge-dicts
title: Merge two dictionaries
description: Combine dictionaries with the union operator.
language: python
category: Collections
subcategory: Dictionaries
tags:
  - dictionary
  - merge
pythonVersion: "3.9"
---

```python
defaults = {"theme": "dark", "font_size": 13}
overrides = {"font_size": 16}
settings = defaults | overrides
```

## Notes

Requires Python 3.9. Values from the right-hand dictionary win. Nested dictionaries are not merged recursively.
