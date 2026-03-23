(function () {
    var PAGES = [
        { label: 'main page', url: '/', type: 'page' },
        { label: 'wiki', url: '/wiki', type: 'page' },
        { label: 'gallery', url: '/gallery', type: 'page' },
        { label: 'tools', url: '/tools', type: 'page' },
        { label: 'tool: wheel', url: '/tools/wheel', type: 'tool' },
        { label: 'tool: password generator', url: '/tools/password', type: 'tool' },
        { label: 'tool: ip lookup', url: '/tools/ip', type: 'tool' },
        { label: 'contact', url: '/contact', type: 'page' },
        { label: 'search', url: '/search', type: 'page' },
    ];

    var items = PAGES.slice();
    var overlay, input, resultsList;
    var activeIdx = -1;
    var wikiLoaded = false;

    function loadWikiItems() {
        if (wikiLoaded) return Promise.resolve();
        wikiLoaded = true;
        return fetch('/wiki/content/index.json')
            .then(function (r) { return r.json(); })
            .then(function (articles) {
                articles.forEach(function (a) {
                    items.push({ label: a.title, url: '/wiki#' + a.slug, type: 'wiki' });
                });
            })
            .catch(function () {});
    }

    function buildDOM() {
        overlay = document.createElement('div');
        overlay.id = 'cmd-overlay';
        overlay.className = 'hidden';

        var panel = document.createElement('div');
        panel.id = 'cmd-panel';

        input = document.createElement('input');
        input.id = 'cmd-input';
        input.type = 'text';
        input.placeholder = 'go to... (type to filter, Enter to open)';
        input.autocomplete = 'off';
        input.spellcheck = false;

        resultsList = document.createElement('ul');
        resultsList.id = 'cmd-results';

        panel.appendChild(input);
        panel.appendChild(resultsList);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        // close on backdrop click (not panel)
        overlay.addEventListener('mousedown', function (e) {
            if (e.target === overlay) close();
        });

        input.addEventListener('input', function () {
            render(input.value.trim());
        });

        input.addEventListener('keydown', function (e) {
            var items = resultsList.querySelectorAll('li[data-url]');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIdx = Math.min(activeIdx + 1, items.length - 1);
                highlight(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIdx = Math.max(activeIdx - 1, 0);
                highlight(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                var q = input.value.trim();
                if (activeIdx >= 0 && items[activeIdx]) {
                    navigate(items[activeIdx].dataset.url);
                } else if (q) {
                    navigate('/search?q=' + encodeURIComponent(q));
                }
            } else if (e.key === 'Escape') {
                close();
            }
        });
    }

    function highlight(lis) {
        Array.prototype.forEach.call(lis, function (li, i) {
            li.classList.toggle('cmd-active', i === activeIdx);
        });
    }

    function render(query) {
        activeIdx = -1;
        var filtered = query
            ? items.filter(function (it) { return it.label.toLowerCase().indexOf(query.toLowerCase()) !== -1; })
            : items;

        resultsList.innerHTML = '';

        if (!filtered.length) {
            var empty = document.createElement('li');
            empty.id = 'cmd-empty';
            empty.textContent = query ? 'no matches — press Enter to search' : 'no items';
            resultsList.appendChild(empty);
            return;
        }

        filtered.slice(0, 12).forEach(function (it) {
            var li = document.createElement('li');
            li.dataset.url = it.url;
            li.innerHTML = '<span class="cmd-type">' + it.type + '</span><span class="cmd-label">' + it.label + '</span>';
            li.addEventListener('click', function () { navigate(it.url); });
            resultsList.appendChild(li);
        });
    }

    function navigate(url) {
        close();
        window.location.href = url;
    }

    function open() {
        if (!overlay) buildDOM();
        loadWikiItems().then(function () {
            overlay.classList.remove('hidden');
            input.value = '';
            activeIdx = -1;
            render('');
            input.focus();
        });
    }

    function close() {
        if (overlay) overlay.classList.add('hidden');
    }

    // global Ctrl+K / Cmd+K
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (overlay && !overlay.classList.contains('hidden')) {
                close();
            } else {
                open();
            }
        }
    });

    // wire trigger button in navbar
    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('palette-btn');
        if (btn) btn.addEventListener('click', open);
    });

    window.cmdPalette = { open: open, close: close };
}());
