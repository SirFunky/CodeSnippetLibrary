---
id: sql-latest-per-group
title: Get the latest row per customer
description: Rank orders with ROW_NUMBER and select one per customer.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Window functions
tags:
  - row-number
  - window
  - latest
---

```sql
WITH ranked AS (
    SELECT id, customer_id, total,
           ROW_NUMBER() OVER (
               PARTITION BY customer_id
               ORDER BY created_at DESC, id DESC
           ) AS row_number
    FROM orders
)
SELECT id, customer_id, total
FROM ranked
WHERE row_number = 1
ORDER BY customer_id;
```

## Notes

Requires SQLite 3.25+ and orders(id, customer_id, total, created_at). Store created_at in a consistently sortable format/time zone. id breaks timestamp ties deterministically.
