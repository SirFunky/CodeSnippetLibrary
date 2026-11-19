---
id: sql-bind-parameter
title: Bind a query parameter
description: Use a named parameter instead of interpolating user input.
language: sql
sqlDialect: sqlite
sqlKind: query
sqlVersion: "3.25"
category: Queries
subcategory: Parameters
tags:
  - parameter
  - binding
  - select
---

```sql
SELECT id, name
FROM customers
WHERE city = :city
ORDER BY id;
```

## Notes

Requires customers(id, name, city). Bind city through your SQLite driver, for example sqlite3 execute(sql, {"city": "Stockholm"}) in Python. Do not quote the placeholder. Other database drivers use different parameter syntax.
