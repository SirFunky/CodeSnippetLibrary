---
id: "everyday-python-bounded-integer"
language: "python"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import re

def bounded(text, low, high):
    if low > high:
        raise ValueError("invalid bounds")
    if len(text) > 100 or re.fullmatch(r"[+-]?[0-9]+", text) is None:
        return None
    value = int(text)
    return value if low <= value <= high else None

print(bounded("42", 0, 100))
print(bounded("42x", 0, 100))
print(bounded("999", 0, 100))
```

## Notes

Rejects whitespace and partial parses. Bounds are inclusive; a 100-character input cap avoids unbounded integer conversion work.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
