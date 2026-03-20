(function() {
    if (!window.matchMedia('(max-width: 600px)').matches) return;
    var nav = document.querySelector('.navbar');
    if (!nav) return;

    // Compensate for fixed nav taking the nav out of flow
    document.body.style.paddingTop = nav.offsetHeight + 'px';

    var lastY = window.scrollY;
    window.addEventListener('scroll', function() {
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
            document.body.style.paddingTop = '';
        } else {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        }
    });
})();
