---
id: sql-proc-insert
title: Insert a row and return its identity
description: Use SCOPE_IDENTITY inside the procedure after an insert.
language: sql
sqlDialect: sqlserver
sqlKind: procedure
sqlVersion: "2017"
category: Stored Procedures
subcategory: Writing data
tags:
  - procedure
  - insert
  - identity
---

```sql
CREATE OR ALTER PROCEDURE dbo.AddCustomer
    @Name nvarchar(100),
    @City nvarchar(100),
    @CustomerId int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Customers (Name, City)
    VALUES (@Name, @City);

    SET @CustomerId = CONVERT(int, SCOPE_IDENTITY());
END;
```

## Notes

Requires dbo.Customers with an int IDENTITY CustomerId, Name and City, and suitable defaults for any other required columns. Calling this procedure writes data. Match parameter sizes/types and validation to your schema. Run the definition as its own batch.
