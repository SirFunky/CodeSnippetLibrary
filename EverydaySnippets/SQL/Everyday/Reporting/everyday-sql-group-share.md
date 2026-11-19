---
id: "everyday-sql-group-share"
language: "sql"
title: "Calculate a percentage of the total"
description: "Calculate a percentage of the total."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["group-share", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH sales(region,cents) AS (VALUES ('East',100),('West',300)), totals AS (SELECT region,SUM(cents) AS cents FROM sales GROUP BY region)
SELECT region,cents,100.0*cents/NULLIF(SUM(cents) OVER(),0) AS percent_total
FROM totals ORDER BY region;
```

## Notes

100.0 selects floating-point division; NULLIF yields NULL for a zero grand total. Approximate display percentages, not exact settlement amounts. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
