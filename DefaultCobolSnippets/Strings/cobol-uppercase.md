---
id: "cobol-uppercase"
language: "cobol"
title: "Convert text to uppercase in free format"
description: "Convert text to uppercase in free format."
category: "Strings"
tags: ["uppercase", "cobol"]
cobolVersion: 2002
cobolFormat: "free"
---

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. EX-UPPERCASE.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-TEXT PIC X(3) VALUE "Ada".
PROCEDURE DIVISION.
    DISPLAY FUNCTION UPPER-CASE(WS-TEXT)
    STOP RUN.
```

## Notes

Uses free source format with a COBOL 2002 baseline. Character conversion follows the implementation character set; this is not a Unicode case-folding routine. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
