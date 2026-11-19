---
id: "extra-cobol-weighted-average"
language: "cobol"
title: "Calculate a quantity-weighted unit price"
description: "Calculate a quantity-weighted unit price."
category: "Numbers"
subcategory: "Practical extras"
tags: ["weighted-average", "practical", "cobol"]
cobolVersion: 2002
cobolFormat: "free"
imports: []
---

```cobol
identification division.
program-id. demo.
data division.
working-storage section.
01 first-quantity pic 9(3) value 2.
01 second-quantity pic 9(3) value 3.
01 first-price pic 9(4)v99 value 10.
01 second-price pic 9(4)v99 value 20.
01 average-price pic 9(4)v99.
01 shown-price pic 9999.99.
procedure division.
compute average-price rounded =
 (first-quantity * first-price + second-quantity * second-price)
 / (first-quantity + second-quantity)
 on size error display "invalid"
 not on size error
  move average-price to shown-price
  display shown-price
end-compute
stop run.
```

## Notes

Weighted by quantity, not an unweighted average of prices. Zero total quantity and result overflow take ON SIZE ERROR. Rounding policy and PIC capacity must match the business domain; error branch has no portable nonzero exit guarantee. COBOL 2002 free format, tested with GnuCOBOL.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
