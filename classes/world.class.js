class World {
    character = new Character();
    endBoss;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottel = new StatusBarBottels();
    statusBarEndboss = new StatusBarEndboss();
    coins = new Coins();
    bottles = new Bottles();
    thowableObjects = [];
    bottleThrown = false;
    coinCollectedAudio = new Audio('audio/coin-recieved-230517.mp3');
    bottleCollectedAudio = new Audio('audio/bottle_collected.mp3');
    charackterHitAudio = new Audio('audio/charackter_hurt.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 10)

        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects() {
        this.checkThrowObjects();
    }

    checkCollisions() {
        this.checkCollision();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
        this.checkBottleCollision();
    }
    checkThrowObjects() {
        if (this.keyboard.D && !this.bottleThrown && this.character.bottlesCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection);
            this.thowableObjects.push(bottle);
            this.character.bottlesCollected -= 20;
            this.statusBarBottel.setPercentage(this.character.bottlesCollected);
            this.bottleThrown = true;
        }
        if (!this.keyboard.D) {
            this.bottleThrown = false;
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                let isAttackingFromAbove =
                    this.character.speedY < 0 &&
                    this.character.y + this.character.height < enemy.y + enemy.height / 2;

                if (isAttackingFromAbove) {
                    enemy.isEnemyHit();
                    this.character.jump();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 200);
                } else if (!enemy.dead) {
                    this.character.isHit();
                    this.charackterHitAudio.play();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCollisionCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCollidingItem(coin)) {
                this.character.coinCollected();
                this.statusBarCoins.setPercentage(this.character.coinsCollected);
                this.level.coins.splice(index, 1);
                this.coinCollectedAudio.play();
            }
        });
    }

    checkCollisionBottle() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isCollidingItem(bottles)) {
                this.character.bottleCollected();
                this.statusBarBottel.setPercentage(this.character.bottlesCollected);
                this.level.bottles.splice(index, 1);
                this.bottleCollectedAudio.play();
            }
        });
    }

    checkBottleCollision() {
        this.thowableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !enemy.dead) {
                    if (enemy instanceof Chicken) {
                        enemy.isEnemyHit();
                        /* this.enemyHitAudio.play(); */
                    }
                    if (enemy instanceof Endboss) {
                        enemy.isEndbossHit();
                        /* this.enemyHitAudio.play(); */
                        this.statusBarEndboss.setPercentage(enemy.endBossEnergy);
                    }
                    this.thowableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }

    gameover() {
        clearInterval(this.run);
        showGameOver();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);

        this.ctx.translate(this.camera_x, 0);
        this.addObjects();
        this.ctx.translate(-this.camera_x, 0);

        this.addStatusBarsToMap();
        
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjects() {
        this.addObjectsToMap(this.level.backgorund);
        this.addObjectsToMap(this.thowableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    addStatusBarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottel);
        if (this.character.x > 1500) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.spinImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrameItems(this.ctx)
        /* mo.drawFrame(this.ctx); */

        if (mo.otherDirection) {
            this.spinImageBack(mo);
        }
    }

    spinImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    spinImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}