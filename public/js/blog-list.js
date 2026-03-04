(function() {
	var list = document.getElementById('blog-list');
	if (!list) return;
	fetch('/blog/posts.json')
		.then(function(r) { return r.ok ? r.json() : []; })
		.catch(function() { return []; })
		.then(function(posts) {
			list.innerHTML = '';
			if (posts.length === 0) {
				list.innerHTML = '<li class="qa-item"><div class="qa-question"><p class="qa-question-text text-gray">No posts yet.</p></div></li>';
				return;
			}
			posts.forEach(function(p) {
				var li = document.createElement('li');
				li.className = 'qa-item';
				li.innerHTML = '<div class="qa-question"><p class="qa-question-text"><span class="text-gray">' + escapeHtml(p.date) + '</span> <a href="/blog/post.html?slug=' + encodeURIComponent(p.slug) + '">' + escapeHtml(p.title) + '</a></p></div>';
				list.appendChild(li);
			});
		});
	function escapeHtml(s) {
		var div = document.createElement('div');
		div.textContent = s;
		return div.innerHTML;
	}
})();
