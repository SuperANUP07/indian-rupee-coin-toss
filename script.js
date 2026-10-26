/* ============================================================================
   RUPEE COIN TOSS APP - JavaScript
   ============================================================================ */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

class CoinTossApp {
    constructor() {
        // App State
        this.currentDenomination = '10';
        this.isAnimating = false;
        this.soundEnabled = true;
        this.isBatchTossing = false;
        this.currentAngle = 0; // Coin's current Y rotation in degrees

        // Statistics
        this.stats = {
            totalTosses: 0,
            headsCount: 0,
            tailsCount: 0,
            history: [],
            currentStreak: { type: null, count: 0 },
            longestStreak: { type: null, count: 0 }
        };

        // Load persisted stats
        this.loadStats();

        // DOM Elements
        this.coin = document.getElementById('coin');
        this.coinContainer = document.getElementById('coinContainer');
        this.coinShadow = document.getElementById('coinShadow');
        this.coinDenom = document.getElementById('coinDenom');
        this.tossBtn = document.getElementById('tossBtn');
        this.toss10Btn = document.getElementById('toss10Btn');
        this.resetBtn = document.getElementById('resetBtn');
        this.soundToggle = document.getElementById('soundToggle');
        this.resultDisplay = document.getElementById('resultDisplay');
        this.resultText = document.getElementById('resultText');
        this.resultValue = document.getElementById('resultValue');
        this.resultMessage = document.getElementById('resultMessage');

        // Initialize Event Listeners
        this.initializeEventListeners();
        this.updateStatistics();
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Toss buttons
        this.tossBtn.addEventListener('click', () => this.performToss());
        this.toss10Btn.addEventListener('click', () => this.perform10Tosses());

        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetStatistics());

        // Sound toggle
        this.soundToggle.addEventListener('click', () => this.toggleSound());

        // Stats toggle button (for mobile)
        const statsToggleBtn = document.querySelector('.btn-info');
        if (statsToggleBtn) {
            statsToggleBtn.addEventListener('click', () => this.toggleStats());
        }

