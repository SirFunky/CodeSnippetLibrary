---
id: "extra-python-html-escape"
language: "python"
title: "Escape text for an HTML text or quoted attribute context"
description: "Escape text for an HTML text or quoted attribute context."
category: "Data formats"
subcategory: "Practical extras"
tags: ["html-escape", "practical", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import html
text = '<label title="Ada & Linus">'
print(html.escape(text, quote=True))
```

## Notes

Escapes text using the standard library. Intended for HTML text or quoted attribute values, not JavaScript, CSS or URL validation. Prefer the template engine escaping policy when generating pages.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
