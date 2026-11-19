---
id: "everyday-cobol-age-band"
language: "cobol"
title: "Classify a bounded age into bands"
description: "Classify a bounded age into bands."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["age-band", "everyday", "cobol"]
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
01 age-years pic 9(3) value 42.
procedure division.
evaluate true
 when age-years > 130 display "invalid"
 when age-years < 18 display "minor"
 when age-years < 65 display "adult"
 when other display "senior"
end-evaluate
stop run.
```

## Notes

Illustrative business thresholds, not a legal definition of age categories. Numeric input validation happens before this field. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
