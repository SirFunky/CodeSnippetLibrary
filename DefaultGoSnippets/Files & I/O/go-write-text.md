---
id: "go-write-text"
language: "go"
title: "Write a text file with error handling"
description: "Write a text file with error handling."
category: "Files & I/O"
tags: ["write-text", "go"]
goVersion: "1.16"
imports: ["fmt", "os"]
---

```go
package main

func main() {
    err := os.WriteFile("output.txt", []byte("Hello, Go!"), 0600)
    if err != nil { panic(err) }
    fmt.Println("Written")
}
```

## Notes

Creates or truncates output.txt. Permission bits apply when creating the file, subject to the OS and umask; Windows permission semantics differ. This is not an atomic replacement. Return/handle the error in application code. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
