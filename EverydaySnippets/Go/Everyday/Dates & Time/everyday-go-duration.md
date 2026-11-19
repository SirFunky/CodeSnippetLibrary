---
id: "everyday-go-duration"
language: "go"
title: "Format elapsed seconds"
description: "Format elapsed seconds."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	seconds := int64(3661)
	if seconds < 0 {
		panic("nonnegative seconds required")
	}
	fmt.Printf("%02d:%02d:%02d\n", seconds/3600, seconds%3600/60, seconds%60)
}
```

## Notes

Duration, not a clock. Hours can exceed 23.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
