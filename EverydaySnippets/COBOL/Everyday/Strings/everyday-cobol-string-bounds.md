---
id: "everyday-cobol-string-bounds"
language: "cobol"
title: "Detect concatenation destination overflow"
description: "Detect concatenation destination overflow."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["string-bounds", "everyday", "cobol"]
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
01 output-text pic x(5) value spaces.
01 write-position binary-long value 1.
procedure division.
string "Ada" "Linus"
 into output-text with pointer write-position
 on overflow display "overflow"
 not on overflow display output-text
end-string
stop run.
```

## Notes

STRING detects insufficient destination capacity. Destination may be partially changed; discard it after overflow. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
