class Endboss extends MovableObject {
    height = 350;
    width = 300;
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

     images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
     ];

    world;
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack); 
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.speed = Math.random();
        this.animate();
        this.x = 2000; 
        this.y = 90;
    }

    animate() {
        let aa = setInterval(() => {
            if (this.world && this.world.character) {
                let charX = this.world.character.x; 
                if (charX > 1500) {
                    this.showHealthBar = true;
                }
            }
            if (!this.isEndBossDead()) {
                this.x -= this.speed;
            }
        }, 1000 / 30); 

        setInterval(() => {
            if (this.world && this.world.character) {
                if(this.isEndBossDead()){
                    clearInterval(aa);
                    console.log("object");
                    this.playAnimation(this.images_dead);
                }
            }
        }, 200);
        
    }
    
}
