server:
	cd public && python3 -m http.server 8000
	echo "server running at http://localhost:8000"
	echo "press ctrl+c to stop"

.PHONY: server
