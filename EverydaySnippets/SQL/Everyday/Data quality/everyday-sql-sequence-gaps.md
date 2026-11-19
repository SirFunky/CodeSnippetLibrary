---
id: "everyday-sql-sequence-gaps"
language: "sql"
title: "Locate gaps between integer identifiers"
description: "Locate gaps between integer identifiers."
category: "Data quality"
subcategory: "Everyday tasks"
tags: ["sequence-gaps", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH ids(id) AS (VALUES (1),(2),(5),(8)), adjacent AS (SELECT id,LAG(id) OVER(ORDER BY id) AS previous_id FROM ids)
SELECT previous_id+1 AS missing_from,id-1 AS missing_to FROM adjacent
WHERE id-previous_id>1 ORDER BY id;
```

## Notes

Reports internal missing ranges only. Input IDs must be unique integers with arithmetic inside SQLite integer range. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
