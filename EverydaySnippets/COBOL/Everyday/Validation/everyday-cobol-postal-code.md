---
id: "everyday-cobol-postal-code"
language: "cobol"
title: "Validate a five-digit postal field"
description: "Validate a five-digit postal field."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["postal-code", "everyday", "cobol"]
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
01 postal-code pic x(5) value "01234".
procedure division.
if postal-code is numeric
 display "valid"
else
 display "invalid"
end-if
stop run.
```

## Notes

Checks the five-digit shape only, not whether a postal code exists. Leading zeroes are preserved. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
