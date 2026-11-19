---
id: sql-inner-join
title: Join customers and orders
description: Combine related rows using an explicit join condition.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Joins
tags:
  - join
  - select
---

```sql
SELECT o.id AS order_id, c.name, o.total
FROM orders AS o
INNER JOIN customers AS c ON c.id = o.customer_id
ORDER BY o.id;
```

## Notes

Requires customers(id, name) and orders(id, customer_id, total). INNER JOIN excludes rows without a matching customer.
