class ThrowableObject extends MovableObject {
    
    /**
     * Array of image paths used for the bottle's rotation animation.
     * @type {string[]}
     */
    images_throw_bottle = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    images_bottle_splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ];

    /**
     * Offset values used for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 30,
        right: 30
    };

    /**
     * Creates an instance of a ThrowableObject.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {boolean} isCharachterMovingLeft - Indicates whether the character is moving left.
     */
    constructor(x, y, isCharachterMovingLeft) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_throw_bottle);
        this.loadImages(this.images_bottle_splash);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.isCharachterMovingLeft = isCharachterMovingLeft;
        this.throw();
        this.animate();
    }

    /**
     * Initiates the throwing motion of the object, applying gravity and movement.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        let throwDirection = this.isCharachterMovingLeft ? -40 : 40;
        setInterval(() => {
            this.x += throwDirection; 
        }, 70);
    }

    animate(){
        setInterval(() => {
            if (this.throw) {
                this.playAnimation(this.images_throw_bottle);
            }
        }, 1000 / 60);
    }
}