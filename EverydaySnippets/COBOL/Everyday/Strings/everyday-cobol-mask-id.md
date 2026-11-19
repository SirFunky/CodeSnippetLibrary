---
id: "everyday-cobol-mask-id"
language: "cobol"
title: "Mask an account identifier"
description: "Mask an account identifier."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "cobol"]
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
01 account-id pic x(9) value "ABC123456".
01 masked-id pic x(9).
procedure division.
move account-id to masked-id
move all "*" to masked-id(1:5)
display masked-id
stop run.
```

## Notes

Fixed 9-character account identifier; masks the first five positions. Display masking is not encryption. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
