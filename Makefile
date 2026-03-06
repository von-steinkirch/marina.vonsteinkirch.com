.PHONY: server blog link test lint
server:
	cd public && python3 -m http.server 8037
	echo "server running at http://localhost:8037"

blog:
	python3 scripts/build_blog.py

link: blog

test:
	python3 -m pytest tests/ -v

lint: link
	pre-commit run ruff --all-files
	pre-commit run eslint --all-files
