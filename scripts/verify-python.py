"""Verify bundled Python examples in an isolated temporary working directory.

This is a development check. The desktop application does not execute snippets.
feature_version checks grammar where supported, not old standard-library behavior.
"""
import ast
from contextlib import redirect_stdout
from datetime import date
import io
import json
import os
from pathlib import Path
import sys
import tempfile


def check(example):
    namespace = {"__name__": "__main__"}
    target = tuple(int(part) for part in example["pythonVersion"].split("."))
    if target > sys.version_info[:2]:
        raise RuntimeError("Install Python %s+ to verify %s" % (example["pythonVersion"], example["id"]))
    ast.parse(example["code"], feature_version=target)
    with redirect_stdout(io.StringIO()):
        exec(compile(example["code"], example["id"], "exec"), namespace)
    identifier = example["id"]
    if identifier == "py-read-text":
        assert namespace["content"] == "Hello, Python!"
    elif identifier == "py-write-text":
        assert Path("output.txt").read_text(encoding="utf-8") == "Hello, Python!"
    elif identifier == "py-deduplicate":
        assert namespace["unique"] == ["Ada", "Linus"]
    elif identifier == "py-count-words":
        assert namespace["counts"] == {"one": 2, "two": 1}
    elif identifier == "py-group-values":
        assert dict(namespace["groups"]) == {"A": ["Ada", "Alan"], "L": ["Linus"]}
    elif identifier == "py-filter-map":
        assert namespace["uppercase"] == ["ADA", "LINUS"]
    elif identifier == "py-merge-dicts":
        assert namespace["settings"] == {"theme": "dark", "font_size": 16}
    elif identifier == "py-json-read":
        assert namespace["name"] == "Ada"
    elif identifier == "py-json-write":
        assert json.loads(namespace["text"]) == {"name": "Ada", "active": True}
    elif identifier == "py-read-csv":
        assert namespace["row"] == {"name": "Ada", "age": "36"}
    elif identifier == "py-parse-date":
        assert namespace["day"] == date(2026, 11, 19)
    elif identifier == "py-regex-numbers":
        assert namespace["numbers"] == ["123", "45"]
    elif identifier == "py-dataclass":
        assert namespace["person"].name == "Ada" and namespace["person"].age == 36
    elif identifier == "py-thread-pool":
        assert namespace["results"] == [1, 4, 9, 16]
    elif identifier == "py-list-files":
        assert namespace["path"] == Path("nested/example.py")


examples = json.load(sys.stdin)
original = os.getcwd()
with tempfile.TemporaryDirectory() as directory:
    try:
        os.chdir(directory)
        Path("example.txt").write_text("Hello, Python!", encoding="utf-8")
        Path("people.csv").write_text("name,age\nAda,36\n", encoding="utf-8")
        Path("nested").mkdir()
        Path("nested/example.py").write_text("pass\n", encoding="utf-8")
        for example in examples:
            check(example)
            print("PASS Python %s: %s" % (example["pythonVersion"], example["id"]))
    finally:
        os.chdir(original)
print("Verified %s Python examples on Python %s." % (len(examples), sys.version.split()[0]))
