---
id: "everyday-cobol-bounded-integer"
language: "cobol"
title: "Validate a numeric range"
description: "Validate a numeric range."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "cobol"]
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
01 input-value pic x(3) value "042".
01 parsed-value pic 9(3).
procedure division.
if input-value is numeric
 move input-value to parsed-value
 if parsed-value <= 100
  display parsed-value
 else
  display "out of range"
 end-if
else
 display "invalid"
end-if
stop run.
```

## Notes

Accepts exactly three unsigned display digits and inclusive 0–100; rejects signs and spaces. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
