---
id: "go-decode-json"
language: "go"
title: "Decode and validate JSON fields"
description: "Decode and validate JSON fields."
category: "Data & Validation"
tags: ["decode-json", "go"]
goVersion: "1.16"
imports: ["encoding/json", "fmt", "io", "strings"]
---

```go
package main

type Profile struct {
    Name string `json:"name"`
    Age *int `json:"age"`
}
func parseProfile(text string) (Profile, error) {
    var profile Profile
    decoder := json.NewDecoder(strings.NewReader(text))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&profile); err != nil { return profile, err }
    var trailing interface{}
    if err := decoder.Decode(&trailing); err != io.EOF { return profile, fmt.Errorf("expected one JSON value") }
    if strings.TrimSpace(profile.Name) == "" || profile.Age == nil || *profile.Age < 0 {
        return profile, fmt.Errorf("name and a non-negative age are required")
    }
    return profile, nil
}
func main() {
    profile, err := parseProfile(`{"name":"Ada","age":37}`)
    if err != nil { panic(err) }
    fmt.Println(profile.Name, *profile.Age)
    _, err = parseProfile(`{"name":"Ada"}`)
    fmt.Println(err != nil)
}
```

## Notes

Rejects unknown fields, missing/null age, blank names, negative age and trailing JSON. Duplicate keys follow encoding/json semantics (later values replace or merge earlier ones); this is not a duplicate-key validator. Bound input sizes in application code. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
