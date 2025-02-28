class World {
    character = new Character();
    chicken = new Chicken();
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
    throwableObjects = [];
    bottleThrown = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endBoss.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkCollisionCoin();
            this.checkCollisionBottle();
            this.checkBottleCollision();
        }, 10);
        setInterval(() => {
            this.checkThrowObjects();
            if (this.character.isDead()) {
                this.level.enemies = [];
                this.level.coins = [];
                this.level.bottles = [];
            }
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.bottleThrown && this.character.bottlesCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottlesCollected -= 20;
            this.statusBarBottel.setPercentage(this.character.bottlesCollected);
        }
        if (!this.keyboard.D) {
            this.bottleThrown = false;
        }
    }
    checkCollision() {
        this.level.enemies.forEach((enemy, index) => {
          if (this.character.isColliding(enemy)) {
            let stomped = false;
            let delay = 200;
      
            // Bedingung 1: Charakter fällt (speedY <= 0) und der Abstand zwischen Charakter-Boden und Gegner-Oberseite ist gering (< 30)
            if (this.character.speedY <= 0 && (this.character.y + this.character.height - enemy.y) < 30) {
              stomped = true;
              delay = 200;
            }
            // Bedingung 2: Alternativ, falls der Charakter fällt und sein Boden unterhalb eines bestimmten Punktes des Gegners liegt
            else if (this.character.speedY < 0 && this.character.y + this.character.height < enemy.y + enemy.height / 2) {
              stomped = true;
              delay = 500;
            }
      
            if (stomped) {
              enemy.isEnemyHit();
              this.character.jump();
              setTimeout(() => {
                this.level.enemies.splice(index, 1);
              }, delay);
            } else if (!enemy.dead) {
              this.character.isHit();
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
            }
        });
    }

    checkCollisionBottle() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isCollidingItem(bottles)) {
                this.character.bottleCollected();
                this.statusBarBottel.setPercentage(this.character.bottlesCollected);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkBottleCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !enemy.dead) {
                    this.endBoss.isEndbossHit();
                    enemy.isEnemyHit();
                    this.statusBarEndboss.setPercentage(this.endBoss.endBossEnergy)
                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgorund);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottel);
        if (this.endBoss.showHealthBar) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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
        /* mo.drawFrameItems(this.ctx) */
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