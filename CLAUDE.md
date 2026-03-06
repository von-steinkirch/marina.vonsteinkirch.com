# marina

<br>

* static site for **marina.vonsteinkirch.com**
* content lives in `public/` and is served as-is

## adding a new blog post

<br>

- add a `.md` file in `public/blog/posts/` with YAML frontmatter (`title`, `date`) and then run:

```bash
make blog
```

<br>

## running this page locally

<br>

```bash
make server
```

then open [localhost:8037](http://localhost:8037).

<br>

## pre-commit (link + tests + linters)

<br>

- a pre-commit hook runs **link** (build blog), **tests** (pytest), **Python linter** (Ruff), and **JS linter** (ESLint). HTML validation is disabled (requires Java); run manually: `html5validator public/` if needed.
- setup: `pip install -r requirements-dev.txt` (or `pip install pre-commit`), then `pre-commit install`. Node.js required for the ESLint hook.
- run manually: `make link`, `make test`, `make lint`, or `pre-commit run --all-files`.

<br>

## tests and lint

<br>

- tests: `tests/test_build_blog.py` (pytest). Run: `make test`.
- lint: `make lint` runs `make link` then Ruff and ESLint via pre-commit.
- CI: GitHub Action runs `pre-commit run --all-files` on push/PR to main/master (see `.github/workflows/ci.yml`).

<br>

## layout

<br>

- `public/` — static assets (HTML, CSS, JS, images). `public/blog/posts/*.md` = blog source; `scripts/build_blog.py` writes `public/blog/posts.json`.
- `scripts/build_blog.py` — scan posts, parse frontmatter, emit `posts.json`.
- `eslint.config.js` — ESLint flat config (JS). Ruff used for Python (no config file; pre-commit + CI).
