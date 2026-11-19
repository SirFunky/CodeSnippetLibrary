---
id: sql-proc-pagination
title: Page results inside a stored procedure
description: Validate paging inputs and use a stable order.
language: sql
sqlDialect: sqlserver
sqlKind: procedure
sqlVersion: "2017"
category: Stored Procedures
subcategory: Pagination
tags:
  - procedure
  - pagination
  - offset
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetCustomersPage
    @PageNumber int = 1,
    @PageSize int = 20
AS
BEGIN
    SET NOCOUNT ON;

    IF @PageNumber IS NULL OR @PageNumber NOT BETWEEN 1 AND 1000000
       OR @PageSize IS NULL OR @PageSize NOT BETWEEN 1 AND 200
        THROW 50004, 'Invalid paging parameters.', 1;

    SELECT CustomerId, Name, City
    FROM dbo.Customers
    ORDER BY CustomerId
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
```

## Notes

Requires dbo.Customers(CustomerId, Name, City), with a unique CustomerId. Concurrent inserts/deletes can shift OFFSET pages. For large offsets or changing data, consider keyset pagination. Input limits also keep the offset arithmetic within int range. Run the definition as its own batch.
