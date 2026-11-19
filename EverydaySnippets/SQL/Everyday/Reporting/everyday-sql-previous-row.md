---
id: "everyday-sql-previous-row"
language: "sql"
title: "Compare each reading with its previous value"
description: "Compare each reading with its previous value."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["previous-row", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH readings(id,value) AS (VALUES (1,10),(2,15),(3,12))
SELECT id,value,value-LAG(value) OVER(ORDER BY id) AS change
FROM readings ORDER BY id;
```

## Notes

The first difference is NULL. Unique order is essential; this compares consecutive rows, not fixed time intervals. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
