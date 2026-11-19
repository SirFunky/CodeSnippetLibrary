---
id: sql-proc-transaction
title: Handle a transaction inside a procedure
description: Transfer a positive amount with error handling and rollback.
language: sql
sqlDialect: sqlserver
sqlKind: procedure
sqlVersion: "2017"
category: Stored Procedures
subcategory: Transactions
tags:
  - procedure
  - transaction
  - try-catch
---

```sql
CREATE OR ALTER PROCEDURE dbo.TransferBalance
    @FromAccountId int,
    @ToAccountId int,
    @Amount decimal(18, 2)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF @Amount IS NULL OR @Amount <= 0 OR @FromAccountId = @ToAccountId
        THROW 50001, 'Provide a positive amount and two different accounts.', 1;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE dbo.Accounts
        SET Balance = Balance - @Amount
        WHERE AccountId = @FromAccountId AND Balance >= @Amount;
        IF @@ROWCOUNT <> 1
            THROW 50002, 'Source account missing or insufficient balance.', 1;

        UPDATE dbo.Accounts
        SET Balance = Balance + @Amount
        WHERE AccountId = @ToAccountId;
        IF @@ROWCOUNT <> 1
            THROW 50003, 'Destination account missing.', 1;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
```

## Notes

Writes dbo.Accounts(AccountId, Balance decimal(18,2)). Designed to own its transaction: adapt savepoint/rollback policy before calling inside a caller-owned transaction, because rollback affects the whole transaction. Production transfer logic also needs business constraints, auditing and a deadlock/retry strategy. Run the definition as its own batch.
