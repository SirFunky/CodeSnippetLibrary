---
id: "everyday-sql-sales-summary"
language: "sql"
title: "Summarize daily sales for a date interval"
description: "Summarize daily sales for a date interval."
category: "Read procedures"
subcategory: "Everyday tasks"
tags: ["sales-summary", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetDailySales
 @FromDate date, @UntilDate date
AS
BEGIN
 SET NOCOUNT ON;
 IF @FromDate IS NULL OR @UntilDate IS NULL OR @FromDate>=@UntilDate
  THROW 50007, 'Invalid date interval.', 1;
 SELECT CONVERT(date,OrderedAt) AS SalesDate,SUM(CONVERT(decimal(38,0),TotalCents)) AS TotalCents,COUNT_BIG(*) AS Orders
 FROM dbo.Orders WHERE OrderedAt>=@FromDate AND OrderedAt<@UntilDate
 GROUP BY CONVERT(date,OrderedAt) ORDER BY SalesDate;
END;
```

## Notes

Requires dbo.Orders(OrderedAt datetime2, TotalCents bigint). Decimal aggregate widens capacity. Dates use the storage timezone convention; missing days are omitted. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
