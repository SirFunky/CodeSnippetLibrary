---
id: "everyday-sql-date-buckets"
language: "sql"
title: "Group ISO dates into months"
description: "Group ISO dates into months."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["date-buckets", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH invoices(issued_on,cents) AS (VALUES ('2026-01-03',100),('2026-01-25',250),('2026-02-01',50))
SELECT strftime('%Y-%m',issued_on) AS month,SUM(cents) AS cents
FROM invoices GROUP BY strftime('%Y-%m',issued_on) ORDER BY month;
```

## Notes

Fixture uses valid YYYY-MM-DD text. Validate imported dates; invalid strftime input may produce NULL. No timezone conversion is performed. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
