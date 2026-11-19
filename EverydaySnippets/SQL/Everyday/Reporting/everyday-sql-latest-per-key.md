---
id: "everyday-sql-latest-per-key"
language: "sql"
title: "Select the latest row for each key"
description: "Select the latest row for each key."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["latest-per-key", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH events(id, account_id, occurred_at) AS (VALUES (1,10,'2026-01-01'),(2,10,'2026-01-02'),(3,20,'2026-01-01')),
ranked AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY account_id ORDER BY occurred_at DESC,id DESC) AS rn FROM events)
SELECT id,account_id,occurred_at FROM ranked WHERE rn=1 ORDER BY account_id;
```

## Notes

Unique ID breaks timestamp ties deterministically. ISO dates are text in this fixture; use one consistent storage convention. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
