---
id: "everyday-cobol-pagination"
language: "cobol"
title: "Calculate page offsets with a final partial page"
description: "Calculate page offsets with a final partial page."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "cobol"]
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
01 total-items pic 9(5) value 23.
01 page-number pic 9(3) value 3.
01 page-size pic 9(3) value 10.
01 first-offset pic 9(6).
01 end-offset pic 9(6).
procedure division.
if page-number = 0 or page-size = 0
 display "invalid"
else
 compute first-offset = (page-number - 1) * page-size
 compute end-offset = first-offset + page-size
 if first-offset > total-items
  move total-items to first-offset
 end-if
 if end-offset > total-items
  move total-items to end-offset
 end-if
 display first-offset "," end-offset
end-if
stop run.
```

## Notes

One-based pages, zero-based end-exclusive offsets. PIC capacities cover the maximum product of input fields. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
