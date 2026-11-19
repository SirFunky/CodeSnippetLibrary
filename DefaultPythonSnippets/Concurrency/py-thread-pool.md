---
id: py-thread-pool
title: Map tasks with a thread pool
description: Run independent tasks using a managed executor.
language: python
category: Concurrency
subcategory: Executors
tags:
  - thread
  - executor
  - concurrency
pythonVersion: "3.2"
imports:
  - from concurrent.futures import ThreadPoolExecutor
---

```python
def square(value):
    return value * value

with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(square, [1, 2, 3, 4]))
```

## Notes

The context manager waits for tasks and shuts down the executor. map preserves input order and propagates task failures during iteration. Threads are mainly useful for blocking I/O; this tiny CPU task only illustrates the API.
