---
id: "everyday-sql-missing-relations"
language: "sql"
title: "Find parents without child records"
description: "Find parents without child records."
category: "Data quality"
subcategory: "Everyday tasks"
tags: ["missing-relations", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH customers(id) AS (VALUES (1),(2),(3)), orders(id,customer_id) AS (VALUES (10,1),(11,3))
SELECT c.id FROM customers AS c
WHERE NOT EXISTS(SELECT 1 FROM orders AS o WHERE o.customer_id=c.id)
ORDER BY c.id;
```

## Notes

NOT EXISTS avoids NOT IN NULL pitfalls. Index the child foreign key for production datasets. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
