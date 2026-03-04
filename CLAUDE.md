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
