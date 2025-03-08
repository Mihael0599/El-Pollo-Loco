/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    
    /**
     * The image of the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for storing multiple image paths and their corresponding images.
     * @type {Object}
     */
    imageCache = {};

    /**
     * The index of the current image used for animations.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The x-coordinate of the object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the object.
     * @type {number}
     */
    y = 120;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 200;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 150;
    
    /**
     * Loads an image from the specified path and sets it as the object's image.
     * @param {string} path - The path of the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn(e);
            console.log(this.img.src);
        }
    }

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - Array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame around the object if it is an instance of certain classes.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottles || this instanceof Coins || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
