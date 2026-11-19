---
id: "cobol-concatenate"
language: "cobol"
title: "Concatenate text with STRING"
description: "Concatenate text with STRING."
category: "Strings"
tags: ["concatenate", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-CONCATENATE.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-TEXT PIC X(20) VALUE SPACES.
       PROCEDURE DIVISION.
           STRING "Ada" DELIMITED BY SIZE
               ", " DELIMITED BY SIZE
               "Linus" DELIMITED BY SIZE
               INTO WS-TEXT
               ON OVERFLOW
                   DISPLAY "Operation failed"
                   STOP RUN
           END-STRING
           DISPLAY WS-TEXT(1:10)
           STOP RUN.
```

## Notes

Destination capacity is fixed. ON OVERFLOW reports insufficient space; the example displays only the ten populated characters. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).

Error branches display a message and stop. These COBOL 1985 programs do not guarantee a nonzero process exit status; use a documented vendor/standard facility when callers require one.
