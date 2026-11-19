---
id: py-write-text
title: Write a text file
description: Create or replace a UTF-8 text file.
language: python
category: Files & I/O
subcategory: Writing
tags:
  - file
  - write
  - pathlib
pythonVersion: "3.5"
imports:
  - from pathlib import Path
---

```python
Path("output.txt").write_text("Hello, Python!", encoding="utf-8")
```

## Notes

Replaces any existing content. Parent directories must already exist. Raises OSError on failure.
