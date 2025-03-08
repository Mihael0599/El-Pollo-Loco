class Endboss extends MovableObject {
    height = 350;
    width = 300;
    gameoverAudio = new Audio('audio/game-over-arcade-6435.mp3');
    showHealthBar = false;
    wasEncountered = false;
    character;
    distance;

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

    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 10
    };

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.speed = Math.random();
        this.animate();
        this.x = 2900;
        this.y = 90;
    }

    animate() {
        setInterval(() => this.endBossMoving(), 1000 / 60);
        setInterval(() => this.playEndbossAnimation(), 200);
    }

    playEndbossAnimation() {
        if (!this.isEndBossDead() && !this.isEndbossHurt() && !this.wasEncountered) {
            this.playAnimation(this.images_walking);
        } else if (this.isEndbossHurt() && !this.isEndBossDead()) {
            this.playAnimation(this.images_hurt);
        } else if (this.isEndBossDead()) {
            this.playAnimation(this.images_dead);
            playerWon();
            this.playGameoverAudio();
        } else if (this.wasEncountered) {
            this.playAnimation(this.images_attack);
        }
    }

    endBossMoving() {
        if (this.canEndbossMove()) {
            this.x -= this.speed;
        }
        this.checkCharacterDistance();
    }

    showStatusBar() {
        return this.showHealthBar;
    }

    checkCharacterDistance() {
        this.character = world.character;
        this.distance = Math.abs(this.character.x - this.x);
        if (this.distance < 300) {
            this.wasEncountered = true;
            this.showHealthBar = true;
        } else if (this.distance > 300) {
            this.wasEncountered = false;
        }
    }

    canEndbossMove() {
        return !this.isEndBossDead();
    }

    playGameoverAudio() {
        this.gameoverAudio.volume = soundVolume;
        this.gameoverAudio.play();
    }

}
