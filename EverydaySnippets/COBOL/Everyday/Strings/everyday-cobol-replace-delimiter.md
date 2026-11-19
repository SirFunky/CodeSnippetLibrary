---
id: "everyday-cobol-replace-delimiter"
language: "cobol"
title: "Replace a field delimiter"
description: "Replace a field delimiter."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["replace-delimiter", "everyday", "cobol"]
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
01 input-text pic x(11) value "Ada|Linus|G".
procedure division.
inspect input-text replacing all "|" by ","
display input-text
stop run.
```

## Notes

One-character replacement only; this does not escape CSV or parse quoted fields. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
