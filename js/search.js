(function () {
    var PAGES = [
        { title: 'main page', url: '/', type: 'page', tags: [] },
        { title: 'wiki', url: '/wiki', type: 'page', tags: ['wiki', 'docs', 'notes'] },
        { title: 'gallery', url: '/gallery', type: 'page', tags: ['photos', 'images'] },
        { title: 'tools hub', url: '/tools', type: 'page', tags: ['tools', 'utilities'] },
        { title: 'wheel', url: '/tools/wheel', type: 'tool', tags: ['fortune', 'random', 'spin'] },
        { title: 'password generator', url: '/tools/password', type: 'tool', tags: ['password', 'passphrase', 'security'] },
        { title: 'ip lookup', url: '/tools/ip', type: 'tool', tags: ['ip', 'network', 'geolocation'] },
        { title: 'contact', url: '/contact', type: 'page', tags: [] },
    ];

    var input = document.getElementById('search-q');
    var resultsList = document.getElementById('search-results');

    function score(item, q) {
        var ql = q.toLowerCase();
        var tl = item.title.toLowerCase();
        if (tl === ql) return 100;
        if (tl.startsWith(ql)) return 80;
        if (tl.indexOf(ql) !== -1) return 60;
        if (item.tags.some(function (t) { return t.indexOf(ql) !== -1; })) return 40;
        return 0;
    }

    function render(items, q) {
        var scored = items
            .map(function (it) { return { item: it, s: score(it, q) }; })
            .filter(function (x) { return x.s > 0; })
            .sort(function (a, b) { return b.s - a.s; });

        resultsList.innerHTML = '';
        if (!q.trim()) return;

        if (!scored.length) {
            resultsList.innerHTML = '<li class="sr-none">no results for "' + q + '"</li>';
            return;
        }

        scored.forEach(function (x) {
            var it = x.item;
            var tags = it.tags.map(function (t) {
                return '<span class="wiki-tag">' + t + '</span>';
            }).join('');
            var li = document.createElement('li');
            li.innerHTML = '<div class="sr-title"><a href="' + it.url + '">' + it.title + '</a></div>'
                + '<div class="sr-meta"><span class="sr-badge">' + it.type + '</span>' + tags + '</div>';
            resultsList.appendChild(li);
        });
    }

    function run(q) {
        fetch('/wiki/content/index.json')
            .then(function (r) { return r.json(); })
            .then(function (articles) {
                var all = PAGES.concat(articles.map(function (a) {
                    return { title: a.title, url: '/wiki#' + a.slug, type: 'wiki', tags: a.tags };
                }));
                render(all, q);
            })
            .catch(function () { render(PAGES, q); });
    }

    function getQ() {
        return new URLSearchParams(location.search).get('q') || '';
    }

    function setQ(q) {
        var url = q ? '/search?q=' + encodeURIComponent(q) : '/search';
        history.pushState(null, '', url);
        run(q);
    }

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setQ(input.value.trim());
        }
    });

    window.addEventListener('popstate', function () {
        var q = getQ();
        input.value = q;
        run(q);
    });

    // initial load
    var q = getQ();
    input.value = q;
    if (q) run(q);
    input.focus();
}());
