---
id: "go-trim-text"
language: "go"
title: "Trim surrounding whitespace"
description: "Trim surrounding whitespace."
category: "Strings"
tags: ["trim-text", "go"]
goVersion: "1.16"
imports: ["fmt", "strings"]
---

```go
package main

func main() {
    text := "  Ada\t\n"
    trimmed := strings.TrimSpace(text)
    fmt.Println(trimmed)
}
```

## Notes

TrimSpace removes Unicode whitespace from both ends, not from the middle. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
