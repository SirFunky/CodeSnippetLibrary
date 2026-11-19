---
id: "everyday-go-dedupe-records"
language: "go"
title: "Keep the first record for each ID"
description: "Keep the first record for each ID."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	type Record struct {
		ID   int
		Name string
	}
	rows := []Record{{1, "Ada"}, {1, "Other"}, {2, "Linus"}}
	seen := map[int]bool{}
	for _, r := range rows {
		if !seen[r.ID] {
			seen[r.ID] = true
			fmt.Printf("%d:%s\n", r.ID, r.Name)
		}
	}
}
```

## Notes

Explicit first-wins policy, stable source order.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
