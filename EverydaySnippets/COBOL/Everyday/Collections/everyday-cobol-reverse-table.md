---
id: "everyday-cobol-reverse-table"
language: "cobol"
title: "Reverse a bounded table"
description: "Reverse a bounded table."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["reverse-table", "everyday", "cobol"]
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
01 values-table.
 02 item-value pic 9 occurs 4 times.
01 idx binary-long.
01 other-idx binary-long.
01 temp-value pic 9.
procedure division.
move 1 to item-value(1)
move 2 to item-value(2)
move 3 to item-value(3)
move 4 to item-value(4)
perform varying idx from 1 by 1 until idx > 2
 compute other-idx = 5 - idx
 move item-value(idx) to temp-value
 move item-value(other-idx) to item-value(idx)
 move temp-value to item-value(other-idx)
end-perform
display item-value(1) item-value(2)
 item-value(3) item-value(4)
stop run.
```

## Notes

In-place reversal for four entries. Adjust the midpoint and bounds together when changing capacity. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
