class Endboss extends MovableObject {

height = 350;
width = 300;

    images_walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        /*         'img/4_enemie_boss_chicken/2_alert/G10.png',
                'img/4_enemie_boss_chicken/2_alert/G11.png',
                'img/4_enemie_boss_chicken/2_alert/G12.png',
         */
    ];


    constructor() {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.speed = Math.random() * 1;
        this.animate();
        this.x = 2000; 
        this.y = 90;
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);

        setInterval(() => {
            this.playanimation(this.images_walking);
        }, 200);
    }
}