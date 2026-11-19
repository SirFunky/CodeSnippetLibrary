---
id: "cobol-evaluate"
language: "cobol"
title: "Select a branch with EVALUATE"
description: "Select a branch with EVALUATE."
category: "Control Flow"
tags: ["evaluate", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-EVALUATE.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-CODE PIC 9 VALUE 2.
       PROCEDURE DIVISION.
           EVALUATE WS-CODE
               WHEN 1 DISPLAY "One"
               WHEN 2 DISPLAY "Two"
               WHEN OTHER DISPLAY "Other"
           END-EVALUATE
           STOP RUN.
```

## Notes

WHEN OTHER handles values that do not match an earlier branch. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
