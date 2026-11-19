---
id: sql-proc-input
title: Create a procedure with an input parameter
description: Create or update a SQL Server procedure that filters customers.
language: sql
sqlDialect: sqlserver
sqlKind: procedure
sqlVersion: "2017"
category: Stored Procedures
subcategory: Parameters
tags:
  - procedure
  - parameter
  - select
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetCustomersByCity
    @City nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT CustomerId, Name, City
    FROM dbo.Customers
    WHERE City = @City
    ORDER BY CustomerId;
END;
```

## Notes

SQL Server syntax, not SQLite/PostgreSQL/MySQL. Requires dbo.Customers(CustomerId, Name, City). Run the definition as its own batch with suitable CREATE/ALTER permissions. CREATE OR ALTER is available from SQL Server 2016 SP1; this collection targets 2017+. Invocation: EXEC dbo.GetCustomersByCity @City = N'Stockholm';
