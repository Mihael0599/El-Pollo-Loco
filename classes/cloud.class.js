/**
 * Represents a cloud in the game world.
 * Inherits from MovableObject.
 */
class Cloud extends MovableObject {
    
    /**
     * The x-coordinate of the cloud, randomized within 3000 pixels.
     * @type {number}
     */
    x = Math.random() * 3000;

    /**
     * The y-coordinate of the cloud, randomized within 100 pixels.
     * @type {number}
     */
    y = Math.random() * 100;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 720;

    /**
     * Array of cloud images used for floating animation.
     * @type {string[]}
     */
    image_floating = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Creates an instance of Cloud.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.image_floating);
        this.speed = 0.2;
        this.animate();
    }

    /**
     * Animates the cloud by continuously moving it to the left.
     */
    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
