---
id: "go-join-text"
language: "go"
title: "Join a slice of strings"
description: "Join a slice of strings."
category: "Strings"
tags: ["join-text", "go"]
goVersion: "1.16"
imports: ["fmt", "strings"]
---

```go
package main

func main() {
    names := []string{"Ada", "Linus"}
    joined := strings.Join(names, ", ")
    fmt.Println(joined)
}
```

## Notes

An empty slice joins to an empty string. Joining does not escape separators inside values. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
