function val(v) {
    if (v === null || v === undefined || v === '') return '—';
    return String(v);
}

function renderResults(d) {
    var sections = [
        {
            title: 'network',
            fields: [
                ['ip address', val(d.ip)],
                ['ip version', val(d.version)],
                ['asn', val(d.asn)],
                ['organisation', val(d.org)]
            ]
        },
        {
            title: 'location',
            fields: [
                ['city', val(d.city)],
                ['region', val(d.region)],
                ['region code', val(d.region_code)],
                ['country', val(d.country_name)],
                ['country code (iso2)', val(d.country_code)],
                ['country code (iso3)', val(d.country_code_iso3)],
                ['continent', val(d.continent_code)],
                ['postal code', val(d.postal)],
                ['capital', val(d.country_capital)],
                ['in eu', d.in_eu === true ? 'yes' : d.in_eu === false ? 'no' : '—']
            ]
        },
        {
            title: 'time',
            fields: [
                ['timezone', val(d.timezone)],
                ['utc offset', val(d.utc_offset)],
                ['calling code', val(d.country_calling_code)]
            ]
        },
        {
            title: 'economy',
            fields: [
                ['currency', val(d.currency)],
                ['currency name', val(d.currency_name)],
                ['languages', val(d.languages)],
                ['population', d.country_population ? Number(d.country_population).toLocaleString() : '—'],
                ['area (km²)', d.country_area ? Number(d.country_area).toLocaleString() : '—']
            ]
        },
        {
            title: 'coordinates',
            fields: [
                ['latitude', val(d.latitude)],
                ['longitude', val(d.longitude)]
            ]
        }
    ];

    var html = '';
    sections.forEach(function(s) {
        html += '<div class="ip-section"><h3>' + s.title + '</h3><dl class="ip-dl">';
        s.fields.forEach(function(f) {
            html += '<dt>' + f[0] + '</dt><dd>' + f[1] + '</dd>';
        });
        html += '</dl></div>';
    });
    return html;
}

function lookup(ip) {
    var statusEl = document.getElementById('ip-status');
    var resultsEl = document.getElementById('ip-results');
    var url = ip ? 'https://ipapi.co/' + encodeURIComponent(ip) + '/json/' : 'https://ipapi.co/json/';

    statusEl.textContent = 'loading...';
    statusEl.className = '';
    resultsEl.innerHTML = '';

    fetch(url)
        .then(function(res) {
            if (!res.ok) throw new Error('http ' + res.status);
            return res.json();
        })
        .then(function(data) {
            if (data.error) throw new Error(data.reason || 'api error');
            statusEl.textContent = '';
            resultsEl.innerHTML = renderResults(data);
        })
        .catch(function(err) {
            statusEl.textContent = 'error: ' + err.message;
            statusEl.className = 'error';
            resultsEl.innerHTML = '';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('ip-input');
    var btn = document.getElementById('ip-lookup-btn');

    btn.addEventListener('click', function() {
        lookup(input.value.trim());
    });
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') lookup(input.value.trim());
    });

    lookup('');
});
