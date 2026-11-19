---
id: "extra-sql-date-islands"
language: "sql"
title: "Group consecutive calendar days into ranges"
description: "Group consecutive calendar days into ranges."
category: "Reporting"
subcategory: "Practical extras"
tags: ["date-islands", "practical", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH days(day) AS (VALUES ('2026-01-01'),('2026-01-02'),('2026-01-04'),('2026-01-05')),
numbered AS (
 SELECT day, julianday(day)-ROW_NUMBER() OVER(ORDER BY day) AS island FROM days
)
SELECT MIN(day) AS first_day, MAX(day) AS last_day, COUNT(*) AS day_count
FROM numbered GROUP BY island ORDER BY first_day;
```

## Notes

Self-contained read-only SQLite 3.25+ fixture. Input must have unique valid YYYY-MM-DD dates; deduplicate before numbering. Groups adjacent calendar dates, not business days.

The app never executes SQL. SQL Server procedures are checked for syntax only, without connecting to a server; validate schema, permissions and behavior in an isolated database before deployment.
