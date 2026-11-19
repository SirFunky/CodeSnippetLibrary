---
id: "everyday-cobol-blank-default"
language: "cobol"
title: "Supply a default for a blank field"
description: "Supply a default for a blank field."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["blank-default", "everyday", "cobol"]
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
01 input-name pic x(20) value spaces.
01 output-name pic x(20).
procedure division.
if input-name = spaces
 move "Unknown" to output-name
else
 move input-name to output-name
end-if
display function trim(output-name)
stop run.
```

## Notes

Uses all-space detection for a fixed-width display field; not Unicode whitespace normalization. Free source format, COBOL 2002; tested with GnuCOBOL. Display PIC widths are intentional.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
