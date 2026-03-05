(function() {
	var params = new URLSearchParams(window.location.search);
	var slug = params.get('slug');
	var contentEl = document.getElementById('post-content');
	var headerEl = document.getElementById('post-header');
	var titleEl = document.getElementById('post-title');
	var metaEl = document.getElementById('post-meta');

	if (!slug || !contentEl) {
		contentEl.innerHTML = '<p class="text-gray">Missing post.</p> <p><a href="./">Back to Dr.\'s AI Science Blog</a></p>';
		return;
	}
	slug = slug.replace(/[^a-z0-9-_]/gi, '');
	if (!slug) {
		contentEl.innerHTML = '<p class="text-gray">Invalid post.</p> <p><a href="./">Back to Dr.\'s AI Science Blog</a></p>';
		return;
	}

	function parseFrontmatter(raw) {
		var meta = {};
		var body = raw;
		if (raw.indexOf('---') === 0) {
			var end = raw.indexOf('---', 3);
			if (end !== -1) {
				var block = raw.slice(3, end);
				body = raw.slice(end + 3).replace(/^\s+/, '');
				block.split('\n').forEach(function(line) {
					var m = line.match(/^(\w+):\s*(.+)$/);
					if (m) meta[m[1].toLowerCase()] = m[2].trim();
				});
			}
		}
		return { meta: meta, body: body };
	}

	function formatDate(s) {
		if (!s) return '';
		var d = new Date(s);
		return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	function showError(msg) {
		contentEl.innerHTML = '<p class="text-gray">' + msg + '</p> <p><a href="./">Back to Dr.\'s AI Science Blog</a></p>';
	}

	var timeout = setTimeout(function() {
		timeout = null;
		showError('Request timed out. Run the site with <code>make server</code> and open from the server (e.g. http://localhost:8000/blog/post.html?slug=' + encodeURIComponent(slug) + ').');
	}, 8000);

	fetch('/blog/posts/' + slug + '.md')
		.then(function(r) {
			if (!r.ok) throw new Error('Not found');
			return r.text();
		})
		.then(function(raw) {
			if (timeout) { clearTimeout(timeout); timeout = null; }
			var parsed = parseFrontmatter(raw);
			var title = parsed.meta.title || slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
			var date = parsed.meta.date || '';

			if (document.title) document.title = title + ' — Dr. Steinkirch\'s Universe';
			titleEl.textContent = title;
			metaEl.textContent = formatDate(date);
			headerEl.style.display = 'block';

			var html = parsed.body;
			if (typeof marked === 'function') {
				try {
					html = (marked.parse || marked)(parsed.body);
				} catch { /* ignore parse errors */ }
			}
			contentEl.innerHTML = html;
		})
		.catch(function() {
			if (timeout) { clearTimeout(timeout); timeout = null; }
			showError('Post not found.');
		});
})();
