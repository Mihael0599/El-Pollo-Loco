class Character extends MovableObject {

    /**
     * Character's vertical position.
     * @type {number}
     */
    y = 80;

    /**
     * Character's movement speed.
     * @type {number}
     */
    speed = 8;

    /**
     * Audio for walking sound.
     * @type {HTMLAudioElement}
     */

    /**
     * Audio for walking sound.
     * @type {HTMLAudioElement}
     */
    moveSound = new Audio('audio/walking.mp3');

    /**
     * Audio for jumping sound.
     * @type {HTMLAudioElement}
     */
    jumpSound = new Audio('audio/retro-jump-3-236683.mp3');

    /**
     * Audio for death sound.
     * @type {HTMLAudioElement}
     */
    deadSound = new Audio ('audio/080047_lose_funny_retro_video-game-80925.mp3');

    /**
     * Timestamp of the last movement.
     * @type {number}
     */
    lastMove = 0;

    /**
     * Array of images for walking animation.
     * @type {string[]}
     */
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of images for jumping animation.
     * @type {string[]}
     */
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

    /**
     * Array of images for hurt animation.
     * @type {string[]}
     */
    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of images for death animation.
     * @type {string[]}
     */
    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of images for sleeping animation.
     * @type {string[]}
     */
    images_sleep = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 85,
        bottom: 10,
        left: 30,
        right: 35
    };

    /**
     * Creates a new character instance.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jump);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_sleep);

        this.animate();
        this.applyGravity();
        this.x = 0;
        this.level_end_x;
    }

    /**
     * Starts character animation.
     */
    animate() {
        setInterval(() => this.charachterMoving(), 1000 / 60);
        setInterval(() => this.playAnimationCharacter(), 70);
    }

    /**
     * Plays the character's animation based on state.
     */
    playAnimationCharacter() {
        if (this.isHurt()) {
            this.playAnimation(this.images_hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.images_jump);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.images_walking);
        } else if (this.characterIsSleeping()) {
            this.playAnimation(this.images_sleep);
        } else {
            this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        }
        this.isCharacterDead();
    }

    /**
     * Handles character movement.
     */
    charachterMoving() {
        if (this.canMoveLeft()) {
            this.characterMovingLeft();
        }
        if (this.canMoveRight()) {
            this.characterMovingRight();
        }
        if (this.canJump()) {
            this.characterJump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Determines if the character is dead and triggers the game over sequence.
     */
    isCharacterDead() {
        if (this.isDead()) {
            this.playDeadSound();
            gameover();
        }
    }

    /**
     * Updates the last movement timestamp.
     */
    isCharacterMoving() {
        this.lastMove = new Date().getTime();
    }

    /**
     * Checks if the character is in a sleeping state based on inactivity time.
     * @returns {boolean} True if the character is sleeping, otherwise false.
     */
    characterIsSleeping() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 10 && timepassed < 3600;
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Makes the character jump and plays the jump sound.
     */
    characterJump() {
        this.jump();
        this.playJumpAudio();
        this.isCharacterMoving();
    }

    /**
     * Moves the character to the left.
     */
    characterMovingLeft() {
        if (this.canMoveLeft()) {
            this.otherDirection = true;
            this.moveLeft();
            this.playMoveAudio();
            this.isCharacterMoving();
        }
    }

    /**
     * Moves the character to the right.
     */
    characterMovingRight() {
        if (this.canMoveRight()) {
            this.otherDirection = false;
            this.moveRight();
            this.playMoveAudio();
            this.isCharacterMoving();
        }
    }

    /**
     * Plays the movement sound.
     */
    playMoveAudio(){
        this.moveSound.volume = soundVolume;
        this.moveSound.play();
    }

    /**
     * Plays the jump sound.
     */
    playJumpAudio(){
        this.jumpSound.volume = soundVolume;
        this.jumpSound.play();
    }

    /**
     * Plays the death sound.
     */
    playDeadSound(){
        this.deadSound.volume = soundVolume;
        this.deadSound.play();
    }
}