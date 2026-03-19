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
        locEl.textContent = [data.city, data.country_name].filter(Boolean).join(', ') || '';
        orgEl.textContent = '';
    }

    var cached = sessionStorage.getItem('visitorInfo');
    if (cached) {
        var parsed = JSON.parse(cached);
        if (parsed.ip) {
            populate(parsed);
            return;
        }
        sessionStorage.removeItem('visitorInfo');
    }

    fetch('https://ipapi.co/json/')
        .then(function (res) {
            if (!res.ok) throw new Error('non-ok response');
            return res.json();
        })
        .then(function (data) {
            if (!data.ip) throw new Error('api error');
            sessionStorage.setItem('visitorInfo', JSON.stringify(data));
            populate(data);
        })
        .catch(function () {
            ipEl.textContent = 'ip info unavailable';
            locEl.textContent = '';
            orgEl.textContent = '';
        });
});
