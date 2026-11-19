---
id: "cobol-validate-number"
language: "cobol"
title: "Validate a text field with a numeric class test"
description: "Validate a text field with a numeric class test."
category: "Validation"
tags: ["validate-number", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-VALIDATE-NUMBER.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-TEXT PIC X(3) VALUE "42x".
       PROCEDURE DIVISION.
           IF WS-TEXT IS NUMERIC
               DISPLAY "Numeric"
           ELSE
               DISPLAY "Invalid"
           END-IF
           STOP RUN.
```

## Notes

A numeric class test is not a general locale-aware decimal parser. Define whitespace, signs, precision and field-size rules separately. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
