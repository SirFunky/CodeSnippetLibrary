---
id: "everyday-python-slug"
language: "python"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import re

def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

print(slug("  Ada Lovelace! "))
```

## Notes

ASCII-only display/routing slug; non-ASCII letters are removed, not transliterated. Handle uniqueness separately.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
