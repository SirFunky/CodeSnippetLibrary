---
id: "everyday-go-partition"
language: "go"
title: "Partition values while preserving order"
description: "Partition values while preserving order."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	yes, no := []int{}, []int{}
	for _, n := range []int{1, 2, 3, 4} {
		if n%2 == 0 {
			yes = append(yes, n)
		} else {
			no = append(no, n)
		}
	}
	fmt.Println(yes)
	fmt.Println(no)
}
```

## Notes

Single-pass partition with explicit predicate.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
