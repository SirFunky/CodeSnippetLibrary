---
id: "everyday-sql-archive-events"
language: "sql"
title: "Delete a bounded batch of old events"
description: "Delete a bounded batch of old events."
category: "Maintenance procedures"
subcategory: "Everyday tasks"
tags: ["archive-events", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.DeleteOldEventBatch
 @Before datetime2, @BatchSize int=1000
AS
BEGIN
 SET NOCOUNT ON;
 SET XACT_ABORT ON;
 IF @Before IS NULL OR @BatchSize IS NULL OR @BatchSize<1 OR @BatchSize>10000
  THROW 50010, 'Invalid retention bounds.', 1;
 ;WITH batch AS (
  SELECT TOP (@BatchSize) EventId FROM dbo.EventLog
  WHERE OccurredAt<@Before ORDER BY OccurredAt,EventId
 )
 DELETE FROM batch;
 SELECT @@ROWCOUNT AS DeletedRows;
END;
```

## Notes

DESTRUCTIVE procedure example: requires dbo.EventLog(EventId bigint primary key, OccurredAt datetime2). Deploy and execute only in an intended database after backup/retention review. Despite the category, this deletes without archiving; name states that behavior. Index (OccurredAt,EventId). SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
