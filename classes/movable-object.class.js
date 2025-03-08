class MovableObject extends DrawableObject {
    
    /**
     * The movement speed of the object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Indicates if the object is facing the other direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration of the object.
     * @type {number}
     */
    acceleration = 1;

    /**
     * The energy level of the object.
     * @type {number}
     */
    energy = 500;

    /**
     * Timestamp of the last hit received.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Timestamp of the last hit received by an enemy.
     * @type {number}
     */
    enemyLastHit = 0;

    /**
     * Number of collected coins.
     * @type {number}
     */
    coinsCollected = 0;

    /**
     * Number of collected bottles.
     * @type {number}
     */
    bottlesCollected = 0;

    /**
     * Endboss's energy level.
     * @type {number}
     */
    endBossEnergy = 100;

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left:  0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 50);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        }
    }

    /**
     * Checks if this object is colliding with another object.
     * @param {MovableObject} mo - The object to check collision with.
     * @returns {boolean} True if the objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
    /**
     * Increases the collected coins.
     */
    coinCollected() {
        this.coinsCollected += 20;
    }

    /**
     * Increases the collected bottles up to a maximum of 100.
     * @returns {boolean} False if the maximum is reached.
     */
    bottleCollected() {
        if (this.bottlesCollected < 100) {
            this.bottlesCollected += 20;
        } else {
            return false;
        }
    }

    /**
     * Reduces the object's energy when hit.
     */
    isHit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is still hurt from a previous hit.
     * @returns {boolean} True if the object was hit recently.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed / 1000 < 0.5;
    }

    /**
     * Reduces the Endboss's energy when hit.
     */
    isEndbossHit() {
        this.endBossEnergy -= 34;
        if (this.endBossEnergy < 0) {
            this.endBossEnergy = 0;
        } else {
            this.enemyLastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the Endboss is still hurt from a previous hit.
     * @returns {boolean} True if the Endboss was hit recently.
     */
    isEndbossHurt() {
        let timepassed = new Date().getTime() - this.enemyLastHit;
        return timepassed / 1000 < 2;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object has no energy left.
     */
    isDead() {
        return this.energy === 0;
    }
    
    /**
     * Checks if the Endboss is dead.
     * @returns {boolean} True if the Endboss has no energy left.
     */
    isEndBossDead() {
        return this.endBossEnergy === 0;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation by cycling through an array of images.
     * @param {string[]} images - The images to be used in the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 20;
    }
}
