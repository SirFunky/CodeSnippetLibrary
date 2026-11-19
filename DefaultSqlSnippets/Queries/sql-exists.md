---
id: sql-exists
title: Find customers with qualifying orders
description: Use EXISTS without duplicating customer rows.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Subqueries
tags:
  - exists
  - subquery
---

```sql
SELECT c.id, c.name
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.id AND o.total >= 100
)
ORDER BY c.id;
```

## Notes

Requires customers(id, name) and orders(customer_id, total). Consider an index on the order customer key and inspect the query plan for your data.
