class Endboss extends MovableObject {
    height = 350;
    width = 300;
    dead = false;

    images_walking = [ 
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
     ];
    images_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',

     ];

     images_hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
     ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images_walking);
        this.loadImages (this.images_attack); 
        this.speed = Math.random() - 0.5;
        this.animate();
        this.dead = false;
        this.x = 2000; 
        this.y = 90;
    }

    isEnemyHit() {
        this.enemyEnergy -= 34;
    }

    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead) {
                this.playanimation(this.images_walking);
            }else if(this.isEnemyHit()){
                this.playanimation(this.images_hurt);
            }
        }, 200);
    }
}
