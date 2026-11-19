---
id: "everyday-go-mask-id"
language: "go"
title: "Mask an identifier using Unicode code points"
description: "Mask an identifier using Unicode code points."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "go"]
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
	for _, s := range []string{"ABC123456", "123"} {
		r := []rune(s)
		if len(r) > 4 {
			s = strings.Repeat("*", len(r)-4) + string(r[len(r)-4:])
		}
		fmt.Println(s)
	}
}
```

## Notes

Counts Unicode code points, not grapheme clusters. Masking is display-only.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
