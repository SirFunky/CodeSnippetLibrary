---
id: "everyday-cobol-discount"
language: "cobol"
title: "Apply a percentage discount"
description: "Apply a percentage discount."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["discount", "everyday", "cobol"]
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
01 amount pic 9(5)v99 value 100.
01 discount-rate pic 9v99 value 0.15.
01 net-amount pic 9(5)v99.
01 shown pic 99999.99.
procedure division.
compute net-amount rounded = amount * (1 - discount-rate)
 on size error display "overflow"
 not on size error
  move net-amount to shown
  display shown
end-compute
stop run.
```

## Notes

Rate is a fraction constrained here to 0.00–9.99 by PIC; business callers must enforce 0.00–1.00. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
