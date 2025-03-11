/**
 * Represents a small chicken enemy in the game.
 * Inherits from MovableObject.
 */
class ChickenSmall extends MovableObject {
    
    /**
     * The x-coordinate of the small chicken, randomized within a range.
     * @type {number}
     */
    x = 400 + Math.random() * 3400;

    /**
     * The y-coordinate of the small chicken.
     * @type {number}
     */
    y = 350;

    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 70;

    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 70;

    /**
     * Indicates if the small chicken is dead.
     * @type {boolean}
     */
    dead = false;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    images_walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 15,
        right: 10
    };

    /**
     * Creates an instance of ChickenSmall.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.speed = Math.random() * 0.7;
        this.dead = false;
        this.animate();
    }

    /**
     * Starts the animation loops for movement and action sequences.
     */
    animate() {
        setInterval(() => this.enemyIsMoving(), 1000 / 60);
        setInterval(() => this.playEnemyAnimation(), 200);
    }

    /**
     * Moves the small chicken to the left if it is alive.
     */
    enemyIsMoving() {
        if (this.canEnemyMove()) {
            this.x -= this.speed;
        }
    }

    /**
     * Checks if the small chicken can move.
     * @returns {boolean} True if the small chicken is alive.
     */
    canEnemyMove() {
        return !this.dead;
    }

    /**
     * Plays the walking animation if the small chicken is alive.
     */
    playEnemyAnimation() {
        if (this.canEnemyMove()) {
            this.playAnimation(this.images_walking);
        }
    }

    /**
     * Handles the event when the small chicken is hit, marking it as dead and changing its image.
     */
    isEnemyHit() {
        this.dead = true;
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }
}
