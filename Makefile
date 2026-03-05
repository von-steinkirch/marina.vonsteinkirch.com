.PHONY: server blog link
server:
	cd public && python3 -m http.server 8037
	echo "server running at http://localhost:8037"

blog:
	python3 scripts/build_blog.py

link: blog
