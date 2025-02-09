class MovableObject {
    x = 120;
    y = 120;
    img;
    height = 200;
    width = 150;
    imageChace = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 1000 / 50);
    }

    isAboveGround() {
        return this.y < 220;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChace[path] = img;
        });
    }

    moverRight() {
        this.x += this.speed
    }

    moveLeft() {
        this.x -= this.speed
    }

    playanimation(images) {
        let i = this.currentImage % this.images_walking.length;
        let path = images[i];
        this.img = this.imageChace[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
    }
}