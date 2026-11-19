---
id: "go-parse-time"
language: "go"
title: "Parse a timestamp and format UTC"
description: "Parse a timestamp and format UTC."
category: "Dates & Time"
tags: ["parse-time", "go"]
goVersion: "1.16"
imports: ["fmt", "time"]
---

```go
package main

func main() {
    instant, err := time.Parse(time.RFC3339, "2024-01-02T15:04:05+02:00")
    if err != nil { panic(err) }
    fmt.Println(instant.UTC().Format(time.RFC3339))
}
```

## Notes

Uses an explicit numeric offset and UTC, so it needs no external timezone database. time.Parse reports invalid input; applications should propagate or handle the error. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