        // Denomination buttons
        document.querySelectorAll('.denom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDenomination(e.target));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isAnimating) {
                e.preventDefault();
                this.performToss();
            }
        });
    }

    /**
     * Toggle statistics section visibility
     */
    toggleStats() {
        // Statistics are always rendered; this button scrolls to them on mobile
        const statsSection = document.querySelector('.stats-section');
        statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Select a coin denomination
     */
    selectDenomination(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.denom-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Update denomination
        this.currentDenomination = button.dataset.denom;
        this.coinDenom.textContent = this.currentDenomination;
    }

    /**
     * Toggle sound on/off
     */
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.soundToggle.classList.toggle('muted', !this.soundEnabled);
    }

    /**
     * Perform a single coin toss
     */
    async performToss() {
        if (this.isAnimating || this.isBatchTossing) return;

        this.isAnimating = true;
        this.tossBtn.disabled = true;
        this.toss10Btn.disabled = true;

        // Reset coin position
        this.coin.className = 'coin';
        this.coinShadow.className = 'coin-shadow inactive';

        // Generate random result
        const isHeads = Math.random() < 0.5;

        // Play toss sound
        this.playTossSound();

        // Animate shadow to active state
        setTimeout(() => {
            this.coinShadow.classList.remove('inactive');
            this.coinShadow.classList.add('active');
        }, 100);

        // Animate coin spinning
        await this.animateCoinSpin(isHeads);

        // Update statistics and display
        this.recordToss(isHeads);
        this.displayResult(isHeads);
        this.updateStatistics();

        // Play landing sound
        this.playLandingSound();

        // Reset animation state
        this.coinShadow.classList.remove('active');
        this.coinShadow.classList.add('inactive');
        this.isAnimating = false;
        this.tossBtn.disabled = false;
        this.toss10Btn.disabled = false;
    }

    /**
     * Perform 10 consecutive tosses with animation
     */
    async perform10Tosses() {
        if (this.isAnimating || this.isBatchTossing) return;

        this.isBatchTossing = true;
        this.tossBtn.disabled = true;
        this.toss10Btn.disabled = true;

        for (let i = 0; i < 10; i++) {
            this.isAnimating = true;

            // Reset coin
            this.coin.className = 'coin';
            this.coinShadow.className = 'coin-shadow inactive';

            // Generate result
            const isHeads = Math.random() < 0.5;

            // Play toss sound
            this.playTossSound();

            // Animate shadow
            setTimeout(() => {
                this.coinShadow.classList.remove('inactive');
                this.coinShadow.classList.add('active');
            }, 50);

            // Animate coin spin (shorter duration for batch)
            await this.animateCoinSpin(isHeads, 1.2);

            // Record and display
            this.recordToss(isHeads);
            this.displayResult(isHeads);
            this.updateStatistics();

            // Play landing sound
            this.playLandingSound();

            // Reset shadow
            this.coinShadow.classList.remove('active');
            this.coinShadow.classList.add('inactive');

            // Delay between tosses (except the last one)
            if (i < 9) {
                await new Promise(resolve => setTimeout(resolve, 600));
            }

            this.isAnimating = false;
        }

        this.isBatchTossing = false;
        this.tossBtn.disabled = false;
        this.toss10Btn.disabled = false;
    }

    /**
     * Animate the coin spinning
     * @param {boolean} isHeads - Whether the result is heads
     * @param {number} duration - Animation duration in seconds (default 1s)
     */
    animateCoinSpin(isHeads, duration = 2.2) {
        // Respect reduced-motion: skip the multi-spin and just flip briefly
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const spins = reduceMotion ? 0 : 5;
        const totalMs = reduceMotion ? 250 : duration * 1000;

        // Heads = 0deg, Tails = 180deg (the tails face is pre-rotated in CSS)
        const targetFace = isHeads ? 0 : 180;

        // Start from wherever the coin currently is, so the face stays continuous
        const startAngle = this.currentAngle;

        // Next full-turn boundary after the start, plus the spins, plus the target face
        const endAngle =
            Math.ceil((startAngle + 1) / 360) * 360 + spins * 360 + targetFace;

        // Web Animations API: one smooth keyframe run from start to end.
        // ease-out (fast start, slow finish) gives the natural "slowing down" feel.
        const anim = this.coin.animate(
            [
                { transform: `rotateY(${startAngle}deg)` },
                { transform: `rotateY(${endAngle}deg)` }
            ],
            {
                duration: totalMs,
                easing: 'cubic-bezier(0.15, 0.6, 0.25, 1)',
                fill: 'forwards'
            }
        );

        return anim.finished.then(() => {
            // Store the final angle, then pin the coin to it without animation
            this.currentAngle = ((endAngle % 360) + 360) % 360;
            anim.cancel();
            this.coin.style.transform = `rotateY(${this.currentAngle}deg)`;
        });
    }

    /**
     * Record a toss result
     */
    recordToss(isHeads) {
        // Update counts
        if (isHeads) {
            this.stats.headsCount++;
        } else {
            this.stats.tailsCount++;
        }
        this.stats.totalTosses++;

        // Add to history (keep last 10)
        this.stats.history.unshift(isHeads ? 'H' : 'T');
        if (this.stats.history.length > 10) {
            this.stats.history.pop();
        }

        // Update streak
        this.updateStreak(isHeads);

        // Save stats
        this.saveStats();
    }

    /**
     * Update current and longest streak
     */
    updateStreak(isHeads) {
        const currentType = isHeads ? 'heads' : 'tails';

        if (this.stats.currentStreak.type === currentType) {
            this.stats.currentStreak.count++;
        } else {
            // Streak broken, check if it's the longest
            if (this.stats.currentStreak.count > this.stats.longestStreak.count) {
                this.stats.longestStreak = { ...this.stats.currentStreak };
            }

            // Start new streak
            this.stats.currentStreak = { type: currentType, count: 1 };
        }
    }

    /**
     * Display the result of the toss
     */
    displayResult(isHeads) {
        const resultClass = isHeads ? 'heads' : 'tails';
        const resultLabel = isHeads ? 'HEADS' : 'TAILS';
        const messages = [
            isHeads ? '₹ Rupee side!' : 'Emblem side!',
            isHeads ? 'Lucky side!' : 'Destiny chosen!',
            isHeads ? 'Golden result!' : 'Silver lining!'
        ];

        this.resultDisplay.style.opacity = '0';

        setTimeout(() => {
            this.resultText.className = `result-text ${resultClass}`;
            this.resultText.textContent = resultLabel;
            this.resultValue.textContent = `₹${this.currentDenomination}`;
            this.resultMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
            this.resultDisplay.style.opacity = '1';
        }, 100);
    }

    /**
     * Update all statistics displays
     */
    updateStatistics() {
        // Update counts
        document.getElementById('totalTosses').textContent = this.stats.totalTosses;
        document.getElementById('headsCount').textContent = this.stats.headsCount;
        document.getElementById('tailsCount').textContent = this.stats.tailsCount;

        // Update percentages
        if (this.stats.totalTosses > 0) {
            const headsPercent = Math.round(
                (this.stats.headsCount / this.stats.totalTosses) * 100
            );
            const tailsPercent = Math.round(
                (this.stats.tailsCount / this.stats.totalTosses) * 100
            );

            document.getElementById('headsPercent').textContent = `${headsPercent}%`;
            document.getElementById('tailsPercent').textContent = `${tailsPercent}%`;

            // Update chart bars
            document.getElementById('headsBar').querySelector('.chart-fill').style.height =
                `${headsPercent}%`;
            document.getElementById('tailsBar').querySelector('.chart-fill').style.height =
                `${tailsPercent}%`;
        }

        // Update current streak
        if (this.stats.currentStreak.type) {
            const streakLabel = this.stats.currentStreak.type === 'heads' ? 'Heads' : 'Tails';
            document.getElementById('currentStreak').textContent = this.stats.currentStreak.count;
            document.getElementById('streakType').textContent = `${streakLabel} in a row`;
        } else {
            document.getElementById('currentStreak').textContent = '-';
            document.getElementById('streakType').textContent = '';
        }

        // Update longest streak
        if (this.stats.longestStreak.type) {
            const streakLabel = this.stats.longestStreak.type === 'heads' ? 'Heads' : 'Tails';
            document.getElementById('longestStreak').textContent = this.stats.longestStreak.count;
            document.getElementById('longestStreakType').textContent = `${streakLabel} in a row`;
        } else {
            document.getElementById('longestStreak').textContent = '-';
            document.getElementById('longestStreakType').textContent = '';
        }

        // Update history
        this.updateHistory();
    }

    /**
     * Update history display
     */
    updateHistory() {
        const historyContainer = document.getElementById('history');

        if (this.stats.history.length === 0) {
            historyContainer.innerHTML = '<div class="history-empty">No tosses yet</div>';
            return;
        }

        historyContainer.innerHTML = this.stats.history.map((result, index) => {
            const isHeads = result === 'H';
            const className = isHeads ? 'heads' : 'tails';
            return `<div class="history-item ${className}" title="${isHeads ? 'Heads' : 'Tails'}">${result}</div>`;
        }).join('');
    }

    /**
     * Reset all statistics
     */
    resetStatistics() {
        if (confirm('Are you sure you want to reset all statistics?')) {
            this.stats = {
                totalTosses: 0,
                headsCount: 0,
                tailsCount: 0,
                history: [],
                currentStreak: { type: null, count: 0 },
                longestStreak: { type: null, count: 0 }
            };

            this.coin.style.transform = 'rotateY(0deg)';
            this.resultDisplay.style.opacity = '0';
            this.updateStatistics();
            this.saveStats();
        }
    }

    /**
     * Play toss sound effect
     */
    playTossSound() {
        if (!this.soundEnabled) return;

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;

            // Create a woosh sound - descending pitch
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Frequency sweep from 400Hz to 200Hz
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);

            // Volume envelope
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            oscillator.start(now);
            oscillator.stop(now + 0.3);
        } catch (e) {
            console.log('Audio context not available');
        }
    }

    /**
     * Play landing sound effect
     */
    playLandingSound() {
        if (!this.soundEnabled) return;

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;

            // Create a click/thud sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Short burst at 800Hz
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.15);

            // Quick attack, longer decay
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

            oscillator.start(now);
            oscillator.stop(now + 0.15);
        } catch (e) {
            console.log('Audio context not available');
        }
    }

    /**
     * Save statistics to localStorage
     */
    saveStats() {
        try {
            localStorage.setItem('coinTossStats', JSON.stringify(this.stats));
        } catch (e) {
            console.log('localStorage not available');
        }
    }

    /**
     * Load statistics from localStorage
     */
    loadStats() {
        try {
            const saved = localStorage.getItem('coinTossStats');
            if (saved) {
                this.stats = JSON.parse(saved);
            }
        } catch (e) {
            console.log('localStorage not available');
        }
    }
}

// ============================================================================
// INITIALIZE APP ON DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const app = new CoinTossApp();

    // Announce app ready to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Coin toss app loaded. Press space or click Toss Coin to start.';
    document.body.appendChild(announcement);

    // Show announcement for 2 seconds
    setTimeout(() => {
        announcement.remove();
    }, 2000);
});

// ============================================================================
// UTILITY STYLES (for screen reader only content)
// ============================================================================

const styleElement = document.createElement('style');
styleElement.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(styleElement);
