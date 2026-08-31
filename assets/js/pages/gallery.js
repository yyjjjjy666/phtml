const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Accepts the thumbnail <img> so its alt text carries over to the lightbox.
// A bare src string still works, for older call sites.
function openLightbox(el) {
    const img = typeof el === 'string' ? { src: el, alt: '' } : el;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    lightboxImg.alt = '';
}

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});
