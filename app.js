var app = new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            //Check Options
            if (this.checkPlayerOptions()) {
                return;
            }
            //Monster
            var damage = this.inputDamage(4,10);
            this.monsterHealth -= damage;
            //unshift() đẩy phần tử vào đầu mảng
            this.turns.unshift({
                isPlayer: false,
                textLog: 'Player hits Monster for ' + damage
            })
            //Player
            this.monsterAttacks();
        },
        specialAttack: function() {
            //Check Options
            if (this.checkPlayerOptions()) {
                return;
            }
            //Monster
            var damage = this.inputDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                textLog: 'Player hits Monster for ' + damage
            })
            //Player
            this.monsterAttacks();
        },
        heal: function() {
            //Player
            if (this.playerHealth > 70) {
                return false;
            } else if (this.playerHealth <= 60) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: false,
                    textLog: 'Player heals for 10'
                })
            } else {
                this.playerHealth = 70;
            }
            //Monster
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.turns = [];
            alert('You lost!')
        },
        monsterAttacks: function() {
            var damage = this.inputDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Monster hits Phayer for ' + damage
            })
            this.checkPlayerOptions();
        },
        inputDamage: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkPlayerOptions: function() {
            if(this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startNewGame();
                    // this.gameIsRunning = true;
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startNewGame();
                    // this.gameIsRunning = true;
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return;
        }
    }
});
//Nếu game bắt đầu thì hiển thị các control