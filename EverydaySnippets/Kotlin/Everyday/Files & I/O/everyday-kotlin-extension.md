---
id: "everyday-kotlin-extension"
language: "kotlin"
title: "Extract a lexical filename extension"
description: "Extract a lexical filename extension."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun ext(path:String):String  {
        val name=path.replace('\\','/').substringAfterLast('/')
        val dot=name.lastIndexOf('.')
        return if(dot>0 && dot<name.lastIndex)name.substring(dot+1).lowercase(java.util.Locale.ROOT) else ""
    }
    println(ext("C:\\reports\\data.CSV"))
    println(ext(".env").length)
}
```

## Notes

Slash/backslash lexical handling; lone dotfiles have no extension. Does not validate contents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
