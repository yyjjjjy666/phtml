(function() {
    function getTheme() {
        var saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    var PRISM_DARK  = 'https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-one-dark.min.css';
    var PRISM_LIGHT = 'https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-one-light.min.css';

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        var prismLink = document.getElementById('prism-theme');
        if (prismLink) {
            prismLink.href = theme === 'light' ? PRISM_LIGHT : PRISM_DARK;
        }
    }

    applyTheme(getTheme());

    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('theme-btn');
        if (!btn) return;
        btn.addEventListener('click', function() {
            var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            applyTheme(next);
            // redraw wheel if on wheel page
            if (typeof drawWheel === 'function') drawWheel(typeof currentRotation !== 'undefined' ? currentRotation : 0);
            // refresh password meter colors if on password page
            var pw = document.getElementById('pw-result');
            if (pw && pw.value && typeof showPassword === 'function') {
                var bits = parseFloat(document.getElementById('pw-entropy-label').textContent) || 0;
                if (bits > 0) {
                    var bar = document.getElementById('pw-meter-bar');
                    var lbl = document.getElementById('pw-strength-label');
                    if (bar && lbl) {
                        var color = document.documentElement.dataset.theme === 'light'
                            ? (bits < 40 ? '#e07070' : bits < 60 ? '#e0a040' : bits < 80 ? '#059669' : '#7c3aed')
                            : (bits < 40 ? '#e07070' : bits < 60 ? '#e0a040' : bits < 80 ? '#80c070' : '#e0ff03');
                        bar.style.backgroundColor = color;
                        lbl.style.color = color;
                    }
                }
            }
        });
    });
})();
