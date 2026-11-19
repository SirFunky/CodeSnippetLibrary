---
id: "everyday-go-collapse-spaces"
language: "go"
title: "Collapse runs of whitespace"
description: "Collapse runs of whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(strings.Join(strings.Fields(" Ada\t Linus\nGrace "), " "))
}
```

## Notes

Unicode whitespace collapsed. Do not use on code or whitespace-sensitive data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
