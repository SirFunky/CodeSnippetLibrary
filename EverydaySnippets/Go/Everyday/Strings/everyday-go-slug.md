---
id: "everyday-go-slug"
language: "go"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	s := strings.ToLower(" Ada Lovelace! ")
	s = regexp.MustCompile(`[^a-z0-9]+`).ReplaceAllString(s, "-")
	fmt.Println(strings.Trim(s, "-"))
}
```

## Notes

ASCII slug; non-ASCII letters removed, uniqueness handled separately.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
