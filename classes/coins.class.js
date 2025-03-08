/**
 * Represents a collectible coin in the game.
 * Inherits from DrawableObject.
 */
class Coins extends DrawableObject {
    
    /**
     * Offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    };

    /**
     * Creates an instance of Coins.
     * @param {number} index - The index of the coin in the level.
     * @param {number} totalCoins - The total number of coins in the level.
     */
    constructor(index, totalCoins) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 800 + Math.random() * 500;
        this.y = 200;

        let startX = 800;
        let endX = 1200;
        let spacing = (endX - startX) / (totalCoins - 1);
        this.x = startX + index * spacing;

        /**
         * The initial y-coordinate of the coin.
         * @type {number}
         */
        this.startY = 300; 
        
        /**
         * The peak height of the coin's trajectory.
         * @type {number}
         */
        this.peakHeight = 100; 
        
        let h = (startX + endX) / 2;
        let k = this.startY - this.peakHeight;

        let a = this.peakHeight / ((startX - h) ** 2);
        this.y = a * (this.x - h) ** 2 + k;

        /**
         * The width of the coin.
         * @type {number}
         */
        this.width = 120;

        /**
         * The height of the coin.
         * @type {number}
         */
        this.height = 120;

        /**
         * The width of the coin when drawn on the canvas.
         * @type {number}
         */
        this.drawWidth = 170; 
        
        /**
         * The height of the coin when drawn on the canvas.
         * @type {number}
         */
        this.drawHeight = 170;
    }
}
