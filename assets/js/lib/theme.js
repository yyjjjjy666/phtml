(function(global) {
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

    function initializeTheme() {
        var btn = document.getElementById('theme-btn');
        if (!btn) return;
        // Remove old listener by cloning
        var newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function() {
            var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            applyTheme(next);
            // redraw wheel if on wheel page
            if (typeof drawWheel === 'function' && typeof currentRotation !== 'undefined') {
                drawWheel(currentRotation);
            }
            // refresh password meter if on password page
            var pw = document.getElementById('pw-result');
            if (pw && pw.value && typeof showPassword === 'function') {
                var bits = parseFloat(document.getElementById('pw-entropy-label').textContent) || 0;
                if (bits > 0) {
                    var bar = document.getElementById('pw-meter-bar');
                    var lbl = document.getElementById('pw-strength-label');
                    if (bar && lbl) {
                        var color = document.documentElement.dataset.theme === 'light'
                            ? (bits < 40 ? '#e07070' : bits < 60 ? '#e0a040' : bits < 80 ? '#059669' : '#7c3aed')
                            : (bits < 40 ? '#e07070' : bits < 60 ? '#e0a040' : bits < 80 ? '#80c070' : '#00ff88');
                        bar.style.backgroundColor = color;
                        lbl.style.color = color;
                    }
                }
            }
        });
    }

    applyTheme(getTheme());

    // Try binding immediately (navbar may already be loaded)
    if (document.getElementById('theme-btn')) {
        initializeTheme();
    } else {
        // Wait for DOM then try again (navbar loads async)
        document.addEventListener('DOMContentLoaded', function() {
            // Give navbar-loader a chance to inject first
            setTimeout(initializeTheme, 100);
        });
    }

    // Expose for navbar-loader to call after dynamic injection
    global.initializeTheme = initializeTheme;
    global.applyTheme = applyTheme;
})(window);
