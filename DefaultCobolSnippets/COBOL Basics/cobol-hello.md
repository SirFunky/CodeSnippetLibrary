---
id: "cobol-hello"
language: "cobol"
title: "Display a message"
description: "Display a message."
category: "COBOL Basics"
tags: ["hello", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-HELLO.
       PROCEDURE DIVISION.
           DISPLAY "Hello, COBOL!"
           STOP RUN.
```

## Notes

A complete program with no external files or copybooks. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).
