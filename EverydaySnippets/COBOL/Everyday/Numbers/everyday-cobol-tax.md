---
id: "everyday-cobol-tax"
language: "cobol"
title: "Calculate tax with decimal rounding"
description: "Calculate tax with decimal rounding."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["tax", "everyday", "cobol"]
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
01 net-amount pic 9(5)v99 value 12.35.
01 tax-rate pic 9v999 value 0.25.
01 tax pic 9(5)v99.
01 shown pic 99999.99.
procedure division.
compute tax rounded = net-amount * tax-rate
 on size error display "overflow"
 not on size error
  move tax to shown
  display shown
end-compute
stop run.
```

## Notes

Uses COBOL ROUNDED at two decimal places. Confirm legally required rounding and line/invoice policy separately. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
