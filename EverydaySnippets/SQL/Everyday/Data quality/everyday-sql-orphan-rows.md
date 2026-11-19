---
id: "everyday-sql-orphan-rows"
language: "sql"
title: "Find child records without a parent"
description: "Find child records without a parent."
category: "Data quality"
subcategory: "Everyday tasks"
tags: ["orphan-rows", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH customers(id) AS (VALUES (1),(2)), orders(id,customer_id) AS (VALUES (10,1),(11,9),(12,NULL))
SELECT o.id,o.customer_id FROM orders AS o
WHERE o.customer_id IS NOT NULL AND NOT EXISTS(SELECT 1 FROM customers AS c WHERE c.id=o.customer_id)
ORDER BY o.id;
```

## Notes

Nullable unassigned relationships are explicitly excluded. Foreign-key enforcement can prevent new orphan rows. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
