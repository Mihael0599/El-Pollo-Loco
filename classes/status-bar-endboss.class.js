class StatusBarEndboss extends DrawableObject {
    
    /**
     * Array of image paths representing different health levels of the Endboss.
     * @type {string[]}
     */
    images_health_endboss = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png',
    ];

    /**
     * The y-coordinate position of the Endboss status bar.
     * @type {number}
     */
    y = -5;

    /**
     * The x-coordinate position of the Endboss status bar.
     * @type {number}
     */
    x = 490;

    /**
     * The height of the Endboss status bar.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the Endboss status bar.
     * @type {number}
     */
    width = 220;

    /**
     * The current health percentage of the Endboss.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of StatusBarEndboss.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/100.png');
        this.loadImages(this.images_health_endboss);
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The health percentage of the Endboss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_health_endboss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the Endboss's current health percentage.
     * @returns {number} The index of the image to be displayed.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
