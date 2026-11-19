---
id: sql-filter-rows
title: Filter and sort rows
description: Select customers from one city in a stable order.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Filtering
tags:
  - select
  - where
  - order-by
---

```sql
SELECT id, name, city
FROM customers
WHERE city = 'Stockholm'
ORDER BY id;
```

## Notes

Requires customers(id, name, city). The example literal is for illustration; bind application input as parameters instead of concatenating SQL.
