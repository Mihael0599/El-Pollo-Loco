class Character extends MovableObject {
    y = 80;
    speed = 8;
    moveSound = new Audio('audio/walking.mp3');
    jumpSound = new Audio('audio/retro-jump-3-236683.mp3');
    deadSound = new Audio ('audio/080047_lose_funny_retro_video-game-80925.mp3');
    lastMove = 0;

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

    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

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

    offset = {
        top: 85,
        bottom: 10,
        left: 30,
        right: 35
    };

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

    animate() {
        setInterval(() => this.charachterMoving(), 1000 / 60);
        setInterval(() => this.playAnimationCharacter(), 100);
    }

    playAnimationCharacter() {
        if (this.isHurt()) {
            this.playAnimation(this.images_hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.images_jump);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.images_walking);
        } else if (this.characterIsSleeping()) {
            this.playAnimation(this.images_sleep);
        }
        this.isCharacterDead();
    }

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

    isCharacterDead() {
        if (this.isDead()) {
            this.playDeadSound();
            gameover();
        }
    }

    isCharacterMoving() {
        this.lastMove = new Date().getTime();
    }

    characterIsSleeping() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 10 && timepassed < 3600;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600;
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    characterJump() {
        this.jump();
        this.playJumpAudio();
        this.isCharacterMoving();
    }

    characterMovingLeft() {
        if (this.canMoveLeft()) {
            this.otherDirection = true;
            this.moveLeft();
            this.playMoveAudio();
            this.isCharacterMoving();
        }
    }

    characterMovingRight() {
        if (this.canMoveRight()) {
            this.otherDirection = false;
            this.moveRight();
            this.playMoveAudio();
            this.isCharacterMoving();
        }
    }

    playMoveAudio(){
        this.moveSound.volume = soundVolume;
        this.moveSound.play();
    }

    playJumpAudio(){
        this.jumpSound.volume = soundVolume;
        this.jumpSound.play();
    }

    playDeadSound(){
        this.deadSound.volume = soundVolume;
        this.deadSound.play();
    }
}