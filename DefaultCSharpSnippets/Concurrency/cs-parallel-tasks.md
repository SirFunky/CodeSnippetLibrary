---
id: cs-parallel-tasks
title: Await multiple asynchronous tasks
description: Run independent tasks and await all results.
language: csharp
category: Concurrency
subcategory: Tasks
tags:
  - async
  - task
  - concurrency
csharpVersion: "7.0"
dotnetVersion: "8.0"
imports:
  - System.Threading.Tasks
---

```csharp
async Task<int> DoubleAsync(int value)
{
    await Task.Delay(1);
    return value * 2;
}

var results = await Task.WhenAll(
    DoubleAsync(1), DoubleAsync(2), DoubleAsync(3));
```

## Notes

Place the example inside an async method. Local functions require C# 7.0. WhenAll preserves task input order; awaiting it propagates failure. Task.Delay stands in for real asynchronous I/O.
