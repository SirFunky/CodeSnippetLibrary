---
id: "c-binary-search"
language: "c"
title: "Search a sorted integer array"
description: "Search a sorted integer array."
category: "Collections"
tags: ["binary-search", "c"]
cVersion: 11
imports: ["<stdlib.h>", "<stdio.h>"]
---

```c
static int compare_ints(const void *left, const void *right) {
    int a = *(const int *)left;
    int b = *(const int *)right;
    return (a > b) - (a < b);
}
int main(void) {
    int values[] = {1, 3, 5, 7};
    int key = 5;
    int *found = bsearch(&key, values, sizeof values / sizeof values[0], sizeof values[0], compare_ints);
    if (found == NULL) { puts("Not found"); return 1; }
    printf("%d\n", *found);
    return 0;
}
```

## Notes

Input must already be sorted using the same comparison. With duplicate keys, bsearch may return any matching element. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
