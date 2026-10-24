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
            this.
        }
    }
}