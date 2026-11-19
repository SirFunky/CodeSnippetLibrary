---
id: "everyday-sql-moving-average"
language: "sql"
title: "Calculate a three-row moving average"
description: "Calculate a three-row moving average."
category: "Reporting"
subcategory: "Everyday tasks"
tags: ["moving-average", "everyday", "sql"]
sqlDialect: "sqlite"
sqlKind: "query"
sqlVersion: "3.25"
imports: []
---

```sql
WITH readings(id,value) AS (VALUES (1,10.0),(2,20.0),(3,30.0),(4,40.0))
SELECT id,AVG(value) OVER(ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_average
FROM readings ORDER BY id;
```

## Notes

First rows use fewer observations. This is a row-count window, not a calendar-duration window. Self-contained read-only CTE fixture; replace it with your table and bound parameters. SQLite 3.25+.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
