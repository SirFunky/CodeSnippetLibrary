---
id: "cobol-arithmetic"
language: "cobol"
title: "Add values with overflow handling"
description: "Add values with overflow handling."
category: "Numbers"
tags: ["arithmetic", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-ARITHMETIC.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-TOTAL PIC 9(4) VALUE 40.
       PROCEDURE DIVISION.
           ADD 2 TO WS-TOTAL
               ON SIZE ERROR
                   DISPLAY "Operation failed"
                   STOP RUN
           END-ADD
           DISPLAY "Total=" WS-TOTAL
           STOP RUN.
```

## Notes

The receiving field has four decimal digits. ON SIZE ERROR handles values outside that representation. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).

Error branches display a message and stop. These COBOL 1985 programs do not guarantee a nonzero process exit status; use a documented vendor/standard facility when callers require one.
