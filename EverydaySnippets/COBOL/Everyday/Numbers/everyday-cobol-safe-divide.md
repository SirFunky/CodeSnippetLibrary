---
id: "everyday-cobol-safe-divide"
language: "cobol"
title: "Handle a zero divisor"
description: "Handle a zero divisor."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "cobol"]
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
01 numerator pic 9(4) value 10.
01 denominator pic 9(4) value 4.
01 quotient pic 9(3)v99.
01 shown pic 999.99.
procedure division.
divide numerator by denominator giving quotient rounded
 on size error display "invalid"
 not on size error
  move quotient to shown
  display shown
end-divide
move 0 to denominator
divide numerator by denominator giving quotient
 on size error display "invalid"
end-divide
stop run.
```

## Notes

ON SIZE ERROR handles division by zero and result overflow. Decimal destination is rounded to cents. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
