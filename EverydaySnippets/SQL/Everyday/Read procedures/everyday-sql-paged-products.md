---
id: "everyday-sql-paged-products"
language: "sql"
title: "Page products using a key cursor"
description: "Page products using a key cursor."
category: "Read procedures"
subcategory: "Everyday tasks"
tags: ["paged-products", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetProductPage
 @AfterId int=0, @PageSize int=50
AS
BEGIN
 SET NOCOUNT ON;
 IF @AfterId IS NULL OR @PageSize IS NULL OR @PageSize<1 OR @PageSize>200
  THROW 50006, 'Invalid page bounds.', 1;
 SELECT TOP (@PageSize) ProductId,ProductName
 FROM dbo.Products WHERE ProductId>@AfterId ORDER BY ProductId;
END;
```

## Notes

Requires dbo.Products(ProductId int primary key, ProductName nvarchar(200)). Default cursor assumes positive IDs. Caller passes the last returned ID for the next page. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
