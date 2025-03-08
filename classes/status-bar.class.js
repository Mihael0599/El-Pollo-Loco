class StatusBar extends DrawableObject {
    
    /**
     * Array of image paths representing different health levels.
     * @type {string[]}
     */
    images_health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * The y-coordinate position of the status bar.
     * @type {number}
     */
    y = -10;

    /**
     * The x-coordinate position of the status bar.
     * @type {number}
     */
    x = 0;

    /**
     * The height of the status bar.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the status bar.
     * @type {number}
     */
    width = 200;

    /**
     * The current health percentage.
     * @type {number}
     */
    percentage = 500;

    /**
     * Creates an instance of StatusBar.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.images_health);
        this.setPercentage(500);
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The health percentage to be set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current health percentage.
     * @returns {number} The index of the image to be displayed.
     */
    resolveImageIndex() {
        if (this.percentage == 500) {
            return 5;
        } else if (this.percentage >= 400) {
            return 4;
        } else if (this.percentage >= 300) {
            return 3;
        } else if (this.percentage >= 200) {
            return 2;
        } else if (this.percentage >= 100) {
            return 1;
        } else {
            return 0;
        }
    }
}
