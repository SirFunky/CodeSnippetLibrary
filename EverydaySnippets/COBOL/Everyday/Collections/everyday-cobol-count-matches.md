---
id: "everyday-cobol-count-matches"
language: "cobol"
title: "Count table values above a threshold"
description: "Count table values above a threshold."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["count-matches", "everyday", "cobol"]
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
 02 item-value pic 9(3) occurs 4 times.
01 matches pic 9(3) value 0.
01 idx binary-long.
procedure division.
move 10 to item-value(1)
move 25 to item-value(2)
move 30 to item-value(3)
move 5 to item-value(4)
perform varying idx from 1 by 1 until idx > 4
 if item-value(idx) > 20 add 1 to matches end-if
end-perform
display matches
stop run.
```

## Notes

Fixed table bounds and sufficient counter capacity. Threshold comparison is strictly greater than. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
