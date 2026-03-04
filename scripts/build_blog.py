#!/usr/bin/env python3
"""
Scan public/blog/posts/*.md, parse YAML frontmatter (title, date), and write public/blog/posts.json.
Add a new post by creating a file like public/blog/posts/my-slug.md with:

---
title: My Post Title
date: 2025-03-04
---

Your markdown content...
"""

import json
import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).resolve().parent.parent / "public" / "blog"


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Extract optional frontmatter and return (meta, body)."""
    meta = {}
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            body = parts[2].lstrip()
            for line in parts[1].strip().splitlines():
                m = re.match(r"^(\w+):\s*(.+)$", line.strip())
                if m:
                    meta[m.group(1).lower()] = m.group(2).strip()
    return meta, body


def main() -> None:
    POSTS_DIR = BLOG_DIR / "posts"
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    posts = []
    for path in sorted(POSTS_DIR.glob("*.md"), reverse=True):
        slug = path.stem
        text = path.read_text(encoding="utf-8")
        meta, _ = parse_frontmatter(text)
        title = meta.get("title", slug.replace("-", " ").title())
        date = meta.get("date", "1970-01-01")
        posts.append({"slug": slug, "title": title, "date": date})
    # Sort by date descending
    posts.sort(key=lambda p: p["date"], reverse=True)
    out = BLOG_DIR / "posts.json"
    out.write_text(json.dumps(posts, indent=2), encoding="utf-8")
    print(f"Wrote {len(posts)} posts to {out}", file=sys.stderr)


if __name__ == "__main__":
    main()
