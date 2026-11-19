---
id: "starter-go-hello-world"
language: "go"
title: "Hello World — Go"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Notes

Outputs Hello, World! followed by a newline.

Save as main.go. With Go 1.20+ installed, run: go run main.go. Build an executable: go build -o hello.exe main.go. Standard library only. The package and import are already included.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
