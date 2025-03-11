class Bottles extends DrawableObject {
    
    /**
     * Offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 20,
        bottom: 10,
        left: 45,
        right: 20
    };

    /**
     * Creates an instance of Bottles.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        
        /**
         * The width of the bottle.
         * @type {number}
         */
        this.width = 100;

        /**
         * The height of the bottle.
         * @type {number}
         */
        this.height = 100;

        /**
         * The y-coordinate of the bottle.
         * @type {number}
         */
        this.y = 330;

        /**
         * The x-coordinate of the bottle, randomized within a range.
         * @type {number}
         */
        this.x = 200 + Math.random() * 2500;
    }
}
