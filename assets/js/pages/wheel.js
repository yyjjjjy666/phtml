// Enhanced Fortune Wheel with weights, sounds, confetti, and better visuals
class FortuneWheel {
    constructor() {
        this.items = [];
        this.isSpinning = false;
        this.currentRotation = 0;
        this.maxItems = 30;
        this.soundEnabled = localStorage.getItem('wheelSoundEnabled') !== 'false';
        this.audioContext = null;
        this.confettiCanvas = null;
        this.confettiCtx = null;
        this.confettiParticles = [];

        // Initialize audio context on user interaction
        this.initAudioContext = this.initAudioContext.bind(this);
        document.addEventListener('click', this.initAudioContext, { once: true });
        document.addEventListener('keydown', this.initAudioContext, { once: true });

        this.loadItems();
        this.setupEventListeners();
        this.setupConfettiCanvas();
        this.renderItemList();
        this.drawWheel();
    }

    // Load items from localStorage
    loadItems() {
        try {
            const stored = localStorage.getItem('wheelItems');
            if (stored) {
                this.items = JSON.parse(stored);
                // Ensure all items have weight property
                this.items = this.items.map(item => ({
                    label: typeof item === 'string' ? item : item.label,
                    weight: (typeof item === 'string' || !item.weight) ? 1 : item.weight
                }));
            }
        } catch (e) {
            console.warn('Failed to load wheel items:', e);
            this.items = [];
        }
    }

    // Save items to localStorage
    saveItems() {
        try {
            localStorage.setItem('wheelItems', JSON.stringify(this.items));
        } catch (e) {
            console.warn('Failed to save wheel items:', e);
        }
    }

