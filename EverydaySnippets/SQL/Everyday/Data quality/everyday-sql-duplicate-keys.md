---
id: "everyday-sql-duplicate-keys"
language: "sql"
title: "Find duplicate business keys"
description: "Find duplicate business keys."
category: "Data quality"
subcategory: "Everyday tasks"
tags: ["duplicate-keys", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH contacts(email) AS (VALUES ('ada@example.test'),('ada@example.test'),('linus@example.test'))
SELECT email, COUNT(*) AS occurrences FROM contacts
GROUP BY email HAVING COUNT(*)>1 ORDER BY email;
```

## Notes

Equality follows the chosen collation. Normalize case/whitespace according to your business rules before using a key. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
