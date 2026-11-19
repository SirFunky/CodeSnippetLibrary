---
id: "everyday-go-url-query"
language: "go"
title: "Encode URL query parameters"
description: "Encode URL query parameters."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["url-query", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {
	v := url.Values{}
	v.Set("q", "Ada & Linus")
	v.Set("page", "2")
	fmt.Println(v.Encode())
}
```

## Notes

Pure encoding only; no request is sent. Keys sorted by the standard library.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
