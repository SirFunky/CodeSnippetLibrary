---
id: "go-read-text"
language: "go"
title: "Read a UTF-8 text file"
description: "Read a UTF-8 text file."
category: "Files & I/O"
tags: ["read-text", "go"]
goVersion: "1.16"
imports: ["fmt", "os"]
---

```go
package main

func main() {
    content, err := os.ReadFile("example.txt")
    if err != nil { panic(err) }
    fmt.Println(string(content))
}
```

## Notes

Requires example.txt in the working directory. ReadFile loads the entire file and returns bytes; converting to string does not validate UTF-8. The fixture is UTF-8. Return/handle errors and use streaming for large inputs. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
