---
id: "everyday-cobol-checksum"
language: "cobol"
title: "Calculate a simple record control total"
description: "Calculate a simple record control total."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["checksum", "everyday", "cobol"]
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
01 values-table.
 02 amount-cents pic 9(5) occurs 3 times.
01 control-total pic 9(7) value 0.
01 idx binary-long.
procedure division.
move 1234 to amount-cents(1)
move 500 to amount-cents(2)
move 66 to amount-cents(3)
perform varying idx from 1 by 1 until idx > 3
 add amount-cents(idx) to control-total
  on size error display "overflow" stop run
 end-add
end-perform
display control-total
stop run.
```

## Notes

Integer minor-unit control total, not a cryptographic checksum. Error branch prints but does not guarantee a nonzero exit code. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
