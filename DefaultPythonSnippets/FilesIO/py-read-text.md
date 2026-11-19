---
id: py-read-text
title: Read a text file
description: Read a UTF-8 file into a string.
language: python
category: Files & I/O
subcategory: Reading
tags:
  - file
  - read
  - pathlib
pythonVersion: "3.5"
imports:
  - from pathlib import Path
---

```python
content = Path("example.txt").read_text(encoding="utf-8")
```

## Notes

Raises OSError if the file cannot be read and UnicodeDecodeError for invalid UTF-8. Loads the entire file into memory.
