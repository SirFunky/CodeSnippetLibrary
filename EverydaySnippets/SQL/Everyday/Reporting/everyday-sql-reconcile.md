---
id: "everyday-sql-reconcile"
language: "sql"
title: "Reconcile totals from two sources"
description: "Reconcile totals from two sources."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["reconcile", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH expected(account,cents) AS (VALUES ('A',100),('B',200)), actual(account,cents) AS (VALUES ('A',90),('C',50)), keys AS (SELECT account FROM expected UNION SELECT account FROM actual)
SELECT k.account,COALESCE(e.cents,0) AS expected_cents,COALESCE(a.cents,0) AS actual_cents,COALESCE(a.cents,0)-COALESCE(e.cents,0) AS difference
FROM keys AS k LEFT JOIN expected AS e ON e.account=k.account LEFT JOIN actual AS a ON a.account=k.account
ORDER BY k.account;
```

## Notes

Each source must have at most one row per account; aggregate first otherwise. Absent source values are treated as zero. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
