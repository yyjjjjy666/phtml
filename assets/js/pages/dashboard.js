(function () {
    'use strict';

    // ======= Clock & Progress =======

    var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

    function isLeapYear(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

    function dayOfYear(d) {
        var start = new Date(d.getFullYear(), 0, 0);
        return Math.floor((d - start) / 86400000);
    }

    function tickClock() {
        var now = new Date();
        var timeEl = document.getElementById('dash-time');
        var dowEl = document.getElementById('dash-dow');
        var dateEl = document.getElementById('dash-date');
        if (timeEl) timeEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        if (dowEl) dowEl.textContent = DAYS[now.getDay()];
        if (dateEl) dateEl.textContent = now.getDate() + ' ' + MONTHS[now.getMonth()] + ' ' + now.getFullYear();
    }

    function setBar(barId, pctId, frac) {
        var p = Math.min(100, Math.max(0, frac * 100));
        var bar = document.getElementById(barId);
        var pctEl = document.getElementById(pctId);
        if (bar) bar.style.width = p.toFixed(1) + '%';
        if (pctEl) pctEl.textContent = p.toFixed(0) + '%';
    }

    function tickProgress() {
        var now = new Date();
        var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
        var secOfDay = h * 3600 + m * 60 + s;

        var dayFrac = secOfDay / 86400;

        var weekIdx = (now.getDay() + 6) % 7; // Mon=0
        var weekFrac = (weekIdx * 86400 + secOfDay) / (7 * 86400);

        var dim = daysInMonth(now.getFullYear(), now.getMonth());
        var monthFrac = ((now.getDate() - 1) * 86400 + secOfDay) / (dim * 86400);

        var doy = dayOfYear(now);
        var yearDays = isLeapYear(now.getFullYear()) ? 366 : 365;
        var yearFrac = doy / yearDays;

        setBar('prog-day', 'pct-day', dayFrac);
        setBar('prog-week', 'pct-week', weekFrac);
        setBar('prog-month', 'pct-month', monthFrac);
        setBar('prog-year', 'pct-year', yearFrac);
    }

    function tick() {
        tickClock();
        tickProgress();
    }

    // ======= Weather =======

    var WMO = {
        0:  { emoji: '☀️',  label: 'clear sky' },
        1:  { emoji: '🌤️', label: 'mainly clear' },
        2:  { emoji: '⛅',  label: 'partly cloudy' },
        3:  { emoji: '☁️',  label: 'overcast' },
        45: { emoji: '🌫️', label: 'foggy' },
        48: { emoji: '🌫️', label: 'icy fog' },
        51: { emoji: '🌦️', label: 'light drizzle' },
        53: { emoji: '🌦️', label: 'drizzle' },
        55: { emoji: '🌦️', label: 'heavy drizzle' },
        61: { emoji: '🌧️', label: 'light rain' },
        63: { emoji: '🌧️', label: 'rain' },
        65: { emoji: '🌧️', label: 'heavy rain' },
        71: { emoji: '🌨️', label: 'light snow' },
        73: { emoji: '🌨️', label: 'snow' },
        75: { emoji: '❄️',  label: 'heavy snow' },
        77: { emoji: '🌨️', label: 'snow grains' },
        80: { emoji: '🌦️', label: 'light showers' },
        81: { emoji: '🌧️', label: 'showers' },
        82: { emoji: '⛈️',  label: 'heavy showers' },
        85: { emoji: '🌨️', label: 'snow showers' },
        86: { emoji: '❄️',  label: 'heavy snow showers' },
        95: { emoji: '⛈️',  label: 'thunderstorm' },
        96: { emoji: '⛈️',  label: 'thunderstorm + hail' },
        99: { emoji: '⛈️',  label: 'heavy thunderstorm' }
    };

    function renderWeather(data) {
        var el = document.getElementById('dash-weather');
        if (!el) return;
        var cw = data.current_weather || {};
        var code = cw.weathercode;
        var wmo = WMO[code] || { emoji: '🌡️', label: 'unknown' };
        var temp = typeof cw.temperature === 'number' ? Math.round(cw.temperature) + '°C' : '—';
        var wind = typeof cw.windspeed === 'number' ? Math.round(cw.windspeed) + ' km/h' : '—';
        el.innerHTML =
            '<span id="dash-w-icon">' + wmo.emoji + '</span>' +
            '<span id="dash-w-temp">' + temp + '</span>' +
            '<span id="dash-w-desc">' + wmo.label + '</span>' +
            '<span id="dash-w-wind">💨 ' + wind + '</span>' +
            (data._city ? '<span id="dash-w-city">' + data._city + '</span>' : '');
    }

    function fetchWeather() {
        var el = document.getElementById('dash-weather');
        if (!el) return;

        var cached = sessionStorage.getItem('dashWeather');
        if (cached) {
            try { renderWeather(JSON.parse(cached)); return; } catch (e) { sessionStorage.removeItem('dashWeather'); }
        }

        el.textContent = 'loading weather...';

        fetch('https://ipapi.co/json/')
            .then(function (r) { return r.json(); })
            .then(function (geo) {
                var lat = geo.latitude, lon = geo.longitude, city = geo.city || '';
                return fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
                    '&longitude=' + lon + '&current_weather=true'
                )
                    .then(function (r) { return r.json(); })
                    .then(function (w) {
                        w._city = city;
                        sessionStorage.setItem('dashWeather', JSON.stringify(w));
                        renderWeather(w);
                    });
            })
            .catch(function () {
                var el2 = document.getElementById('dash-weather');
                if (el2) el2.textContent = 'weather unavailable';
            });
    }

    // ======= Search =======

    var ENGINES = {
        google:     'https://www.google.com/search?q=',
        startpage:  'https://www.startpage.com/sp/search?q=',
        duckduckgo: 'https://duckduckgo.com/?q='
    };

    function initSearch() {
        var engineSel = document.getElementById('dash-engine');
        var searchInput = document.getElementById('dash-search');
        var searchBtn = document.getElementById('dash-search-btn');
        if (!engineSel || !searchInput) return;

        var saved = localStorage.getItem('dashEngine');
        if (saved && ENGINES[saved]) engineSel.value = saved;

        engineSel.addEventListener('change', function () {
            localStorage.setItem('dashEngine', engineSel.value);
        });

        function doSearch() {
            var q = searchInput.value.trim();
            if (!q) return;
            var base = ENGINES[engineSel.value] || ENGINES.google;
            window.open(base + encodeURIComponent(q), '_blank');
        }

        if (searchBtn) searchBtn.addEventListener('click', doSearch);

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') doSearch();
            if (e.key === 'Escape') { searchInput.value = ''; searchInput.blur(); }
        });

        document.addEventListener('keydown', function (e) {
            if (
                e.key === '/' &&
                document.activeElement !== searchInput &&
                document.activeElement.tagName !== 'INPUT' &&
                document.activeElement.tagName !== 'TEXTAREA'
            ) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // ======= Tasks =======

    var tasks = [];

    function todayStr() {
        var d = new Date();
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    function loadTasks() {
        try { tasks = JSON.parse(localStorage.getItem('dashTasks')) || []; } catch (e) { tasks = []; }
        var today = todayStr();
        tasks = tasks.filter(function (t) { return !t.done || t.date === today; });
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('dashTasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        var ul = document.getElementById('dash-tasks');
        if (!ul) return;
        ul.innerHTML = '';
        tasks.forEach(function (t, i) {
            var li = document.createElement('li');
            li.className = 'dash-task-item' + (t.done ? ' dash-task-done' : '');
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = !!t.done;
            (function (idx) {
                cb.addEventListener('change', function () {
                    tasks[idx].done = cb.checked;
                    tasks[idx].date = todayStr();
                    saveTasks();
                    renderTasks();
                });
            }(i));
            var span = document.createElement('span');
            span.textContent = t.text;
            li.appendChild(cb);
            li.appendChild(span);
            ul.appendChild(li);
        });
    }

    function addTask(text) {
        if (!text) return;
        tasks.push({ text: text, done: false, date: todayStr() });
        saveTasks();
        renderTasks();
    }

    function initTasks() {
        loadTasks();
        renderTasks();
        var input = document.getElementById('dash-task-input');
        if (!input) return;
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && input.value.trim()) {
                addTask(input.value.trim());
                input.value = '';
            }
        });
    }

    // ======= Quick Links =======

    var links = [];
    var ctxTargetIdx = -1;

    function loadLinks() {
        try { links = JSON.parse(localStorage.getItem('dashLinks')) || []; } catch (e) { links = []; }
    }

    function saveLinks() {
        localStorage.setItem('dashLinks', JSON.stringify(links));
    }

    function hideCtxMenu() {
        var m = document.getElementById('dash-ctx-menu');
        if (m) m.classList.add('hidden');
        ctxTargetIdx = -1;
    }

    function renderLinks() {
        var container = document.getElementById('dash-links');
        if (!container) return;
        container.innerHTML = '';
        links.forEach(function (lnk, i) {
            var a = document.createElement('a');
            a.className = 'dash-link-tile';
            a.href = lnk.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = lnk.label;
            (function (idx) {
                a.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    ctxTargetIdx = idx;
                    var m = document.getElementById('dash-ctx-menu');
                    if (m) {
                        m.style.left = e.clientX + 'px';
                        m.style.top = e.clientY + 'px';
                        m.classList.remove('hidden');
                    }
                });
            }(i));
            container.appendChild(a);
        });
    }

    function initLinks() {
        loadLinks();
        renderLinks();

        var addBtn = document.getElementById('dash-link-add-btn');
        var form = document.getElementById('dash-link-form');
        var labelIn = document.getElementById('dash-link-label');
        var urlIn = document.getElementById('dash-link-url');
        var saveBtn = document.getElementById('dash-link-save');
        var cancelBtn = document.getElementById('dash-link-cancel');
        var ctxMenu = document.getElementById('dash-ctx-menu');
        var ctxRemove = document.getElementById('dash-ctx-remove');

        if (addBtn && form) {
            addBtn.addEventListener('click', function () {
                form.classList.toggle('hidden');
                if (!form.classList.contains('hidden') && labelIn) labelIn.focus();
            });
        }

        function submitLinkForm() {
            var label = labelIn ? labelIn.value.trim() : '';
            var url = urlIn ? urlIn.value.trim() : '';
            if (!label || !url) return;
            if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
            links.push({ label: label, url: url });
            saveLinks();
            renderLinks();
            if (form) form.classList.add('hidden');
            if (labelIn) labelIn.value = '';
            if (urlIn) urlIn.value = '';
        }

        if (saveBtn) saveBtn.addEventListener('click', submitLinkForm);
        if (urlIn) urlIn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') submitLinkForm();
            if (e.key === 'Escape' && form) form.classList.add('hidden');
        });
        if (labelIn) labelIn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && urlIn) urlIn.focus();
            if (e.key === 'Escape' && form) form.classList.add('hidden');
        });
        if (cancelBtn) cancelBtn.addEventListener('click', function () {
            if (form) form.classList.add('hidden');
        });

        if (ctxRemove) ctxRemove.addEventListener('click', function () {
            if (ctxTargetIdx >= 0) {
                links.splice(ctxTargetIdx, 1);
                saveLinks();
                renderLinks();
            }
            hideCtxMenu();
        });

        document.addEventListener('click', function (e) {
            if (ctxMenu && !ctxMenu.contains(e.target)) hideCtxMenu();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') hideCtxMenu();
        });
    }

    // ======= Intention =======

    function initIntention() {
        var input = document.getElementById('dash-intention');
        if (!input) return;
        var key = 'dashIntention_' + todayStr();
        input.value = localStorage.getItem(key) || '';

        function save() { localStorage.setItem(key, input.value); }
        input.addEventListener('blur', save);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { save(); input.blur(); }
        });
    }

    // ======= Quote =======

    var QUOTES = [
        { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
        { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
        { text: 'Everything you\'ve ever wanted is on the other side of fear.', author: 'George Addair' },
        { text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
        { text: 'Hardships often prepare ordinary people for an extraordinary destiny.', author: 'C.S. Lewis' },
        { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
        { text: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis' },
        { text: 'To see what is right and not do it is a lack of courage.', author: 'Confucius' },
        { text: 'Reading is to the mind what exercise is to the body.', author: 'Joseph Addison' },
        { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
        { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
        { text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
        { text: 'You miss 100% of the shots you don\'t take.', author: 'Wayne Gretzky' },
        { text: 'Whether you think you can or think you can\'t, you\'re right.', author: 'Henry Ford' },
        { text: 'I am not a product of my circumstances. I am a product of my decisions.', author: 'Stephen Covey' },
        { text: 'Every child is an artist. The problem is how to remain an artist once we grow up.', author: 'Pablo Picasso' },
        { text: 'You can never cross the ocean until you have the courage to lose sight of the shore.', author: 'Christopher Columbus' },
        { text: 'I\'ve learned that people will never forget how you made them feel.', author: 'Maya Angelou' },
        { text: 'Either you run the day, or the day runs you.', author: 'Jim Rohn' },
        { text: 'Twenty years from now you will be more disappointed by the things you didn\'t do.', author: 'Mark Twain' },
        { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
        { text: 'If life were predictable it would cease to be life and be without flavor.', author: 'Eleanor Roosevelt' },
        { text: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.', author: 'Mother Teresa' },
        { text: 'Don\'t judge each day by the harvest you reap but by the seeds that you plant.', author: 'Robert Louis Stevenson' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
        { text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
        { text: 'It always seems impossible until it\'s done.', author: 'Nelson Mandela' },
        { text: 'Do not go where the path may lead; go instead where there is no path and leave a trail.', author: 'Ralph Waldo Emerson' },
        { text: 'You only live once, but if you do it right, once is enough.', author: 'Mae West' },
        { text: 'Be yourself; everyone else is already taken.', author: 'Oscar Wilde' }
    ];

    function getDailyQuoteIdx() {
        var today = todayStr();
        var override = null;
        try { override = JSON.parse(localStorage.getItem('dashQuoteOverride')); } catch (e) {}
        if (override && override.date === today && typeof override.index === 'number') {
            return override.index;
        }
        var d = new Date();
        var start = new Date(d.getFullYear(), 0, 0);
        var doy = Math.floor((d - start) / 86400000);
        return doy % QUOTES.length;
    }

    function renderQuote(idx) {
        var q = QUOTES[Math.abs(idx) % QUOTES.length];
        var qEl = document.getElementById('dash-quote');
        var aEl = document.getElementById('dash-quote-author');
        if (qEl) qEl.textContent = '\u201c' + q.text + '\u201d';
        if (aEl) aEl.textContent = '\u2014 ' + q.author;
    }

    function initQuote() {
        renderQuote(getDailyQuoteIdx());
        var btn = document.getElementById('dash-quote-refresh');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var current = getDailyQuoteIdx();
            var next = (current + 1 + Math.floor(Math.random() * (QUOTES.length - 1))) % QUOTES.length;
            localStorage.setItem('dashQuoteOverride', JSON.stringify({ date: todayStr(), index: next }));
            renderQuote(next);
        });
    }

    // ======= Init =======

    document.addEventListener('DOMContentLoaded', function () {
        tick();
        setInterval(tick, 1000);
        fetchWeather();
        initSearch();
        initTasks();
        initLinks();
        initIntention();
        initQuote();
    });

}());
