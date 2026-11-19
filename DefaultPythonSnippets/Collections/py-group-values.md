---
id: py-group-values
title: Group values by a key
description: Group names by their first character.
language: python
category: Collections
subcategory: Dictionaries
tags:
  - group
  - dictionary
  - defaultdict
pythonVersion: "3.0"
imports:
  - from collections import defaultdict
---

```python
names = ["Ada", "Alan", "Linus", ""]
groups = defaultdict(list)
for name in names:
    if name:
        groups[name[0]].append(name)
```

## Notes

Reading a missing key on a defaultdict inserts a default value. Empty strings are skipped.
