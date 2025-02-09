class Character extends MovableObject {

    y = 80;
    speed = 8;
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    images_jump = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/1_idle/idle/I-1.png'
    ];

    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jump);

        this.animate();
        this.applyGravity();
        this.x = 0;
        this.level_end_x;
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moverRight();
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.otherDirection = true;
                this.moveLeft();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playanimation(this.images_jump)
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playanimation(this.images_walking);
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        }, 100);

    }
}