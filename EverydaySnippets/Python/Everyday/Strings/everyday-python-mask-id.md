---
id: "everyday-python-mask-id"
language: "python"
title: "Mask all but the last four characters"
description: "Mask all but the last four characters."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def mask(text):
    return "*" * max(0, len(text) - 4) + text[-4:]

print(mask("ABC123456"))
print(mask("123"))
```

## Notes

Counts Unicode code points, not grapheme clusters. Display masking is not encryption or deletion of the original value.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
