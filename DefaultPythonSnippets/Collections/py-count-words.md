---
id: py-count-words
title: Count occurrences
description: Count how often each value appears.
language: python
category: Collections
subcategory: Dictionaries
tags:
  - counter
  - count
  - dictionary
pythonVersion: "3.1"
imports:
  - from collections import Counter
---

```python
words = ["one", "two", "one"]
counts = Counter(words)
print(counts.most_common(1))
```

## Notes

Counter elements must be hashable. Missing keys have a count of zero.
