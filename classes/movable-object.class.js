class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 5000;
    lastHit = 0;
    enemyLastHit = 0;
    coinsCollected = 0;
    bottlesCollected = 0;
    endBossEnergy = 100;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                /* this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); */ //Muss noch angepasst werden
            }
        }, 1000 / 50);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        }
    }



    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height;
    }

    isCollidingItem(mo) {
        return this.x + this.width - 80 > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height - 50 > mo.y &&
            this.y < mo.y - 120 + mo.height;
    }
    
    coinCollected() {
        this.coinsCollected += 20;
     }

    bottleCollected() {
        this.bottlesCollected += 20;
    }

    isHit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isEndbossHit() {
        this.endBossEnergy -= 34;
        if (this.endBossEnergy < 0) {
            this.endBossEnergy = 0;
        } else {
            this.enemyLastHit = new Date().getTime();
        }
    }

    isEndbossHurt() {
        let timepassed = new Date().getTime() - this.enemyLastHit;
        timepassed = timepassed / 1000;
        return timepassed < 2;
    }

    isDead() {
        return this.energy == 0;
    }
    
    isEndBossDead(){
        return this.endBossEnergy == 0;
    }

    moverRight() {
        this.x += this.speed
    }

    moveLeft() {
        this.x -= this.speed
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
    }
}