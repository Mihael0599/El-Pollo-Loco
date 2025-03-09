class World {
    character = new Character();
    endBoss = new Endboss();
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
    enemyHitAudio = new Audio('audio/retro-hurt-2-236675.mp3');

    /**
     * Creates an instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * Sets the world reference for the character
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop and checks for collisions and throw actions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 10)

        setInterval(() => {
            this.checkThrowObjects();
        }, 50);
    }

    /**
     * Checks collisions between the character and enemies.
     */
    checkCollisions() {
        this.checkCollision();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
        this.checkBottleCollision();
    }
    /**
     * Checks if an object should be thrown.
     */
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
    /**
     * Checks collisions between the character and enemies.
     */
    checkCollision() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index) && this.character.isAboveGround() && this.character.speedY < 0) {
                if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                    enemy.isEnemyHit();
                    this.playEnemyHitAudio();
                    this.removeEnemyFromWorld(enemy);
                    this.character.jump();
                }
            } else if (!enemy.dead && this.character.isColliding(enemy)) {
                this.character.isHit();
                this.playCharackterHitAudio();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks if the character collects a coin.
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.coinCollected();
                this.statusBarCoins.setPercentage(this.character.coinsCollected);
                this.level.coins.splice(index, 1);
                this.playCoinCollectedAudio();
            }
        });
    }

    /**
     * Checks if the character collects a bottle.
     */
    checkCollisionBottle() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isColliding(bottles)) {
                this.character.bottleCollected();
                this.statusBarBottel.setPercentage(this.character.bottlesCollected);
                this.level.bottles.splice(index, 1);
                this.playBottleCollectedAudio();
            }
        });
    }

    /**
     * Checks if a thrown bottle collides with an enemy.
     */
    checkBottleCollision() {
        this.thowableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.dead) {
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                        this.enemyHited(enemy);
                    }
                    if (enemy instanceof Endboss) {
                        this.endbossHited(enemy);
                    }
                    this.thowableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }

    /**
     * Shows gameover Screen and clears all intervalss
     */
    gameover() {
        clearInterval(this.run);
        showGameOver();
    }


    /**
     * Handles interactions when an enemy is hit.
     * @param {Object} enemy - The enemy that was hit.
     */
    enemyHited(enemy) {
        enemy.isEnemyHit();
        this.removeEnemyFromWorld(enemy);
        this.playEnemyHitAudio();
    }

    /**
     * Handles interactions when the Endboss is hit.
     * @param {Object} enemy - The Endboss that was hit.
     */
    endbossHited(enemy) {
        enemy.isEndbossHit();
        this.playEnemyHitAudio();
        this.statusBarEndboss.setPercentage(enemy.endBossEnergy);
    }

    /**
     * Removes an enemy from the world after a short delay.
     * @param {Object} enemyToRemove - The enemy object to be removed.
     */
    removeEnemyFromWorld(enemyToRemove) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(enemy => enemy !== enemyToRemove);
        }, 200);
    }

    /**
     * Draws the game world and objects.
     */
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

    /**
     * Adds various objects to the game world, including background, enemies, and collectibles.
     */
    addObjects() {
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.thowableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Adds status bars to the game world, including character and Endboss health bars.
     */
    addStatusBarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottel);
        if (this.endBoss.showHealthBar) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Adds an array of objects to the game map.
     * @param {Object[]} objects - The objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the game map and handles object flipping if necessary.
     * @param {Object} mo - The movable object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.spinImage(mo);
        }
        mo.draw(this.ctx);
        /* mo.drawFrameItems(this.ctx); */
        /* mo.drawFrame(this.ctx); */

        if (mo.otherDirection) {
            this.spinImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally before drawing it.
     * @param {Object} mo - The movable object to be flipped.
     */
    spinImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image position after flipping.
     * @param {Object} mo - The movable object to be restored.
     */
    spinImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Plays the enemy hit sound.
     */
    playEnemyHitAudio() {
        this.enemyHitAudio.volume = soundVolume;
        this.enemyHitAudio.play();
    }

    /**
     * Plays the character hit sound.
     */
    playCharackterHitAudio() {
        this.charackterHitAudio.volume = soundVolume;
        this.charackterHitAudio.play();
    }

    /**
     * Plays the bottle collected sound.
     */
    playBottleCollectedAudio() {
        this.bottleCollectedAudio.volume = soundVolume;
        this.bottleCollectedAudio.play();
    }

    /**
     * Plays the coin collected sound.
     */
    playCoinCollectedAudio() {
        this.coinCollectedAudio.volume = soundVolume;
        this.coinCollectedAudio.play();
    }
}