class BackgorundObject extends MovableObject {
    
    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * Creates an instance of BackgorundObject.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        
        /**
         * The x-coordinate of the background object.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate of the background object, adjusted to align with the bottom of the screen.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
}
