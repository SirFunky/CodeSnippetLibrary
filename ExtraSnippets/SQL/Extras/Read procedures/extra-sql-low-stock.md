---
id: "extra-sql-low-stock"
language: "sql"
title: "Report products below a stock threshold"
description: "Report products below a stock threshold."
category: "Read procedures"
subcategory: "Practical extras"
tags: ["low-stock", "practical", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetLowStock
 @Threshold int=5
AS
BEGIN
 SET NOCOUNT ON;
 IF @Threshold IS NULL OR @Threshold<0 THROW 50021, 'Invalid stock threshold.', 1;
 SELECT ProductId,Quantity FROM dbo.Stock
 WHERE Quantity<@Threshold ORDER BY Quantity,ProductId;
END;
```

## Notes

SQL Server 2017+. Requires dbo.Stock(ProductId int primary key, Quantity int not null). Threshold comparison is strictly less than; enforce valid nonnegative stock with a table constraint. Caller handles authorization.

The app never executes SQL. SQL Server procedures are checked for syntax only, without connecting to a server; validate schema, permissions and behavior in an isolated database before deployment.
