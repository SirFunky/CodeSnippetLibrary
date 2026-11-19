---
id: "everyday-sql-safe-ratio"
language: "sql"
title: "Handle zero and missing denominators"
description: "Handle zero and missing denominators."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-ratio", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH metrics(id,numerator,denominator) AS (VALUES (1,10,4),(2,1,0),(3,1,NULL))
SELECT id,1.0*numerator/NULLIF(denominator,0) AS ratio FROM metrics ORDER BY id;
```

## Notes

NULL represents an undefined ratio for zero/missing denominators. Uses approximate floating-point arithmetic. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
