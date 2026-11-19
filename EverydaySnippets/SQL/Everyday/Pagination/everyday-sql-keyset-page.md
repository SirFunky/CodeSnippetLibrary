---
id: "everyday-sql-keyset-page"
language: "sql"
title: "Fetch the next page using a stable key"
description: "Fetch the next page using a stable key."
category: "Pagination"
subcategory: "Everyday tasks"
tags: ["keyset-page", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH items(id,name) AS (VALUES (1,'Ada'),(2,'Grace'),(3,'Linus'),(4,'Niklas'))
SELECT id,name FROM items WHERE id>2 ORDER BY id LIMIT 2;
```

## Notes

Replace the literal cursor with a bound parameter. Unique ascending IDs define a stable seek order; concurrent updates still need a consistency policy. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
