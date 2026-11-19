---
id: "go-parse-integer"
language: "go"
title: "Parse an integer and handle invalid input"
description: "Parse an integer and handle invalid input."
category: "Data & Validation"
tags: ["parse-integer", "go"]
goVersion: "1.16"
imports: ["fmt", "strconv"]
---

```go
package main

func main() {
    value, err := strconv.Atoi("42")
    if err != nil { panic(err) }
    fmt.Println(value)
    _, invalid := strconv.Atoi("42x")
    fmt.Println(invalid != nil)
}
```

## Notes

Atoi parses a signed decimal integer into the platform int type and reports syntax/range errors. It does not trim whitespace. This small program panics on an unexpected valid-fixture failure; applications should return or handle the error. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
