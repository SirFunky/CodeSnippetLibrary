---
id: "cobol-count-text"
language: "cobol"
title: "Count character matches with INSPECT"
description: "Count character matches with INSPECT."
category: "Strings"
tags: ["count-text", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-COUNT-TEXT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-TEXT PIC X(6) VALUE "BANANA".
       01 WS-COUNT PIC 9(2) VALUE ZERO.
       PROCEDURE DIVISION.
           INSPECT WS-TEXT TALLYING WS-COUNT FOR ALL "A"
           DISPLAY WS-COUNT
           STOP RUN.
```

## Notes

Initialize the tally field before use: INSPECT adds to the existing value. Matching is case-sensitive here. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
