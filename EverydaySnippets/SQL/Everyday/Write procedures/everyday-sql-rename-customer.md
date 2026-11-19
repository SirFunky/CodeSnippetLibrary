---
id: "everyday-sql-rename-customer"
language: "sql"
title: "Rename a customer with a rowversion check"
description: "Rename a customer with a rowversion check."
category: "Write procedures"
subcategory: "Everyday tasks"
tags: ["rename-customer", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.RenameCustomer
 @CustomerId int, @Name nvarchar(200), @ExpectedVersion binary(8)
AS
BEGIN
 SET NOCOUNT ON;
 IF @Name IS NULL OR LEN(LTRIM(RTRIM(@Name)))=0 OR @ExpectedVersion IS NULL
  THROW 50008, 'Missing name or version.', 1;
 UPDATE dbo.Customers SET CustomerName=LTRIM(RTRIM(@Name))
 OUTPUT inserted.CustomerId,inserted.CustomerName,inserted.VersionToken
 WHERE CustomerId=@CustomerId AND VersionToken=@ExpectedVersion;
 IF @@ROWCOUNT<>1 THROW 50009, 'Customer missing or changed.', 1;
END;
```

## Notes

Requires dbo.Customers(CustomerId int primary key, CustomerName nvarchar(200) not null, VersionToken rowversion). Client must validate original length before a bounded SQL parameter can truncate it. rowversion is an opaque concurrency token, not a date. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
