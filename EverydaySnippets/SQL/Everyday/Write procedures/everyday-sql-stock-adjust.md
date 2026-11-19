---
id: "everyday-sql-stock-adjust"
language: "sql"
title: "Adjust stock without allowing negative quantity"
description: "Adjust stock without allowing negative quantity."
category: "Write procedures"
subcategory: "Everyday tasks"
tags: ["stock-adjust", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.AdjustStock
 @ProductId int, @Delta int
AS
BEGIN
 SET NOCOUNT ON;
 SET XACT_ABORT ON;
 IF @ProductId IS NULL OR @Delta IS NULL THROW 50002, 'Missing input.', 1;
 UPDATE dbo.Stock SET Quantity=Quantity+@Delta
 WHERE ProductId=@ProductId AND CONVERT(bigint,Quantity)+@Delta BETWEEN 0 AND 2147483647;
 IF @@ROWCOUNT<>1 THROW 50003, 'Missing product or invalid stock result.', 1;
END;
```

## Notes

Requires dbo.Stock(ProductId int primary key, Quantity int not null CHECK(Quantity>=0)). One atomic conditional update; bigint predicate guards int range. Missing/invalid states intentionally share an error. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
