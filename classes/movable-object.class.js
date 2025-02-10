class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

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
        }else {
            return this.y < 220;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    isHit(){
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
                console.log(this.energy)
            } else {
                this.lastHit = new Date().getTime();
            }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead(){
      return this.energy == 0;
    }

    moverRight() {
        this.x += this.speed
    }

    moveLeft() {
        this.x -= this.speed
    }

    playanimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageChace[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
    }
}