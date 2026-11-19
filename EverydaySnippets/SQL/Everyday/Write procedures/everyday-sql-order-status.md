---
id: "everyday-sql-order-status"
language: "sql"
title: "Change an order status conditionally"
description: "Change an order status conditionally."
category: "Write procedures"
subcategory: "Everyday tasks"
tags: ["order-status", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.ChangeOrderStatus
 @OrderId int, @ExpectedStatus varchar(20), @NewStatus varchar(20)
AS
BEGIN
 SET NOCOUNT ON;
 IF @ExpectedStatus IS NULL OR @NewStatus IS NULL OR @NewStatus NOT IN ('pending','paid','cancelled')
  THROW 50004, 'Invalid status.', 1;
 UPDATE dbo.Orders SET Status=@NewStatus WHERE OrderId=@OrderId AND Status=@ExpectedStatus;
 IF @@ROWCOUNT<>1 THROW 50005, 'Order missing or changed.', 1;
END;
```

## Notes

Requires dbo.Orders(OrderId int primary key, Status varchar(20) not null). Optimistic expected-state check; add domain-specific transition rules. Database collation controls case sensitivity. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
