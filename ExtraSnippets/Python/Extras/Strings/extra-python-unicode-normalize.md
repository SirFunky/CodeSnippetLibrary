---
id: "extra-python-unicode-normalize"
language: "python"
title: "Normalize equivalent Unicode spellings"
description: "Normalize equivalent Unicode spellings."
category: "Strings"
subcategory: "Practical extras"
tags: ["unicode-normalize", "practical", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import unicodedata
composed = "Caf\u00e9"
decomposed = "Cafe\u0301"
print(composed == decomposed)
print(unicodedata.normalize("NFC", composed) == unicodedata.normalize("NFC", decomposed))
```

## Notes

NFC unifies canonical equivalents; it does not remove accents, case-fold or solve visual confusables. Preserve original text if exact original bytes matter.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
