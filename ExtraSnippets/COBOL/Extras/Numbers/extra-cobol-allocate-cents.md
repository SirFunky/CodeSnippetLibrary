---
id: "extra-cobol-allocate-cents"
language: "cobol"
title: "Divide integer cents and keep the remainder"
description: "Divide integer cents and keep the remainder."
category: "Numbers"
subcategory: "Practical extras"
tags: ["allocate-cents", "practical", "cobol"]
cobolVersion: 2002
cobolFormat: "free"
imports: []
---

```cobol
identification division.
program-id. demo.
data division.
working-storage section.
01 total-cents pic 9(5) value 1000.
01 recipients pic 9(3) value 3.
01 share-cents pic 9(5).
01 leftover-cents pic 9(5).
procedure division.
divide total-cents by recipients giving share-cents
 remainder leftover-cents
 on size error display "invalid"
 not on size error
  display share-cents "," leftover-cents
end-divide
stop run.
```

## Notes

Integer division preserves an explicit remainder instead of losing cents. Caller must choose which recipients receive leftover cents. ON SIZE ERROR handles zero divisors/overflow; error branch does not promise a nonzero exit status. COBOL 2002 free format, tested with GnuCOBOL.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
