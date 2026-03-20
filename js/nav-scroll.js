(function() {
    if (!window.matchMedia('(max-width: 600px)').matches) return;
    var nav = document.querySelector('.navbar');
    if (!nav) return;

    // Compensate for fixed nav taking the nav out of flow
    document.body.style.paddingTop = nav.offsetHeight + 'px';

    // Hamburger toggle
    var btn = document.getElementById('nav-toggle');
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var open = nav.classList.toggle('nav-open');
            btn.textContent = open ? '\u2715' : '\u2630';
            nav.classList.remove('nav-hidden');
            // Update body padding since nav height changes when open
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        });

        // Close on outside click
        document.addEventListener('click', function() {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                btn.textContent = '\u2630';
                document.body.style.paddingTop = nav.offsetHeight + 'px';
            }
        });
    }

    // Scroll-hide (suppressed when menu is open)
    var lastY = window.scrollY;
    window.addEventListener('scroll', function() {
        if (nav.classList.contains('nav-open')) return;
        var y = window.scrollY;
        if (y > lastY + 10 && y > 50) {
            nav.classList.add('nav-hidden');
        } else if (y < lastY) {
            nav.classList.remove('nav-hidden');
        }
        lastY = y;
    }, { passive: true });

    window.addEventListener('resize', function() {
        if (!window.matchMedia('(max-width: 600px)').matches) {
            nav.classList.remove('nav-hidden');
            nav.classList.remove('nav-open');
            document.body.style.paddingTop = '';
        } else {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        }
    });
})();
