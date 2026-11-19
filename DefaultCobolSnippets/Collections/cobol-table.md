---
id: "cobol-table"
language: "cobol"
title: "Populate and read an OCCURS table"
description: "Populate and read an OCCURS table."
category: "Collections"
tags: ["table", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-TABLE.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-TABLE.
          05 WS-ITEM PIC 9(2) OCCURS 3 TIMES.
       PROCEDURE DIVISION.
           MOVE 10 TO WS-ITEM(1)
           MOVE 20 TO WS-ITEM(2)
           MOVE 30 TO WS-ITEM(3)
           DISPLAY WS-ITEM(3)
           STOP RUN.
```

## Notes

Subscripts are one-based. Keep indexes within the declared OCCURS bounds; use compiler runtime checks while developing. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
