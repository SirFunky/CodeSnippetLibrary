---
id: py-regex-numbers
title: Extract numbers with a regular expression
description: Find all ASCII digit sequences in text.
language: python
category: Strings
subcategory: Regular expressions
tags:
  - regex
  - parsing
pythonVersion: "3.0"
imports:
  - import re
---

```python
text = "Order 123 contains 45 items"
numbers = re.findall(r"[0-9]+", text)
```

## Notes

Returns strings, not integers. Use [0-9] for ASCII digits; \d also matches Unicode decimal digits by default.
