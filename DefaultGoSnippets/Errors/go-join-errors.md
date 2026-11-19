---
id: "go-join-errors"
language: "go"
title: "Combine errors and inspect their causes"
description: "Combine errors and inspect their causes."
category: "Errors"
tags: ["join-errors", "go"]
goVersion: "1.20"
imports: ["errors", "fmt"]
---

```go
package main

func main() {
    missing := errors.New("missing")
    denied := errors.New("denied")
    combined := errors.Join(missing, denied)
    fmt.Println(errors.Is(combined, missing))
    fmt.Println(errors.Is(combined, denied))
    fmt.Println(errors.Join(nil, nil) == nil)
}
```

## Notes

errors.Join requires Go 1.20. It ignores nil errors and returns nil if all inputs are nil. Inspect causes with errors.Is/As rather than comparing formatted messages. https://go.dev/doc/go1.20 Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
