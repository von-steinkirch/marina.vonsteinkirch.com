"""Tests for scripts/build_blog.py."""

import json
from pathlib import Path
from unittest.mock import patch

import pytest

# Import after potentially patching BLOG_DIR
from scripts.build_blog import BLOG_DIR, main, parse_frontmatter


class TestParseFrontmatter:
    """Tests for parse_frontmatter."""

    def test_empty_content(self) -> None:
        meta, body = parse_frontmatter("")
        assert meta == {}
        assert body == ""

    def test_no_frontmatter(self) -> None:
        content = "Just some markdown.\n\nNo YAML here."
        meta, body = parse_frontmatter(content)
        assert meta == {}
        assert body == content

    def test_frontmatter_title_and_date(self) -> None:
        content = """---
title: My Post Title
date: 2025-03-04
---

Body text here.
"""
        meta, body = parse_frontmatter(content)
        assert meta == {"title": "My Post Title", "date": "2025-03-04"}
        assert body.strip() == "Body text here."

    def test_frontmatter_lowercase_keys(self) -> None:
        content = """---
Title: Foo
DATE: 2026-01-01
---

Body
"""
        meta, _ = parse_frontmatter(content)
        assert meta["title"] == "Foo"
        assert meta["date"] == "2026-01-01"

    def test_frontmatter_value_with_colon(self) -> None:
        content = """---
title: Hello: World
date: 2025-01-01
---

Body
"""
        meta, _ = parse_frontmatter(content)
        assert meta["title"] == "Hello: World"


class TestMain:
    """Tests for main() using a temporary blog dir."""

    def test_main_writes_posts_json(self, tmp_path: Path) -> None:
        posts_dir = tmp_path / "blog" / "posts"
        posts_dir.mkdir(parents=True)
        (posts_dir / "first.md").write_text(
            """---
title: First Post
date: 2026-01-01
---

Content first.
""",
            encoding="utf-8",
        )
        (posts_dir / "second.md").write_text(
            """---
title: Second Post
date: 2026-01-02
---

Content second.
""",
            encoding="utf-8",
        )
        blog_dir = tmp_path / "blog"
        with patch("scripts.build_blog.BLOG_DIR", blog_dir):
            main()
        out = blog_dir / "posts.json"
        assert out.exists()
        data = json.loads(out.read_text(encoding="utf-8"))
        assert len(data) == 2
        assert data[0]["slug"] == "second"
        assert data[0]["title"] == "Second Post"
        assert data[0]["date"] == "2026-01-02"
        assert data[1]["slug"] == "first"
        assert data[1]["title"] == "First Post"

    def test_main_default_title_and_date(self, tmp_path: Path) -> None:
        posts_dir = tmp_path / "blog" / "posts"
        posts_dir.mkdir(parents=True)
        (posts_dir / "no-frontmatter.md").write_text("Just body.\n", encoding="utf-8")
        blog_dir = tmp_path / "blog"
        with patch("scripts.build_blog.BLOG_DIR", blog_dir):
            main()
        data = json.loads((blog_dir / "posts.json").read_text(encoding="utf-8"))
        assert len(data) == 1
        assert data[0]["slug"] == "no-frontmatter"
        assert data[0]["title"] == "No Frontmatter"
        assert data[0]["date"] == "1970-01-01"
