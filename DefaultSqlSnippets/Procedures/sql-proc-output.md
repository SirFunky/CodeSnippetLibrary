---
id: sql-proc-output
title: Return a value through an output parameter
description: Count matching customers and return the count to the caller.
language: sql
sqlDialect: sqlserver
sqlKind: procedure
sqlVersion: "2017"
category: Stored Procedures
subcategory: Output parameters
tags:
  - procedure
  - output
  - count
---

```sql primary
CREATE OR ALTER PROCEDURE dbo.CountCustomersByCity
    @City nvarchar(100),
    @CustomerCount int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @CustomerCount = COUNT(*)
    FROM dbo.Customers
    WHERE City = @City;
END;
```

```sql
DECLARE @Count int;
EXEC dbo.CountCustomersByCity
    @City = N'Stockholm', @CustomerCount = @Count OUTPUT;
SELECT @Count AS CustomerCount;
```

## Notes

Requires dbo.Customers(City). OUTPUT must be specified in both the procedure signature and the invocation. Run the definition separately from the invocation example. COUNT returns int and can overflow for extremely large results.
