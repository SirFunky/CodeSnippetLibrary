---
id: "everyday-sql-running-total"
language: "sql"
title: "Calculate a deterministic running total"
description: "Calculate a deterministic running total."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["running-total", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH entries(id,cents) AS (VALUES (1,200),(2,-100),(3,400))
SELECT id,SUM(cents) OVER(ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS balance_cents
FROM entries ORDER BY id;
```

## Notes

Explicit ROWS frame and unique order define row-by-row accumulation. SQLite integer SUM can overflow for large amounts. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
