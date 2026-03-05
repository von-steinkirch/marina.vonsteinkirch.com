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

## pre-commit (link + lint)

<br>

- a pre-commit hook runs `make link` (blog index and links) and lints all HTML and JS before each commit
- setup: `pip install pre-commit html5validator`, then `pre-commit install`; Node.js required for the ESLint hook
- run manually: `make link` or `pre-commit run --all-files`
