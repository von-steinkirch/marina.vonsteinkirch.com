# marina

static site for **marina.vonsteinkirch.com**. content lives in `public/` and is served as-is.

## adding a new blog post

add a `.md` file in `public/blog/posts/` with YAML frontmatter (`title`, `date`) and then run:

```bash
make blog
```

## running locally

```bash
make server
```

then open [localhost:8037](http://localhost:8037).

## pre-commit (link everything)

a pre-commit hook runs `make link` before each commit so the blog index and links stay up to date.

**setup:**

```bash
pip install pre-commit
pre-commit install
```

after that, every `git commit` runs `make link` automatically. to run manually: `make link` or `pre-commit run --all-files`.
