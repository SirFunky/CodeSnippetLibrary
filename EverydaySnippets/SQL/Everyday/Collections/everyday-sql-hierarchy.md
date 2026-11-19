---
id: "everyday-sql-hierarchy"
language: "sql"
title: "Walk a bounded parent-child hierarchy"
description: "Walk a bounded parent-child hierarchy."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["hierarchy", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH RECURSIVE nodes(id,parent_id,name) AS (VALUES (1,NULL,'Root'),(2,1,'Child'),(3,2,'Leaf')), tree(id,name,depth) AS (
 SELECT id,name,0 FROM nodes WHERE parent_id IS NULL
 UNION ALL
 SELECT n.id,n.name,t.depth+1 FROM nodes AS n JOIN tree AS t ON n.parent_id=t.id WHERE t.depth<10
) SELECT id,name,depth FROM tree ORDER BY depth,id;
```

## Notes

Depth limit bounds recursion, but does not detect cycles or guarantee completeness in arbitrary graphs. Validate tree integrity separately. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
