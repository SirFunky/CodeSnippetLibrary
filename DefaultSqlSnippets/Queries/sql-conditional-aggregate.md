---
id: sql-conditional-aggregate
title: Calculate conditional totals
description: Aggregate paid and pending amounts in one pass.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Aggregation
tags:
  - case
  - sum
  - aggregation
---

```sql
SELECT COALESCE(SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END), 0)
           AS paid_total,
       COALESCE(SUM(CASE WHEN status = 'pending' THEN total ELSE 0 END), 0)
           AS pending_total
FROM orders;
```

## Notes

Requires orders(status, total). Other statuses contribute zero. COALESCE also handles an empty table.
