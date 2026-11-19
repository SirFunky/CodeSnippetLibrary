---
id: sql-cte
title: Summarize using a CTE
description: Name an intermediate aggregate with a common table expression.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: CTEs
tags:
  - cte
  - with
  - aggregation
---

```sql
WITH totals AS (
    SELECT customer_id, SUM(total) AS total_amount
    FROM orders
    GROUP BY customer_id
)
SELECT customer_id, total_amount
FROM totals
WHERE total_amount >= 100
ORDER BY customer_id;
```

## Notes

Requires orders(customer_id, total). The CTE is scoped to the immediately following statement; it is not a persistent table.
