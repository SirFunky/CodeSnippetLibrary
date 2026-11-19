---
id: "everyday-sql-rank-with-ties"
language: "sql"
title: "Rank scores while retaining ties"
description: "Rank scores while retaining ties."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["rank-with-ties", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH scores(name,points) AS (VALUES ('Ada',90),('Linus',90),('Grace',80))
SELECT name,points,DENSE_RANK() OVER(ORDER BY points DESC) AS place
FROM scores ORDER BY points DESC,name;
```

## Notes

DENSE_RANK has no gaps after ties; outer ordering adds a deterministic name tiebreaker without changing rank. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
