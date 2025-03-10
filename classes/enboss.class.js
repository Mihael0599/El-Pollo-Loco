class Endboss extends MovableObject {
    /**
     * @type {number} Height of the Endboss.
     */
    height = 350;

    /**
     * @type {number} Width of the Endboss.
     */
    width = 300;

    /**
     * @type {HTMLAudioElement} Audio played when the game is over.
     */
    gameoverAudio = new Audio('audio/game-over-arcade-6435.mp3');

    /**
     * @type {boolean} Whether the health bar should be displayed.
     */
    showHealthBar = false;

    /**
     * @type {boolean} Whether the Endboss has been encountered by the character.
     */
    wasEncountered = false;

    /**
     * @type {Character} Reference to the player character.
     */
    character;

    /**
     * @type {number} Distance between the Endboss and the character.
     */
    distance;

    /**
     * @type {string[]} Image paths for the walking animation.
     */
    images_walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * @type {string[]} Image paths for the attack animation.
     */
    images_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * @type {string[]} Image paths for the hurt animation.
     */
    images_hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * @type {string[]} Image paths for the dead animation.
     */
    images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * @type {Object} Hitbox offset values.
     * @property {number} top - Offset from the top.
     * @property {number} bottom - Offset from the bottom.
     * @property {number} left - Offset from the left.
     * @property {number} right - Offset from the right.
     */
    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 10
    };

    /**
     * Creates an instance of Endboss.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.speed = 0.2;
        this.animate();
        this.x = 2900;
        this.y = 90;
    }

    /**
     * Handles the animation of the Endboss.
     */
    animate() {
        setInterval(() => this.endBossMoving(), 1000 / 60);
        setInterval(() => this.playEndbossAnimation(), 150);
    }

    /**
     * Determines and plays the correct animation based on the Endboss state.
     */
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

    /**
     * Moves the Endboss if conditions allow.
     */
    endBossMoving() {
        if (this.canEndbossMove()) {
            this.x -= this.speed;
        }
        this.checkCharacterDistance();
    }

    /**
     * Returns whether the health bar should be displayed.
     * @returns {boolean}
     */
    showStatusBar() {
        return this.showHealthBar;
    }

    /**
     * Checks the distance between the Endboss and the character.
     */
    checkCharacterDistance() {
        this.character = world.character;
        this.distance = Math.abs(this.character.x - this.x);
        if (this.distance < 300) {
            this.wasEncountered = true;
            this.showHealthBar = true;
            this.speed = 1.2;
        } else if (this.distance > 300) {
            this.wasEncountered = false;
            this.speed = 0.2;
        }
    }

    /**
     * Determines whether the Endboss can move.
     * @returns {boolean}
     */
    canEndbossMove() {
        return !this.isEndBossDead();
    }

    /**
     * Plays the game-over sound effect.
     */
    playGameoverAudio() {
        this.gameoverAudio.volume = soundVolume;
        this.gameoverAudio.play();
    }
}
