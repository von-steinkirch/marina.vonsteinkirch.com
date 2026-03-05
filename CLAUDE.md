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

## pre-commit (link everything)

<br>

- a pre-commit hook runs `make link` before each commit so the blog index and links stay up to date
- setup: `pip install pre-commit`, then `pre-commit install`
- run manually: `make link` or `pre-commit run --all-files`
