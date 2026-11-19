---
id: py-filter-map
title: Filter and transform a list
description: Use a list comprehension to filter and uppercase names.
language: python
category: Collections
subcategory: Lists
tags:
  - list
  - filter
  - comprehension
pythonVersion: "3.0"
---

```python
names = ["Ada", "", "Linus"]
uppercase = [name.upper() for name in names if name]
```

## Notes

This example expects strings. A comprehension creates a new list; use a generator expression for lazy processing.
