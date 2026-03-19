document.addEventListener('DOMContentLoaded', function () {
    const ipEl = document.getElementById('visitor-ip');
    const locEl = document.getElementById('visitor-location');
    const orgEl = document.getElementById('visitor-org');

    if (!ipEl || !locEl || !orgEl) return;

    ipEl.textContent = 'loading...';
    locEl.textContent = '';
    orgEl.textContent = '';

    function populate(data) {
        ipEl.textContent = 'ip: ' + data.ip;
        locEl.textContent = [data.city, data.country].filter(Boolean).join(', ') || '';
        orgEl.textContent = data.org || '';
    }

    var cached = sessionStorage.getItem('visitorInfo');
    if (cached) {
        populate(JSON.parse(cached));
        return;
    }

    fetch('https://ipwho.is/')
        .then(function (res) {
            if (!res.ok) throw new Error('non-ok response');
            return res.json();
        })
        .then(function (data) {
            if (!data.success) throw new Error('api error');
            sessionStorage.setItem('visitorInfo', JSON.stringify(data));
            populate(data);
        })
        .catch(function () {
            ipEl.textContent = 'ip info unavailable';
            locEl.textContent = '';
            orgEl.textContent = '';
        });
});
