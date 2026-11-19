---
id: "cobol-trim-text"
language: "cobol"
title: "Trim padded text in free source format"
description: "Trim padded text in free source format."
category: "Strings"
tags: ["trim-text", "cobol"]
cobolVersion: 2002
cobolFormat: "free"
---

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. EX-TRIM-TEXT.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-TEXT PIC X(12) VALUE "  Ada  ".
PROCEDURE DIVISION.
    DISPLAY FUNCTION TRIM(WS-TEXT)
    STOP RUN.
```

## Notes

Uses COBOL 2002 free source format and FUNCTION TRIM. The field remains fixed width; the function result removes surrounding spaces. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
