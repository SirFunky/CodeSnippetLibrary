---
id: "everyday-cobol-invoice-total"
language: "cobol"
title: "Calculate an invoice line total"
description: "Calculate an invoice line total."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["invoice-total", "everyday", "cobol"]
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
01 quantity pic 9(3) value 3.
01 unit-price pic 9(4)v99 value 12.50.
01 line-total pic 9(6)v99.
01 shown pic 999999.99.
procedure division.
multiply quantity by unit-price giving line-total rounded
 on size error display "overflow"
 not on size error
  move line-total to shown
  display shown
end-multiply
stop run.
```

## Notes

Choose PIC capacities for real quantities/prices. Rounding occurs at the line-total destination. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
