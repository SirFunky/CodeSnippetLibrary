---
id: sql-proc-optional
title: Create a procedure with an optional filter
description: Allow NULL to mean no status filter.
language: sql
sqlDialect: sqlserver
sqlKind: procedure
sqlVersion: "2017"
category: Stored Procedures
subcategory: Parameters
tags:
  - procedure
  - optional
  - "null"
---

```sql
CREATE OR ALTER PROCEDURE dbo.GetOrdersByStatus
    @Status nvarchar(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT OrderId, CustomerId, Status, Total
    FROM dbo.Orders
    WHERE @Status IS NULL OR Status = @Status
    ORDER BY OrderId;
END;
```

## Notes

Requires dbo.Orders(OrderId, CustomerId, Status, Total). NULL means all statuses. Optional-filter predicates can affect plans and index usage; measure performance against production-sized data. Run the definition in its own batch.
