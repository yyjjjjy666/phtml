(function () {
    var NAV_KEYS = {
        '1': '/',
        '2': '/wiki',
        '3': '/gallery',
        '4': '/tools',
        '5': '/contact'
    };
    document.addEventListener('keydown', function (e) {
        var tag = document.activeElement && document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var url = NAV_KEYS[e.key];
        if (url) {
            e.preventDefault();
            window.location.href = url;
        }
    });
}());
