---
id: "everyday-sql-conditional-totals"
language: "sql"
title: "Summarize amounts by status"
description: "Summarize amounts by status."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["conditional-totals", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH orders(status, cents) AS (VALUES ('paid',1000),('pending',500),('paid',250))
SELECT SUM(CASE WHEN status='paid' THEN cents ELSE 0 END) AS paid_cents,
       SUM(CASE WHEN status='pending' THEN cents ELSE 0 END) AS pending_cents
FROM orders;
```

## Notes

Conditional aggregates return one row. On an empty source SUM is NULL; use COALESCE if zero is the intended policy. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
