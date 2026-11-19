---
id: "everyday-cobol-fixed-record"
language: "cobol"
title: "Construct a fixed-width export record"
description: "Construct a fixed-width export record."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["fixed-record", "everyday", "cobol"]
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
01 export-record.
 02 record-id pic 9(4).
 02 record-name pic x(10).
 02 record-amount pic 9(5).
procedure division.
move 42 to record-id
move "Ada" to record-name
move 12345 to record-amount
display "[" export-record "]"
stop run.
```

## Notes

Group item layout is 19 display characters with space-padded name and integer minor-unit amount. Not a binary interchange format. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
