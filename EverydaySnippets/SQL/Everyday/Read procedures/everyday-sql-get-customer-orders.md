---
id: "everyday-sql-get-customer-orders"
language: "sql"
title: "Read customer orders in a date interval"
description: "Read customer orders in a date interval."
category: "Read procedures"
subcategory: "Everyday tasks"
tags: ["get-customer-orders", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetCustomerOrders
 @CustomerId int, @FromDate date, @UntilDate date
AS
BEGIN
 SET NOCOUNT ON;
 IF @CustomerId IS NULL OR @FromDate IS NULL OR @UntilDate IS NULL OR @FromDate >= @UntilDate
  THROW 50001, 'Invalid customer or date interval.', 1;
 SELECT OrderId, CustomerId, OrderedAt, TotalCents
 FROM dbo.Orders
 WHERE CustomerId=@CustomerId AND OrderedAt>=@FromDate AND OrderedAt<@UntilDate
 ORDER BY OrderedAt,OrderId;
END;
```

## Notes

Requires dbo.Orders(OrderId int primary key, CustomerId int, OrderedAt datetime2, TotalCents bigint). Half-open interval includes all times before UntilDate. Caller controls authorization. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
