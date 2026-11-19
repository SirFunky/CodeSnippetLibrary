---
id: "cobol-write-record"
language: "cobol"
title: "Write a fixed-length sequential record"
description: "Write a fixed-length sequential record."
category: "Files & I/O"
tags: ["write-record", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-WRITE-RECORD.
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT DATA-FILE ASSIGN TO "output.dat"
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS IS WS-STATUS.
       DATA DIVISION.
       FILE SECTION.
       FD DATA-FILE.
       01 DATA-RECORD PIC X(12).
       WORKING-STORAGE SECTION.
       01 WS-STATUS PIC XX.
       PROCEDURE DIVISION.
           OPEN OUTPUT DATA-FILE
           IF WS-STATUS NOT = "00"
               DISPLAY "Operation failed"
               STOP RUN
           END-IF
           MOVE "Hello COBOL!" TO DATA-RECORD
           WRITE DATA-RECORD
           IF WS-STATUS NOT = "00"
               CLOSE DATA-FILE
               DISPLAY "Operation failed"
               STOP RUN
           END-IF
           CLOSE DATA-FILE
           IF WS-STATUS NOT = "00"
               DISPLAY "Operation failed"
               STOP RUN
           END-IF
           DISPLAY "Written"
           STOP RUN.
```

## Notes

Creates or truncates output.dat and writes one 12-byte record. Sequential file representation and character encoding depend on the compiler/platform. This is not an atomic replacement. File status is checked after opening, processing and closing. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).

Error branches display a message and stop. These COBOL 1985 programs do not guarantee a nonzero process exit status; use a documented vendor/standard facility when callers require one.
