---
id: "everyday-go-extension"
language: "go"
title: "Extract a lexical filename extension"
description: "Extract a lexical filename extension."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"path"
	"strings"
)

func main() {
	name := path.Base(strings.ReplaceAll(`C:eports\data.CSV`, `\`, "/"))
	ext := path.Ext(name)
	if ext == name || ext == "." {
		ext = ""
	}
	fmt.Println(strings.ToLower(strings.TrimPrefix(ext, ".")))
}
```

## Notes

Slash/backslash lexical handling. Dotfile policy is explicit; extension does not validate contents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
