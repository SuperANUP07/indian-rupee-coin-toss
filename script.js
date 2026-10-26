class CoinTossApp{
    constructor(){
        //App State
        this.currentDeomination = '10';
        this.isAnimating = false;
        this.soundEnabled = true;
        this.isBatchTossing = false;

        //Statistics
        this.stats = {
            totalTosses:0,
            headCount:0,
            tailCount:0,
            history:[],
            currentStreak: { type: null, count: 0 },
            longestStreak: { type: null, count: 0 }
        };
    
        // Load persisted stats
        this.loadStats();

        // DOM  Elements
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

        //Intialize Event Listeners
        this.initializeEventListeners();
        this.updateStatistics();
    };

    /** Initialize all Event Listeners */
    initializeEventListeners() {
        this.tossBtn.addEventListener('click',() => this.performToss());
        this.toss10Btn.addEventListener('click', ()=> this.perform10Tosses());

        this.resetBtn.addEventListener('click', ()=> this.resetStatistics());

        this.soundToggle.addEventListener('click', ()=> this.toggleSound());

        document.querySelectorAll('.denom-btn').forEach(btn => {
            btn.addEventListener('click',(e)=> this.selectDenomination(e.target));
        });

        //Keyboard Shortcuts
        document.addEventListener('keydown', (e) =>{
            if(e.code === 'Space' && !this.isAnimating) {
                e.preventDefault();
                this.performToss();
            }
        });
    }

    /** Select a coin denomination */
    selectDenomination(button){
        document.querySelectorAll('.denom-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        this.currentDeomination = button.dataset.denom;
        this.coinDenom.textContent = this.currentDeomination;
    }

    /**Toggle Sound on/off */
    toggleSound(){
        this.soundEnabled = !this.soundEnabled;
        this.soundToggle.classList.toggle('muted', !this.soundEnabled);
    }

    /** Perform a single coin toss */
    async performToss() {
        if(this.isAnimating || this.isBatchTpssing) return;

        this.isAnimating = true;
        this.tossBtn.disabled = true;
        this.toss10Btn.disabled = true;

        this.coin.className = 'coin';
        this.coinShadow.className = 'coin-shadow inactive';

        const isHeads = Math.random() < 0.5;
        
        this.playTossSound();

        setTimeout(() => {
            this.coinShadow.classList.remove('inactive');
            this.coinShadow.classList.add('active');
        },100 );

        await this.animateCoinSpin(isHeads);

        this.recordToss(isHeads);
        this.displayResult(isHeads);
        this.updateStatistics();

        this.playLandingSound();

        this.coinShadow.classList.remove('active');
        this.coinShadow.classList.add('inactive');
        this.isAnimating = false;
        this.tossBtn.disabled = false;
        this.toss10Btn.disabled = false;
    }

    /** Perfrom 10 cpnsecutive tosses with Animation*/
    async perform10Tosses() {
        if (this.isAnimating || this.isBatchTossing) return;

        this.isBatchTossing = true;
        this.toassBtn.disabled = true;
        this.toss10Btn.disabled = true;

        for (let i = 0; i< 10; i++){
            this.isAnimating = true;
            this.coin.className = 'coin';
            this.coinShadow.className = 'coin-shadow inactive';

            const isHeads = Math.random() < 0.5;
            this.playTossSound();

            setTimeout(() => {
                this.coinShadow.classList.remove('inactive');
                this.coinShadow.classList.add('active');
            }, 50);

            await this.animationCoinSpin(isHeads,0.8);

            this.recordToss(isHeads);
            this.displayResult(isHeads);
            this.updateStatistics();

            this.playLandingSound();

            this.coinShadow.classList.remove('active');
            this.coinShadow.classList.add('inactive');

            if (i < 9) {
                await new Promise(resolve => setTimeout(resolve, 600));
            }
            this.isAnimating = false;
        }

        this.isBatchTossing = false;
        this.tossBtn.disabled = false;
        this.toss10Btn.disabled = false;
    }

    /**Animate the coin spining */
    animateCoinspin(isHeads, duration = 1){
        return new Promise(resolve => {
            this.coin.classList.add(
                duration <1 ? 'tossing' : 'tossing-extended'
            );
            const finalRotation = isHeads ? 0 : 180;

            setTimeout(() => {
                this.coin.classList.remove('tossing', 'tossing-extended');
                this.coin.classList.add(isHeads ? 'heads': 'trails');
                setTimeout(() => {
                    this.coin.classList.remove('landing-heads','landing-tails' );
                    this.coin.style.transform = `rotateY(${finalRotation}deg`;
                    resolve();
                }, 400);
            }, duration * 1000);
        });
    }

    /** Record the toss result */
    recordToss(isHeads) {
        if(isHeads){
            this.stats.headsCount++;
        } else {
            this.stats.tailsCount++;
        }
        this.stats.totalTosses++;

        this.stats.history.unshift(isHeads ? 'H' : 'T');
        if(this.stats.history.length > 10 ){
            this.stats.history.pop();
        }

        this.updateStreak(isHeads);
        this.saveStats();
    }

    /** Update the current streak and longest strsak
    */
   updateStreak(isHeads) {
    const currentType = isHeads ? 'H' : 'T';
    if (this.stats.currentStreak.type === currentType){
        this.stats.currentStreak.count++;
    } else {
        if (this.stats.cuurentStreak.count > this.stats.longestStreak.count){
            this.stats.longestStreak.count = { ...this.stats.cuurrentSteak};
        }
        this.stats.currentSteak = {type : currentType, count:1};
    }
   }

   /*** Display the result of the Toss
    *  **/
    displayresult(isHeads){
        const resultClass = isHeads ? 'heads' : 'tails';
        const resultLabel = isHeads ? 'HEADS' : 'TAILS';
        const message = [
            isHeads ? '₹ Rupee side!' : 'Emblem side!',
            isHeads ? 'Lucky side' : 'Destiny chosen!',
            isHeads ? 'Gloden result!' : ' sliver lining'
        ];

        this.resultDisplay.style.opacity = '0';

        setTimneout(() => {
            this.resultText.className = 'result-text ${resultClass}';
            this.resultText.textContent = resultLabel;
            this.resultValue.textContent = '₹${this.currentDenomination}';
            this.resultMessage.textContent = message[Math.floor(Math.random() * message.Length)];
            this.resultDisplay.style.opacity = '1';
        },100);
    }

    /** Update all statistics displays */
    updateStratistics() {
        document.getElementById('totalTosses').textContent = this.stats.totalTosses;
        document.getElementById('headsCount').textContent = this.stats.headsCount;
        document.getElementById('tailsCount').textContent = this.stats.tailsCount;

        if(this.stats.totalTosses > 0 ) {
            const headsPercent = Math.round(
                (this.stats.headsCount / this.stats.totalTosses) * 100
            );
            const tailsPercent = Math.round(
                (this.stats.tailsCount / this.stats.totalTosses) * 100
            );

            document.getElementById('headsPercent').textContent = `${headsPercent}%`;
            document.getElementById('tailsPercent').textContent = `${tailsPercent}%`;

            document.getElementById('headsBar').querySelector('.chart-fill').style.height =
                `${headsPercent}%`;
            document.getElementById('tailsBar').querySelector('.chart-fill').style.height =
                `${tailsPercent}%`;
        }

        if (this.stats.currentStreak.type){
            const streakLabel = this.stats.currentStreak.type === 'heads' ? 'Heads' : 'Tails' ;
            document.getElementById('currentStreak').textContent = this.stats.cuurentStreak.count;
            document.getElementById('streakType').textContent = `${streakLabel} in a row`;
        } else {
            document.getElementById('currentStreak').textContent = '-';
            document.getElementById('streakType').textContent = '';
        }

        if( this.stats.longestStreak.type){
            const streaklabel = this.stats.longestStreak.type === 'heads' ? 'Heads' : 'Tails';
            document.getElementById('longestStreak').textContent = this.stats.longestStreak.count; 
            document.getElementById('longestStreakType').textContent = `${streakLabel} in a row`; 
        } else {
            document.getElementById('longestStreak').textContent = '-';
            document.getElementById('longestStreakType').textContent = '';
        }

        this.updateHistory();
    }

    /**update History Display*/
    updateHistory() {
        const historyConatiner = document.getElementById('history');

        if(this.stats.history.length ===0 ){
            historyConatiner.innerHTML = '<div class = "history-empty">No tosses yet</div>';
            return;
        }

        historyConatiner.innerHTML = this.stats.history.map((result, index) => {
            const isHeads = result === 'H';
            const className = isHeads ? 'heads' : 'tails';
            return `<div class="history-item ${className}" tittle="${isHeads ? 'Heads' : 'Tails'}"> ${result} </div>`;
        }).join('');
    }

    /**Reset all statistics */
    resetStatistics(){
        if (confirm ('Are you sure want to reset all statistics?')){
            this.stats = {
                totalTosses : 0,
                headsCount : 0,
                tailsCount  : 0,
                history : [],
                currentStreak : {type : null, count : 0 },
                longestStreak : {type : null , count : 0 }
            };
            this.coin.style.transform = 'rotateY(0deg)';
            this.resultDisplay.style.opacity = '0';
            this.updateStratistics();
            this.saveStats();
        }
    }

    playTossSound() {
        if (!this.soundEnabled) return;

        try {
            const audioContext = new (Window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;

            const oscillator = audioContext.createOscillator ();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);

            gainNode
        }
    }
}