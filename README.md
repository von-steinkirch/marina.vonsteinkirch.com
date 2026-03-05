# marina.vonsteinkirch.com

<br>

- static site for **marina.vonsteinkirch.com**. content lives in `public/` and is served as-is.

<br>

## adding a new blog post

add a `.md` file in `public/blog/posts/` with YAML frontmatter (`title`, `date`) and then run:

```bash
make blog
```

<br>

## running locally

```bash
make server
```

then open [localhost:8037](http://localhost:8037).

<br>

## pre-commit (link + lint)

pre-commit runs `make link` (blog index and links) and lints all HTML and JS files before each commit.

**setup:**

```bash
pip install pre-commit html5validator
pre-commit install
```

you need **Node.js** installed for the ESLint hook. then every `git commit` runs the link step and linting automatically. to run manually: `make link` or `pre-commit run --all-files`.

<br>

## license

[MIT](LICENSE)
