class Chicken extends MovableObject {
    x = 250 + Math.random() * 500;
    y = 350;
    height = 70;
    width = 70;

    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.speed = Math.random() * 0.7;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.isEnemyHurt()) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }

        }, 100);
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);

        setInterval(() => {
            this.playanimation(this.images_walking);
        }, 200);
    }
}
