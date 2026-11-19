---
id: "cobol-condition"
language: "cobol"
title: "Use an 88-level condition name"
description: "Use an 88-level condition name."
category: "COBOL Basics"
tags: ["condition", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-CONDITION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-STATE PIC X VALUE "Y".
          88 WS-ENABLED VALUE "Y".
       PROCEDURE DIVISION.
           IF WS-ENABLED
               DISPLAY "Enabled"
           ELSE
               DISPLAY "Disabled"
           END-IF
           STOP RUN.
```

## Notes

An 88-level condition names values of its parent data item; it does not allocate a separate boolean field. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
