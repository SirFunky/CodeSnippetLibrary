---
id: py-list-files
title: Find files recursively
description: Find matching files in a directory tree.
language: python
category: Files & I/O
subcategory: Directories
tags:
  - directory
  - glob
  - pathlib
pythonVersion: "3.4"
imports:
  - from pathlib import Path
---

```python
for path in Path(".").rglob("*.py"):
    if path.is_file():
        print(path)
```

## Notes

Traversal order is unspecified. Hidden files may be included. Avoid using this directly on very large trees on a UI thread.
