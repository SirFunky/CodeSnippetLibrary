---
id: "everyday-cobol-minimum-maximum"
language: "cobol"
title: "Find minimum and maximum table values"
description: "Find minimum and maximum table values."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["minimum-maximum", "everyday", "cobol"]
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
01 minimum-item pic s9(4).
01 maximum-item pic s9(4).
01 shown-low pic +9999.
01 shown-high pic +9999.
01 idx binary-long.
procedure division.
move 7 to item-value(1)
move -2 to item-value(2)
move 5 to item-value(3)
move item-value(1) to minimum-item maximum-item
perform varying idx from 2 by 1 until idx > 3
 if item-value(idx) < minimum-item
  move item-value(idx) to minimum-item
 end-if
 if item-value(idx) > maximum-item
  move item-value(idx) to maximum-item
 end-if
end-perform
move minimum-item to shown-low
move maximum-item to shown-high
display shown-low "," shown-high
stop run.
```

## Notes

Nonempty table required; initializes both extrema from the first item, including all-negative inputs. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
