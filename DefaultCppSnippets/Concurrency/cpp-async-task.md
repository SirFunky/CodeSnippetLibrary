---
id: cpp-async-task
title: Run a task asynchronously
description: Launch a task and retrieve its result through a future.
language: cpp
category: Concurrency
subcategory: Tasks
tags:
  - async
  - future
  - task
cppVersion: 14
imports:
  - <future>
---

```cpp
auto result = std::async(std::launch::async, [] { return 6 * 7; });
int answer = result.get();
```

## Notes

The explicit launch policy avoids deferred execution. get blocks until completion and rethrows task exceptions. It can be called only once. A future from std::async can also block in its destructor while the task finishes.
