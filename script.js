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
        this.coinBtn = document.getElementById()

    }
}