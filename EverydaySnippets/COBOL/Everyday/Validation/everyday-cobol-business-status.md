---
id: "everyday-cobol-business-status"
language: "cobol"
title: "Map a status code to a business label"
description: "Map a status code to a business label."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["business-status", "everyday", "cobol"]
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
01 status-code pic x value "P".
01 status-label pic x(12).
procedure division.
evaluate status-code
 when "P" move "Pending" to status-label
 when "A" move "Approved" to status-label
 when "R" move "Rejected" to status-label
 when other move "Unknown" to status-label
end-evaluate
display function trim(status-label)
stop run.
```

## Notes

Explicit fallback preserves visibility of unknown codes instead of silently treating them as approved. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
