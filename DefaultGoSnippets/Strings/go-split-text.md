---
id: "go-split-text"
language: "go"
title: "Split text into whitespace-delimited fields"
description: "Split text into whitespace-delimited fields."
category: "Strings"
tags: ["split-text", "go"]
goVersion: "1.16"
imports: ["fmt", "strings"]
---

```go
package main

func main() {
    words := strings.Fields("Ada  Linus\tGrace")
    fmt.Println(strings.Join(words, ", "))
}
```

## Notes

Fields treats consecutive Unicode whitespace as a separator and discards empty fields. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
