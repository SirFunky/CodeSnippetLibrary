---
id: "everyday-cobol-prefix"
language: "cobol"
title: "Check a fixed-field prefix"
description: "Check a fixed-field prefix."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["prefix", "everyday", "cobol"]
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
01 product-code pic x(8) value "INV-0042".
procedure division.
if product-code(1:4) = "INV-"
 display "invoice"
else
 display "other"
end-if
stop run.
```

## Notes

Reference modification uses known field bounds. Compare the exact prefix required by the business format. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
