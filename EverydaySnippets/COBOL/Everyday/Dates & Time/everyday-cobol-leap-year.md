---
id: "everyday-cobol-leap-year"
language: "cobol"
title: "Check Gregorian leap-year rules"
description: "Check Gregorian leap-year rules."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["leap-year", "everyday", "cobol"]
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
01 year-number pic 9(4) value 2024.
procedure division.
if function mod(year-number, 400) = 0 or
 (function mod(year-number, 4) = 0 and
 function mod(year-number, 100) not = 0)
 display "leap"
else
 display "common"
end-if
stop run.
```

## Notes

Gregorian rule; does not by itself validate a complete date. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
