class Character extends MovableObject {

    y = 220;
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
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    images_jump_back = [
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-31.png'
    ];

    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jump);

        this.animate();
        this.jump();
        this.jumpBack();
    }

    animate() {
        setInterval(() => {

            if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.images_walking.length;
                let path = this.images_walking[i];
                this.img = this.imageChace[path];
                this.currentImage++;
                this.x += 10;
            }
        }, 100);

    }

    jump() {
        setInterval(() => {

            if (this.world.keyboard.SPACE) {
                let i = this.currentImage % this.images_jump.length;
                let path = this.images_jump[i];
                this.img = this.imageChace[path];
                this.currentImage++;
                this.y -= 10;
            }
        }, 100);
    }

    jumpBack() {
        setInterval(() => {

            if (this.world.keyboard.SPACE == false) {
                let i = this.currentImage % this.images_jump_back.length;
                let path = this.images_jump_back[i];
                this.img = this.imageChace[path];
                this.currentImage++;
                this.y = 220;
            }
        }, 300);
     }
}