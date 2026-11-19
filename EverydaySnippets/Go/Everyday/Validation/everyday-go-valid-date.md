---
id: "everyday-go-valid-date"
language: "go"
title: "Validate an exact calendar date"
description: "Validate an exact calendar date."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	for _, s := range []string{"2024-02-29", "2023-02-29"} {
		d, err := time.Parse("2006-01-02", s)
		fmt.Println(err == nil && d.Format("2006-01-02") == s)
	}
}
```

## Notes

Exact YYYY-MM-DD; no local timezone or clock time involved.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
