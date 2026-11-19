---
id: "extra-python-top-counts"
language: "python"
title: "Count values and sort frequency ties explicitly"
description: "Count values and sort frequency ties explicitly."
category: "Collections"
subcategory: "Practical extras"
tags: ["top-counts", "practical", "python"]
pythonVersion: "3.9"
imports: []
---

```python
from collections import Counter
counts = Counter(["pear", "apple", "pear", "apple", "plum"])
ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
for name, count in ranked[:3]:
    print(f"{name}:{count}")
```

## Notes

Orders by descending frequency, then lexically ascending text for ties. Unlike an implicit tie policy, this stays deterministic when input order changes.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
