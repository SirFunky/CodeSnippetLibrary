---
id: "cobol-read-record"
language: "cobol"
title: "Read a fixed-length sequential record"
description: "Read a fixed-length sequential record."
category: "Files & I/O"
tags: ["read-record", "cobol"]
cobolVersion: 1985
cobolFormat: "fixed"
---

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EX-READ-RECORD.
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT DATA-FILE ASSIGN TO "example.dat"
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS IS WS-STATUS.
       DATA DIVISION.
       FILE SECTION.
       FD DATA-FILE.
       01 DATA-RECORD PIC X(12).
       WORKING-STORAGE SECTION.
       01 WS-STATUS PIC XX.
       PROCEDURE DIVISION.
           OPEN INPUT DATA-FILE
           IF WS-STATUS NOT = "00"
               DISPLAY "Operation failed"
               STOP RUN
           END-IF
           READ DATA-FILE
               AT END
                   CLOSE DATA-FILE
                   DISPLAY "Operation failed"
                   STOP RUN
           END-READ
           IF WS-STATUS NOT = "00"
               CLOSE DATA-FILE
               DISPLAY "Operation failed"
               STOP RUN
           END-IF
           DISPLAY DATA-RECORD
           CLOSE DATA-FILE
           IF WS-STATUS NOT = "00"
               DISPLAY "Operation failed"
               STOP RUN
           END-IF
           STOP RUN.
```

## Notes

Requires example.dat containing exactly one 12-byte record: Hello COBOL! without a newline. File organization/encoding can differ by compiler and platform; this fixture is checked with GnuCOBOL on Windows. File status is checked after opening, processing and closing. Complete program; no external copybooks. Preserve all leading spaces for fixed format (columns 1–6 blank, indicator in column 7, source through column 72).

Error branches display a message and stop. These COBOL 1985 programs do not guarantee a nonzero process exit status; use a documented vendor/standard facility when callers require one.
