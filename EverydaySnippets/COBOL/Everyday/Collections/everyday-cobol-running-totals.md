---
id: "everyday-cobol-running-totals"
language: "cobol"
title: "Calculate running totals from a table"
description: "Calculate running totals from a table."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "cobol"]
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
 02 item-value pic s9(4) occurs 3 times.
01 total-value pic s9(6) value 0.
01 shown pic +999999.
01 idx binary-long.
procedure division.
move 2 to item-value(1)
move -1 to item-value(2)
move 4 to item-value(3)
perform varying idx from 1 by 1 until idx > 3
 add item-value(idx) to total-value
  on size error display "overflow" stop run
 end-add
 move total-value to shown
 display shown
end-perform
stop run.
```

## Notes

Bounded table and accumulator with ON SIZE ERROR. Error branch prints a message; no portable nonzero exit guarantee. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
