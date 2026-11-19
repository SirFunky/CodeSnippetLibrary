---
id: "cobol-loop"
language: "cobol"
title: "Repeat work with PERFORM VARYING"
description: "Repeat work with PERFORM VARYING."
category: "Control Flow"
tags: ["loop", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-LOOP.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-INDEX PIC 9 VALUE 0.
       PROCEDURE DIVISION.
           PERFORM VARYING WS-INDEX FROM 1 BY 1
               UNTIL WS-INDEX > 3
               DISPLAY WS-INDEX
           END-PERFORM
           STOP RUN.
```

## Notes

The test occurs before each iteration. Ensure the increment and receiving field can reach the termination condition without overflow. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
