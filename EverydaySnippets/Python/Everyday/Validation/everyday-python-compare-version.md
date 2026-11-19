---
id: "everyday-python-compare-version"
language: "python"
title: "Compare numeric dotted versions"
description: "Compare numeric dotted versions."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["compare-version", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import re
from itertools import zip_longest

def compare_version(left, right):
    def parse(text):
        if len(text) > 200 or re.fullmatch(r"[0-9]+(?:\.[0-9]+)*", text) is None:
            raise ValueError("numeric dotted version required")
        return list(map(int, text.split(".")))
    for a, b in zip_longest(parse(left), parse(right), fillvalue=0):
        if a != b:
            return -1 if a < b else 1
    return 0

print(compare_version("1.9", "1.10"))
print(compare_version("2.0", "2"))
```

## Notes

Numeric components only; missing trailing components are zero. Not SemVer: prerelease/build labels are rejected. Input length is capped.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
