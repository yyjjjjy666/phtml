(function () {
    var INDEX_URL = '/wiki/content/index.json';
    var container = document.getElementById('wiki-content');

    function parseFrontmatter(text) {
        var meta = { title: '', category: '', tags: [] };
        var body = text;
        if (text.startsWith('---')) {
            var end = text.indexOf('\n---', 3);
            if (end !== -1) {
                var fm = text.slice(3, end).trim();
                body = text.slice(end + 4).trim();
                fm.split('\n').forEach(function (line) {
                    var m = line.match(/^(\w+):\s*(.*)$/);
                    if (!m) return;
                    var key = m[1], val = m[2].trim();
                    if (key === 'tags') {
                        meta.tags = val.replace(/[\[\]]/g, '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
                    } else {
                        meta[key] = val;
                    }
                });
            }
        }
        return { meta: meta, body: body };
    }

    function tagLink(tag) {
        return '<a class="wiki-tag" href="/wiki?tag=' + encodeURIComponent(tag) + '">' + tag + '</a>';
    }

    function renderArticle(slug, articles) {
        fetch('/wiki/content/' + slug + '.md')
            .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
            .then(function (text) {
                var parsed = parseFrontmatter(text);
                var backLink = '<a class="wiki-back" href="/wiki">&larr; back</a>';
                var tags = parsed.meta.tags.length
                    ? '<div class="wiki-tags">' + parsed.meta.tags.map(tagLink).join('') + '</div>'
                    : '';
                var html = backLink
                    + '<h1 class="wiki-article-title">' + (parsed.meta.title || slug) + '</h1>'
                    + tags
                    + '<div class="wiki-body">' + (typeof marked !== 'undefined' ? marked.parse(parsed.body) : '<pre>' + parsed.body + '</pre>') + '</div>';
                container.innerHTML = html;
                if (typeof highlightWiki === 'function') highlightWiki(container);
                // wire tag clicks
                container.querySelectorAll('.wiki-tag').forEach(function (el) {
                    el.addEventListener('click', function (e) {
                        e.preventDefault();
                        var t = new URL(el.href).searchParams.get('tag');
                        renderIndex(articles, t);
                        history.pushState(null, '', '/wiki?tag=' + encodeURIComponent(t));
                    });
                });
            })
            .catch(function () {
                container.innerHTML = '<p>article not found.</p>';
            });
    }

    function renderIndex(articles, filterTag) {
        var filtered = filterTag
            ? articles.filter(function (a) { return a.tags.indexOf(filterTag) !== -1; })
            : articles;

        // group by category
        var groups = {};
        filtered.forEach(function (a) {
            if (!groups[a.category]) groups[a.category] = [];
            groups[a.category].push(a);
        });

        var html = '';
        if (filterTag) {
            html += '<p class="wiki-filter-note">tag: <span class="wiki-tag">' + filterTag + '</span> <a href="/wiki">&times; clear</a></p>';
        }
        Object.keys(groups).sort().forEach(function (cat) {
            html += '<h2 class="wiki-cat-heading">' + cat + '</h2><ul class="wiki-index-list">';
            groups[cat].forEach(function (a) {
                var tags = a.tags.map(tagLink).join('');
                html += '<li><a class="wiki-article-link" href="/wiki#' + a.slug + '">' + a.title + '</a>';
                if (tags) html += ' <span class="wiki-tags">' + tags + '</span>';
                html += '</li>';
            });
            html += '</ul>';
        });
        if (!html) html = '<p>no articles found.</p>';
        container.innerHTML = html;

        // wire article links (hash nav)
        container.querySelectorAll('.wiki-article-link').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                var slug = new URL(el.href).hash.slice(1);
                history.pushState(null, '', '/wiki#' + slug);
                renderArticle(slug, articles);
            });
        });

        // wire tag clicks in index
        container.querySelectorAll('.wiki-tag[href]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                var t = new URL(el.href).searchParams.get('tag');
                renderIndex(articles, t);
                history.pushState(null, '', '/wiki?tag=' + encodeURIComponent(t));
            });
        });

        // clear filter link
        var clear = container.querySelector('.wiki-filter-note a');
        if (clear) {
            clear.addEventListener('click', function (e) {
                e.preventDefault();
                renderIndex(articles, null);
                history.pushState(null, '', '/wiki');
            });
        }
    }

    function route(articles) {
        var hash = location.hash.slice(1);
        var tag = new URLSearchParams(location.search).get('tag');
        if (hash) {
            renderArticle(hash, articles);
        } else {
            renderIndex(articles, tag);
        }
    }

    fetch(INDEX_URL)
        .then(function (r) { return r.json(); })
        .then(function (articles) {
            route(articles);
            window.addEventListener('hashchange', function () { route(articles); });
            window.addEventListener('popstate', function () { route(articles); });
        })
        .catch(function () {
            container.innerHTML = '<p>could not load wiki index.</p>';
        });
}());
