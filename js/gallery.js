const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
}

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});
