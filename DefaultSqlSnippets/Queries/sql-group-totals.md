---
id: sql-group-totals
title: Aggregate totals by city
description: Keep customers without orders using a left join.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Aggregation
tags:
  - group-by
  - sum
  - left-join
---

```sql
SELECT c.city,
       COUNT(o.id) AS order_count,
       COALESCE(SUM(o.total), 0) AS total_amount
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.city
ORDER BY c.city;
```

## Notes

Requires customers(id, city) and orders(id, customer_id, total). COUNT(o.id) counts matching orders rather than the outer-join placeholder row. Store money using a deliberate precision strategy; SQLite does not provide SQL Server-style fixed decimal semantics.
