---
id: "cobol-decimal"
language: "cobol"
title: "Round a fixed-point decimal"
description: "Round a fixed-point decimal."
category: "Numbers"
tags: ["decimal", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-DECIMAL.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-AMOUNT PIC 9(3)V99.
       01 WS-DISPLAY PIC 999.99.
       PROCEDURE DIVISION.
           COMPUTE WS-AMOUNT ROUNDED = 12.345
               ON SIZE ERROR
                   DISPLAY "Operation failed"
                   STOP RUN
           END-COMPUTE
           MOVE WS-AMOUNT TO WS-DISPLAY
           DISPLAY "Amount=" WS-DISPLAY
           STOP RUN.
```

## Notes

V is an implied decimal point in storage. Moving the rounded result to an explicitly edited PIC 999.99 field produces the literal decimal separator for display. The result represents 12.35. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).

Error branches display a message and stop. These COBOL 1985 programs do not guarantee a nonzero process exit status; use a documented vendor/standard facility when callers require one.
