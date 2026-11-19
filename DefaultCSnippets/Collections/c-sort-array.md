---
id: "c-sort-array"
language: "c"
title: "Sort integers without comparator overflow"
description: "Sort integers without comparator overflow."
category: "Collections"
tags: ["sort-array", "c"]
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
    int values[] = {3, 1, 2, 1};
    size_t count = sizeof values / sizeof values[0];
    qsort(values, count, sizeof values[0], compare_ints);
    for (size_t i = 0; i < count; ++i) printf("%d%s", values[i], i + 1 == count ? "\n" : " ");
    return 0;
}
```

## Notes

The comparator compares values rather than subtracting them, avoiding signed subtraction overflow. qsort does not guarantee stable ordering. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
