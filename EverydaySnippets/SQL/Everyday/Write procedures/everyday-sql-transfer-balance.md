---
id: "everyday-sql-transfer-balance"
language: "sql"
title: "Transfer integer cents in an explicit transaction"
description: "Transfer integer cents in an explicit transaction."
category: "Write procedures"
subcategory: "Everyday tasks"
tags: ["transfer-balance", "everyday", "sql"]
sqlDialect: "sqlserver"
sqlKind: "procedure"
sqlVersion: "2017"
imports: []
---

```sql
CREATE OR ALTER PROCEDURE dbo.TransferCents
 @FromId int, @ToId int, @Cents bigint
AS
BEGIN
 SET NOCOUNT ON;
 SET XACT_ABORT ON;
 IF @@TRANCOUNT<>0 THROW 50011, 'Call outside an existing transaction.', 1;
 IF @FromId IS NULL OR @ToId IS NULL OR @FromId=@ToId OR @Cents IS NULL OR @Cents<=0
  THROW 50012, 'Invalid transfer.', 1;
 BEGIN TRY
  BEGIN TRANSACTION;
  UPDATE dbo.Accounts SET BalanceCents=BalanceCents-@Cents
   WHERE AccountId=@FromId AND BalanceCents>=@Cents;
  IF @@ROWCOUNT<>1 THROW 50013, 'Source missing or insufficient balance.', 1;
  UPDATE dbo.Accounts SET BalanceCents=BalanceCents+@Cents
   WHERE AccountId=@ToId AND BalanceCents<=9223372036854775807-@Cents;
  IF @@ROWCOUNT<>1 THROW 50014, 'Destination missing or balance overflow.', 1;
  COMMIT TRANSACTION;
 END TRY
 BEGIN CATCH
  IF XACT_STATE()<>0 ROLLBACK TRANSACTION;
  THROW;
 END CATCH;
END;
```

## Notes

Requires dbo.Accounts(AccountId int primary key, BalanceCents bigint not null CHECK(BalanceCents>=0)). Both updates commit together; errors roll back. Opposite concurrent transfers can deadlock: caller needs bounded retry. Real financial workflows also need authorization, audit and idempotency; this is only a transaction pattern. SQL Server 2017+ T-SQL; deployment changes schema. Verified with Microsoft ScriptDom syntax parsing only, not executed against a server. Test permissions, schema binding, concurrency and behavior in an isolated database before use.

Run in the documented database dialect with the stated schema/context. The library never executes SQL.
