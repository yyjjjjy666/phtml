(function () {
    var btn = document.getElementById('scroll-top-btn');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 300);
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}());
