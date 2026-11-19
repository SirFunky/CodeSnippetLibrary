"""Run trusted bundled SELECT examples against a private, in-memory fixture."""
import json
import sqlite3
import sys

examples = json.load(sys.stdin)
expected = {
    "sql-filter-rows": [(1, "Ada", "Stockholm"), (3, "Grace", "Stockholm")],
    "sql-inner-join": [(1, "Ada", 120), (2, "Ada", 50), (3, "Linus", 80), (4, "Grace", 200)],
    "sql-group-totals": [("Helsinki", 1, 80), ("Oslo", 0, 0), ("Stockholm", 3, 370)],
    "sql-find-duplicates": [("shared@example.com", 2)],
    "sql-exists": [(1, "Ada"), (3, "Grace")],
    "sql-cte": [(1, 170), (3, 200)],
    "sql-latest-per-group": [(2, 1, 50), (3, 2, 80), (4, 3, 200)],
    "sql-conditional-aggregate": [(400, 50)],
    "sql-bind-parameter": [(1, "Ada"), (3, "Grace")],
}
connection = sqlite3.connect(":memory:")
try:
    connection.executescript("""
        CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT, email TEXT, city TEXT);
        CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER, status TEXT, total NUMERIC, created_at TEXT);
        INSERT INTO customers VALUES
            (1, 'Ada', 'ada@example.com', 'Stockholm'),
            (2, 'Linus', 'shared@example.com', 'Helsinki'),
            (3, 'Grace', 'shared@example.com', 'Stockholm'),
            (4, 'New', 'new@example.com', 'Oslo');
        INSERT INTO orders VALUES
            (1, 1, 'paid', 120, '2026-11-01'),
            (2, 1, 'pending', 50, '2026-11-02'),
            (3, 2, 'paid', 80, '2026-11-03'),
            (4, 3, 'paid', 200, '2026-11-04');
    """)
    connection.execute("PRAGMA query_only = ON")
    for example in examples:
        rows = connection.execute(example["blocks"][0], {"city": "Stockholm"}).fetchall()
        assert rows == expected[example["id"]], (example["id"], rows)
        print("PASS SQLite query behavior: " + example["id"])
finally:
    connection.close()
print("Verified %s queries using private in-memory SQLite %s." % (len(examples), sqlite3.sqlite_version))
