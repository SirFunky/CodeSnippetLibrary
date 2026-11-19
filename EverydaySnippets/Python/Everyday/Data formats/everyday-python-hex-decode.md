---
id: "everyday-python-hex-decode"
language: "python"
title: "Validate and decode hexadecimal bytes"
description: "Validate and decode hexadecimal bytes."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import re

def unhex(text):
    if len(text) % 2 or re.fullmatch(r"[0-9a-fA-F]*", text) is None:
        return None
    return bytes.fromhex(text)

print(list(unhex("000fff")))
print(unhex("0x"))
```

## Notes

Rejects whitespace, odd digit counts and non-hex characters instead of partially decoding.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
