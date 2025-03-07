class ChickenSmall extends MovableObject {
    x = 200 + Math.random() * 1100;
    y = 350;
    height = 70;
    width = 70;
    dead = false;

    images_walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 15,
        right: 10
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.speed = Math.random() * 0.7;
        this.dead = false;
        this.animate();
    }

    animate() {
        setInterval(() => this.enemyIsMoving(), 1000 / 60);
        setInterval(() => this.playEnemyAnimation(), 200);
    }

    enemyIsMoving() {
        if (this.canEnemyMove()) {
            this.x -= this.speed;
        }
    }

    canEnemyMove() {
        return !this.dead;
    }

    playEnemyAnimation() {
        if (this.canEnemyMove()) {
            this.playAnimation(this.images_walking);
        }
    }

    isEnemyHit() {
        this.dead = true;
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }
}