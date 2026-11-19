---
id: "everyday-cobol-left-pad"
language: "cobol"
title: "Pad a numeric identifier with zeroes"
description: "Pad a numeric identifier with zeroes."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["left-pad", "everyday", "cobol"]
cobolVersion: 2002
cobolFormat: "free"
imports: []
---

```cobol
identification division.
program-id. demo.
environment division.
configuration section.
repository.
 function all intrinsic.
data division.
working-storage section.
01 input-id pic 9(4) value 42.
procedure division.
display input-id
stop run.
```

## Notes

PIC 9 supplies fixed-width leading zeroes. Validate untrusted input before moving into a numeric item. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
