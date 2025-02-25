class Endboss extends MovableObject {
    height = 350;
    width = 300;
    dead = false;
    world;
    walkInterval = true;
    attackInterval = true;
    showHealthBar = false; 

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
        this.loadImages(this.images_attack); 
        this.speed = Math.random();
        this.animate();
        this.dead = false;
        this.x = 2000; 
        this.y = 90;
    }


    animate() {
        setInterval(() => {
            if (this.world && this.world.character) {
                let charX = this.world.character.x; 
                if (charX > 1500) {
                    this.showHealthBar = true;
                    this.walkInterval = false;
                    this.attackInterval = true;
                }
            }

            if (!this.dead) {
                this.x -= this.speed;
            }
        }, 1000 / 30); 

       setInterval(() => {
            if (this.walkInterval && !this.attackInterval) {
                this.playanimation(this.images_walking);
                console.log("walking");
            }
            
        }, 200);

        setInterval(() => {
            if (this.attackInterval && !this.walkInterval) {
                this.playanimation(this.images_attack);
                console.log("attacking");
            }
            
        }, 200);
    }
    
}