    // Initialize Web Audio Context
    initAudioContext() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.warn('Web Audio not supported:', e);
            }
        }
    }

    // Play tick sound
    playTick() {
        if (!this.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.type = 'square';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.05);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }

    // Play result chime
    playChime() {
        if (!this.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        } catch (e) {
            console.warn('Chime playback failed:', e);
        }
    }

    // Setup confetti canvas
    setupConfettiCanvas() {
        const wheelCanvas = document.getElementById('wheel-canvas');
        const container = wheelCanvas.parentElement;

        this.confettiCanvas = document.createElement('canvas');
        this.confettiCanvas.id = 'confetti-canvas';
        this.confettiCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 100;
        `;

        container.style.position = 'relative';
        container.appendChild(this.confettiCanvas);
        this.confettiCtx = this.confettiCanvas.getContext('2d');

        // Size confetti canvas to match wheel canvas
        this.confettiCanvas.width = wheelCanvas.width;
        this.confettiCanvas.height = wheelCanvas.height;
    }

    // Generate segment colors using HSL
    generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360) / count;
            const isLight = document.documentElement.dataset.theme === 'light';
            const saturation = isLight ? 70 : 85;
            const lightness = isLight ? 55 : 65;
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
    }

    // Calculate total weight
    getTotalWeight() {
        return this.items.reduce((sum, item) => sum + item.weight, 0);
    }

    // Calculate probability for an item
    getItemProbability(weight) {
        const total = this.getTotalWeight();
        return total > 0 ? Math.round((weight / total) * 100) : 0;
    }

    // Add new item
    addItem(label, weight = 1) {
        label = label.trim();
        if (!label) return false;
        if (this.items.length >= this.maxItems) return false;

        weight = Math.max(1, Math.min(99, parseInt(weight) || 1));
        this.items.push({ label, weight });
        this.saveItems();
        return true;
    }

    // Remove item
    removeItem(index) {
        this.items.splice(index, 1);
        this.saveItems();
    }

    // Clear all items
    clearAll() {
        this.items = [];
        this.saveItems();
        this.renderItemList();
        this.drawWheel();
        document.getElementById('result').textContent = '';
        document.getElementById('wheel-msg').textContent = '';
    }

    // Load preset
    loadPreset(presetKey) {
        const presets = {
            'yes-no': {
                label: 'Yes / No',
                items: [
                    { label: 'Yes', weight: 1 },
                    { label: 'No', weight: 1 }
                ]
            },
            'truth-dare': {
                label: 'Truth or Dare',
                items: [
                    { label: 'Truth', weight: 1 },
                    { label: 'Dare', weight: 1 }
                ]
            },
            'eat': {
                label: 'What to eat?',
                items: [
                    { label: 'Pizza', weight: 3 },
                    { label: 'Sushi', weight: 2 },
                    { label: 'Burger', weight: 2 },
                    { label: 'Salad', weight: 1 },
                    { label: 'Pasta', weight: 2 }
                ]
            },
            'movie': {
                label: 'Movie night',
                items: [
                    { label: 'Action', weight: 2 },
                    { label: 'Comedy', weight: 2 },
                    { label: 'Sci-Fi', weight: 2 },
                    { label: 'Horror', weight: 1 },
                    { label: 'Drama', weight: 1 }
                ]
            },
        };

        const preset = presets[presetKey];
        if (preset) {
            this.items = [...preset.items];
            this.saveItems();
            this.renderItemList();
            this.drawWheel();
            document.getElementById('result').textContent = '';
            document.getElementById('wheel-msg').textContent = '';
        }
    }

    // Draw the wheel
    drawWheel(rotation = this.currentRotation) {
        const canvas = document.getElementById('wheel-canvas');
        const ctx = canvas.getContext('2d');
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = Math.min(cx, cy) - 20;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.items.length === 0) {
            this.drawEmptyWheel(ctx, cx, cy, r);
            return;
        }

        const colors = this.generateColors(this.items.length);
        const totalWeight = this.getTotalWeight();
        let currentAngle = rotation - Math.PI / 2;

        // Draw segments
        for (let i = 0; i < this.items.length; i++) {
            const weight = this.items[i].weight;
            const segmentAngle = (weight / totalWeight) * Math.PI * 2;
            const endAngle = currentAngle + segmentAngle;

            this.drawSegment(ctx, cx, cy, r, currentAngle, endAngle, colors[i], this.items[i].label);
            currentAngle = endAngle;
        }

        // Draw outer ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = document.documentElement.dataset.theme === 'light' ? '#333' : '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw center circle
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = document.documentElement.dataset.theme === 'light' ? '#333' : '#00d4ff';
        ctx.fill();

        // Draw center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = document.documentElement.dataset.theme === 'light' ? '#fff' : '#000';
        ctx.fill();

        // Draw pointer
        this.drawPointer(ctx, cx, cy, r);
    }

    // Draw empty wheel
    drawEmptyWheel(ctx, cx, cy, r) {
        const isLight = document.documentElement.dataset.theme === 'light';

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#f0edf8' : '#191a1b';
        ctx.fill();

        ctx.strokeStyle = isLight ? '#333' : '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = isLight ? '#888' : '#666';
        ctx.font = 'bold 16px Inter, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Add items to spin', cx, cy);
    }

    // Draw individual segment
    drawSegment(ctx, cx, cy, r, startAngle, endAngle, color, label) {
        // Create radial gradient
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, this.lightenColor(color, 20));
        gradient.addColorStop(1, color);

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add drop shadow effect
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.translate(2, 2);
        ctx.fill();
        ctx.restore();

        // Draw segment border
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.closePath();
        ctx.strokeStyle = document.documentElement.dataset.theme === 'light' ? '#fff' : '#08090a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const labelR = r * 0.7;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);

        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(midAngle + Math.PI / 2);
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.font = 'bold 14px Inter, JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const maxChars = 12;
        const displayLabel = label.length > maxChars ? label.slice(0, maxChars) + '…' : label;

        // Text with shadow for readability
        ctx.strokeText(displayLabel, 0, 0);
        ctx.fillText(displayLabel, 0, 0);
        ctx.restore();
    }

    // Draw pointer
    drawPointer(ctx, cx, cy, r) {
        const px = cx;
        const py = cy - r - 5;

        ctx.save();
        ctx.fillStyle = document.documentElement.dataset.theme === 'light' ? '#7c3aed' : '#00d4ff';
        ctx.strokeStyle = document.documentElement.dataset.theme === 'light' ? '#5b21b6' : '#0099bb';
        ctx.lineWidth = 2;

        // Draw chevron pointer
        ctx.beginPath();
        ctx.moveTo(px, py + 5);
        ctx.lineTo(px - 8, py - 10);
        ctx.lineTo(px - 4, py - 10);
        ctx.lineTo(px, py);
        ctx.lineTo(px + 4, py - 10);
        ctx.lineTo(px + 8, py - 10);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    // Lighten color utility
    lightenColor(color, percent) {
        // Convert HSL to lighter version
        const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (match) {
            const [, h, s, l] = match;
            const newL = Math.min(100, parseInt(l) + percent);
            return `hsl(${h}, ${s}%, ${newL}%)`;
        }
        return color;
    }

    // Create confetti
    createConfetti(centerX, centerY) {
        this.confettiParticles = [];
        const colors = this.generateColors(this.items.length);

        for (let i = 0; i < 80; i++) {
            this.confettiParticles.push({
                x: centerX + (Math.random() - 0.5) * 40,
                y: centerY + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12 - 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 4 + 2,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.01
            });
        }

        this.animateConfetti();
    }

    // Animate confetti
    animateConfetti() {
        const ctx = this.confettiCtx;
        ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        let activeParticles = 0;

        this.confettiParticles.forEach(particle => {
            if (particle.life <= 0) return;

            activeParticles++;

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.3; // gravity
            particle.life -= particle.decay;

            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            ctx.restore();
        });

        if (activeParticles > 0) {
            requestAnimationFrame(() => this.animateConfetti());
        }
    }

    // Flash winning segment
    flashWinner(winnerIndex) {
        let flashes = 0;
        const maxFlashes = 6;

        const flash = () => {
            if (flashes >= maxFlashes) return;

            // Get the wheel canvas and add/remove flash class
            const wheelContainer = document.getElementById('wheel-canvas').parentElement;

            if (flashes % 2 === 0) {
                wheelContainer.style.filter = 'brightness(1.3) saturate(1.2)';
            } else {
                wheelContainer.style.filter = '';
            }

            flashes++;
            setTimeout(flash, 150);
        };

        flash();
    }

    // Main spin function
    spin() {
        if (this.isSpinning) return;
        if (this.items.length < 2) {
            document.getElementById('wheel-msg').textContent = 'Add at least 2 items to spin';
            return;
        }

        document.getElementById('wheel-msg').textContent = '';
        document.getElementById('result').textContent = '';

        const rawDuration = parseFloat(document.getElementById('duration-input').value);
        const duration = Math.max(1, Math.min(60, isNaN(rawDuration) ? 5 : rawDuration)) * 1000;

        // Choose winner based on weights
        const totalWeight = this.getTotalWeight();
        const random = Math.random() * totalWeight;
        let currentWeight = 0;
        let winnerIndex = 0;

        for (let i = 0; i < this.items.length; i++) {
            currentWeight += this.items[i].weight;
            if (random <= currentWeight) {
                winnerIndex = i;
                break;
            }
        }

        // Calculate target rotation
        const weightSoFar = this.items.slice(0, winnerIndex).reduce((sum, item) => sum + item.weight, 0);
        const segmentStart = (weightSoFar / totalWeight) * Math.PI * 2;
        const segmentSize = (this.items[winnerIndex].weight / totalWeight) * Math.PI * 2;
        const segmentCenter = segmentStart + segmentSize / 2;
        const jitter = (Math.random() - 0.5) * segmentSize * 0.3;

        const targetOffset = -(segmentCenter + jitter);
        const extraSpins = Math.PI * 2 * (5 + Math.floor(Math.random() * 4));
        const totalRotation = this.currentRotation + extraSpins + targetOffset - (this.currentRotation % (Math.PI * 2));

        this.isSpinning = true;
        document.getElementById('spin-btn').disabled = true;
        document.getElementById('wheel-canvas').parentElement.classList.add('spinning');

        const startRotation = this.currentRotation;
        const startTime = performance.now();
        let lastTickTime = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Custom easing function
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            this.currentRotation = startRotation + (totalRotation - startRotation) * easedProgress;
            this.drawWheel();

            // Play tick sound based on rotation (pointer crossing segments)
            const rotationDiff = Math.abs(this.currentRotation - lastTickTime);
            if (rotationDiff > 0.2) { // Adjust threshold as needed
                this.playTick();
                lastTickTime = this.currentRotation;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.finishSpin(winnerIndex);
            }
        };

        requestAnimationFrame(animate);
    }

    // Finish spin animation
    finishSpin(winnerIndex) {
        this.isSpinning = false;
        document.getElementById('spin-btn').disabled = false;
        document.getElementById('wheel-canvas').parentElement.classList.remove('spinning');

        const winner = this.items[winnerIndex];
        document.getElementById('result').textContent = '🎉 ' + winner.label;

        // Play chime and create confetti
        this.playChime();
        this.flashWinner(winnerIndex);

        const canvas = document.getElementById('wheel-canvas');
        this.createConfetti(canvas.width / 2, canvas.height / 2);
    }

    // Render item list
    renderItemList() {
        const list = document.getElementById('item-list');
        list.innerHTML = '';

        if (this.items.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No items yet - add some above!';
            li.style.color = '#888';
            li.style.fontStyle = 'italic';
            list.appendChild(li);
            return;
        }

        this.items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'wheel-item';

            const span = document.createElement('span');
            span.textContent = item.label;
            span.className = 'item-label';

            const weightSpan = document.createElement('span');
            weightSpan.textContent = `weight: ${item.weight}`;
            weightSpan.className = 'item-weight';

            const probSpan = document.createElement('span');
            probSpan.textContent = `${this.getItemProbability(item.weight)}%`;
            probSpan.className = 'item-probability';

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.className = 'item-remove';
            removeBtn.onclick = () => {
                this.removeItem(index);
                this.renderItemList();
                this.drawWheel();
                document.getElementById('result').textContent = '';
            };

            li.appendChild(span);
            li.appendChild(weightSpan);
            li.appendChild(probSpan);
            li.appendChild(removeBtn);

            list.appendChild(li);
        });

        // Update add button state and item count
        document.getElementById('add-btn').disabled = this.items.length >= this.maxItems;
        document.getElementById('item-count').textContent = this.items.length;
    }

    // Setup event listeners
    setupEventListeners() {
        const input = document.getElementById('item-input');
        const weightInput = document.getElementById('weight-input');
        const addBtn = document.getElementById('add-btn');
        const spinBtn = document.getElementById('spin-btn');
        const clearBtn = document.getElementById('clear-btn');
        const soundToggle = document.getElementById('sound-toggle');
        const presetSelect = document.getElementById('preset-select');

        // Add item
        const doAdd = () => {
            const label = input.value.trim();
            const weight = parseInt(weightInput.value) || 1;

            if (this.addItem(label, weight)) {
                input.value = '';
                weightInput.value = '1';
                this.renderItemList();
                this.drawWheel();
                document.getElementById('result').textContent = '';
                document.getElementById('wheel-msg').textContent = '';
            }
            input.focus();
        };

        addBtn.addEventListener('click', doAdd);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doAdd();
        });

        // Spin
        spinBtn.addEventListener('click', () => this.spin());

        // Clear all
        clearBtn.addEventListener('click', () => {
            if (confirm('Clear all items?')) {
                this.clearAll();
            }
        });

        // Sound toggle
        soundToggle.addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            localStorage.setItem('wheelSoundEnabled', this.soundEnabled);
            soundToggle.textContent = this.soundEnabled ? '🔊' : '🔇';
        });

        // Initialize sound toggle
        soundToggle.textContent = this.soundEnabled ? '🔊' : '🔇';

        // Duration slider
        const durationInput = document.getElementById('duration-input');
        const durationDisplay = document.getElementById('duration-display');

        durationInput.addEventListener('input', (e) => {
            durationDisplay.textContent = e.target.value;
        });

        // Preset selection
        presetSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadPreset(e.target.value);
                e.target.value = '';
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.spin();
            } else if (e.key === 'Escape') {
                if (this.isSpinning) {
                    // Could implement stop functionality here
                } else {
                    document.getElementById('result').textContent = '';
                }
            }
        });

        // Canvas resize
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    // Resize canvas for responsiveness
    resizeCanvas() {
        const canvas = document.getElementById('wheel-canvas');
        const container = canvas.parentElement;

        if (window.matchMedia('(max-width: 768px)').matches) {
            const size = Math.min(container.offsetWidth - 40, 300);
            canvas.width = size;
            canvas.height = size;
        } else {
            canvas.width = 400;
            canvas.height = 400;
        }

        // Also resize confetti canvas
        if (this.confettiCanvas) {
            this.confettiCanvas.width = canvas.width;
            this.confettiCanvas.height = canvas.height;
        }

        this.drawWheel();
    }
}

// Initialize wheel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for navbar to load, then init wheel
    setTimeout(() => {
        window.wheel = new FortuneWheel();
    }, 100);
});