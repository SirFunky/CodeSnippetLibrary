---
id: "everyday-cobol-duration"
language: "cobol"
title: "Split elapsed seconds into hours minutes seconds"
description: "Split elapsed seconds into hours minutes seconds."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "cobol"]
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
01 elapsed-seconds pic 9(8) value 3661.
01 hours-part pic 9(5).
01 minutes-part pic 99.
01 seconds-part pic 99.
01 remaining-seconds pic 9(4).
procedure division.
divide elapsed-seconds by 3600 giving hours-part
 remainder remaining-seconds
end-divide
divide remaining-seconds by 60 giving minutes-part
 remainder seconds-part
end-divide
display hours-part ":" minutes-part ":" seconds-part
stop run.
```

## Notes

Nonnegative whole elapsed seconds; hours may exceed 23. No timezone or clock-date meaning. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
