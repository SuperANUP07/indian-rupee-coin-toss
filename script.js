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


    }    
}