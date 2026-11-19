---
id: "everyday-cobol-linear-search"
language: "cobol"
title: "Find the first matching table entry"
description: "Find the first matching table entry."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["linear-search", "everyday", "cobol"]
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
01 idx binary-long.
01 found-index pic 9(3) value 0.
procedure division.
move 10 to item-value(1)
move 25 to item-value(2)
move 25 to item-value(3)
move 5 to item-value(4)
perform varying idx from 1 by 1 until idx > 4
 if item-value(idx) = 25
  move idx to found-index
  exit perform
 end-if
end-perform
display found-index
stop run.
```

## Notes

One-based index; zero indicates no match. First matching entry wins. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
