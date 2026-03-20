var items = [];
var isSpinning = false;
var currentRotation = 0;

var COLORS_DARK  = ['#e0ff03','#7c3aed','#ef4444','#3b82f6','#10b981','#f97316','#ec4899','#06b6d4','#84cc16','#a855f7'];
var COLORS_LIGHT = ['#7c3aed','#1565c0','#c62828','#2e7d32','#ef6c00','#00838f','#ad1457','#4527a0','#558b2f','#00695c'];

var MAX_ITEMS = 20;
var MAX_LABEL_CHARS = 12;

function getColors() {
    return document.documentElement.dataset.theme === 'light' ? COLORS_LIGHT : COLORS_DARK;
}

function textColorFor(bgColor) {
    // #e0ff03 is bright yellow — use black text; everything else white
    return bgColor === '#e0ff03' ? '#000000' : '#ffffff';
}

function truncate(label) {
    return label.length > MAX_LABEL_CHARS ? label.slice(0, MAX_LABEL_CHARS) + '…' : label;
}

function addItem(label) {
    label = label.trim();
    if (!label) return false;
    if (items.length >= MAX_ITEMS) return false;
    items.push(label);
    return true;
}

function removeItem(index) {
    items.splice(index, 1);
}

function drawWheel(rotation) {
    var canvas = document.getElementById('wheel-canvas');
    var ctx = canvas.getContext('2d');
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var r = Math.min(cx, cy) - 10;
    var isLight = document.documentElement.dataset.theme === 'light';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (items.length === 0) {
        ctx.fillStyle = isLight ? '#f0edf8' : '#383838';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isLight ? '#888' : '#666';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('add items to spin', cx, cy);
    } else {
        var colors = getColors();
        var segAngle = (Math.PI * 2) / items.length;
        for (var i = 0; i < items.length; i++) {
            var startAngle = rotation + i * segAngle - Math.PI / 2;
            var endAngle = startAngle + segAngle;
            var color = colors[i % colors.length];

            // segment
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = isLight ? '#f5f5f0' : '#2C2C2C';
            ctx.lineWidth = 2;
            ctx.stroke();

            // label
            var midAngle = startAngle + segAngle / 2;
            var labelR = r * 0.62;
            var lx = cx + labelR * Math.cos(midAngle);
            var ly = cy + labelR * Math.sin(midAngle);

            ctx.save();
            ctx.translate(lx, ly);
            ctx.rotate(midAngle + Math.PI / 2);
            ctx.fillStyle = textColorFor(color);
            ctx.font = 'bold 13px Courier New';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(truncate(items[i]), 0, 0);
            ctx.restore();
        }
    }

    // pointer triangle at top
    var px = cx;
    var py = cy - r - 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px - 10, py - 18);
    ctx.lineTo(px + 10, py - 18);
    ctx.closePath();
    ctx.fillStyle = isLight ? '#7c3aed' : '#e0ff03';
    ctx.fill();
}

function spin() {
    if (isSpinning) return;
    if (items.length < 2) {
        document.getElementById('wheel-msg').textContent = 'add at least 2 items to spin';
        return;
    }
    document.getElementById('wheel-msg').textContent = '';
    document.getElementById('result').textContent = '';

    var rawDuration = parseFloat(document.getElementById('duration-input').value);
    var duration = Math.max(1, Math.min(60, isNaN(rawDuration) ? 5 : rawDuration)) * 1000;

    var winnerIndex = Math.floor(Math.random() * items.length);
    var segAngle = (Math.PI * 2) / items.length;

    // land pointer at center of winner segment + random jitter within segment
    var jitter = (Math.random() - 0.5) * segAngle * 0.7;
    var targetOffset = -(winnerIndex + 0.5) * segAngle + jitter;

    // add extra full spins for visual effect
    var extraSpins = Math.PI * 2 * (5 + Math.floor(Math.random() * 5));
    var totalRotation = currentRotation + extraSpins + targetOffset - (currentRotation % (Math.PI * 2));

    isSpinning = true;
    document.getElementById('spin-btn').disabled = true;

    var startRotation = currentRotation;
    var startTime = null;

    function easeOut(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function frame(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var easedProgress = easeOut(progress);

        currentRotation = startRotation + (totalRotation - startRotation) * easedProgress;
        drawWheel(currentRotation);

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            isSpinning = false;
            document.getElementById('spin-btn').disabled = false;
            document.getElementById('result').textContent = '→ ' + items[winnerIndex];
        }
    }

    requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('item-input');
    var addBtn = document.getElementById('add-btn');
    var list = document.getElementById('ul-items');
    var spinBtn = document.getElementById('spin-btn');

    function renderList() {
        list.innerHTML = '';
        items.forEach(function (item, i) {
            var li = document.createElement('li');
            var span = document.createElement('span');
            span.textContent = item;
            var btn = document.createElement('button');
            btn.textContent = 'remove';
            btn.className = 'wheel-btn-sm';
            btn.addEventListener('click', function () {
                removeItem(i);
                renderList();
                drawWheel(currentRotation);
                document.getElementById('result').textContent = '';
                addBtn.disabled = items.length >= MAX_ITEMS;
            });
            li.appendChild(span);
            li.appendChild(btn);
            list.appendChild(li);
        });
        addBtn.disabled = items.length >= MAX_ITEMS;
    }

    function doAdd() {
        if (addItem(input.value)) {
            input.value = '';
            renderList();
            drawWheel(currentRotation);
            document.getElementById('wheel-msg').textContent = '';
            document.getElementById('result').textContent = '';
        }
        input.focus();
    }

    addBtn.addEventListener('click', doAdd);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doAdd();
    });

    spinBtn.addEventListener('click', spin);

    function resizeCanvas() {
        var canvas = document.getElementById('wheel-canvas');
        if (window.matchMedia('(max-width: 600px)').matches) {
            var size = canvas.parentElement.offsetWidth || 300;
            canvas.width = size;
            canvas.height = size;
        }
    }

    resizeCanvas();
    drawWheel(0);

    window.addEventListener('resize', function() {
        resizeCanvas();
        drawWheel(currentRotation);
    });
});
