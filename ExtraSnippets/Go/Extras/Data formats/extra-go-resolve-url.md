---
id: "extra-go-resolve-url"
language: "go"
title: "Resolve a relative URL without making a request"
description: "Resolve a relative URL without making a request."
category: "Data formats"
subcategory: "Practical extras"
tags: ["resolve-url", "practical", "go"]
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
	base, err := url.Parse("https://example.test/docs/start/")
	if err != nil {
		panic(err)
	}
	ref, err := url.Parse("../guide?q=go")
	if err != nil {
		panic(err)
	}
	fmt.Println(base.ResolveReference(ref).String())
}
```

## Notes

URL parsing/resolution only; no request is sent. Untrusted references may replace host or scheme, so enforce a destination policy separately before using the result.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
