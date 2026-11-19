---
id: "everyday-go-csv-record"
language: "go"
title: "Write a CSV record with escaping"
description: "Write a CSV record with escaping."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-record", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"encoding/csv"
	"os"
)

func main() {
	w := csv.NewWriter(os.Stdout)
	if err := w.Write([]string{`Ada, "A"`, "plain"}); err != nil {
		panic(err)
	}
	w.Flush()
	if err := w.Error(); err != nil {
		panic(err)
	}
}
```

## Notes

Standard encoding/csv writer quotes fields and checks buffered errors. Spreadsheet formula policy is separate.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
