---
id: "extra-sql-median"
language: "sql"
title: "Calculate the median including even-sized groups"
description: "Calculate the median including even-sized groups."
category: "Reporting"
subcategory: "Practical extras"
tags: ["median", "practical", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH readings(value) AS (VALUES (10),(20),(30),(100)),
ranked AS (
 SELECT value, ROW_NUMBER() OVER(ORDER BY value) AS rn, COUNT(*) OVER() AS n FROM readings
)
SELECT AVG(1.0*value) AS median FROM ranked WHERE rn IN ((n+1)/2,(n+2)/2);
```

## Notes

Self-contained SQLite 3.25+ fixture; integer row-count division selects the middle one or two rows. Exclude NULL values before ranking in a real table. Empty input returns NULL; result uses approximate floating-point arithmetic.

The app never executes SQL. SQL Server procedures are checked for syntax only, without connecting to a server; validate schema, permissions and behavior in an isolated database before deployment.
