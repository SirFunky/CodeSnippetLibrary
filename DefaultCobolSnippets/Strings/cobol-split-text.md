---
id: "cobol-split-text"
language: "cobol"
title: "Split delimited text with UNSTRING"
description: "Split delimited text with UNSTRING."
category: "Strings"
tags: ["split-text", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-SPLIT-TEXT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FIRST PIC X(5).
       01 WS-LAST PIC X(5).
       PROCEDURE DIVISION.
           UNSTRING "Ada,Linus" DELIMITED BY ","
               INTO WS-FIRST WS-LAST
               ON OVERFLOW
                   DISPLAY "Operation failed"
                   STOP RUN
           END-UNSTRING
           DISPLAY WS-FIRST(1:3) "/" WS-LAST
           STOP RUN.
```

## Notes

Receiving fields are space-padded. Define field sizes and an overflow/truncation policy for external input; do not treat this as a CSV parser. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).

Error branches display a message and stop. These COBOL 1985 programs do not guarantee a nonzero process exit status; use a documented vendor/standard facility when callers require one.
