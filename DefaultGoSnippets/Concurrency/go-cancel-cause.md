---
id: "go-cancel-cause"
language: "go"
title: "Cancel a context with an explicit cause"
description: "Cancel a context with an explicit cause."
category: "Concurrency"
tags: ["cancel-cause", "go"]
goVersion: "1.20"
imports: ["context", "errors", "fmt"]
---

```go
package main

func main() {
    ctx, cancel := context.WithCancelCause(context.Background())
    defer cancel(nil)
    reason := errors.New("stopped")
    cancel(reason)
    <-ctx.Done()
    fmt.Println(errors.Is(ctx.Err(), context.Canceled))
    fmt.Println(errors.Is(context.Cause(ctx), reason))
}
```

## Notes

WithCancelCause and Cause require Go 1.20. Cancellation signals cooperating operations; it does not forcibly stop goroutines. Call the cancel function to release associated resources. This example starts no goroutine or network operation. https://go.dev/doc/go1.20 Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
