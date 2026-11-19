---
id: sql-find-duplicates
title: Find duplicate email values
description: Use HAVING to select groups with repeated values.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Aggregation
tags:
  - duplicates
  - having
  - group-by
---

```sql
SELECT email, COUNT(*) AS occurrences
FROM customers
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY email;
```

## Notes

Requires customers(email). NULL is excluded. Equality follows the column collation; decide how to normalize case and whitespace for real email addresses. This query only reports duplicates.
