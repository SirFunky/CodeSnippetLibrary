---
id: "starter-sql-hello-world"
language: "sql"
title: "Hello World — SQL"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
SELECT 'Hello, World!' AS message;
```

## Notes

Outputs Hello, World! as a query result.

This SQL starter is a SQLite query that returns one row with a message column; it does not need tables or a stored procedure. Save as hello.sql and run in the SQLite CLI: sqlite3 :memory: ".read hello.sql". The library does not execute SQL or connect to a database.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
