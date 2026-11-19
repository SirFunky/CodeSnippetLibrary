---
id: "extra-sql-rename-product"
language: "sql"
title: "Rename a product using an expected current name"
description: "Rename a product using an expected current name."
category: "Write procedures"
subcategory: "Practical extras"
tags: ["rename-product", "practical", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.RenameProduct
 @ProductId int, @ExpectedName nvarchar(200), @NewName nvarchar(200)
AS
BEGIN
 SET NOCOUNT ON;
 IF @ProductId IS NULL OR @ExpectedName IS NULL OR @NewName IS NULL OR LEN(LTRIM(RTRIM(@NewName)))=0
  THROW 50022, 'Invalid rename input.', 1;
 UPDATE dbo.Products SET ProductName=LTRIM(RTRIM(@NewName))
 WHERE ProductId=@ProductId AND ProductName=@ExpectedName;
 IF @@ROWCOUNT<>1 THROW 50023, 'Product missing or name changed.', 1;
END;
```

## Notes

SQL Server 2017+. Requires dbo.Products(ProductId int primary key, ProductName nvarchar(200) not null). One atomic expected-state update. Database collation and trailing-space comparison rules apply; use rowversion for stronger concurrency tokens. Validate original string lengths in the client before binding bounded parameters to avoid silent parameter truncation.

The app never executes SQL. SQL Server procedures are checked for syntax only, without connecting to a server; validate schema, permissions and behavior in an isolated database before deployment.
