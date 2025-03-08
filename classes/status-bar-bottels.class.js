class StatusBarBottels extends DrawableObject {
    
    /**
     * Array of image paths representing different bottle collection levels.
     * @type {string[]}
     */
    images_bottels = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * The y-coordinate position of the bottle status bar.
     * @type {number}
     */
    y = 70;

    /**
     * The x-coordinate position of the bottle status bar.
     * @type {number}
     */
    x = 0;

    /**
     * The height of the bottle status bar.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the bottle status bar.
     * @type {number}
     */
    width = 200;

    /**
     * The current percentage of collected bottles.
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates an instance of StatusBarBottels.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.images_bottels);
        this.setPercentage(0);
    }

    /**
     * Sets the collected bottle percentage and updates the displayed image accordingly.
     * @param {number} percentage - The collected bottle percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_bottels[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current collected bottle percentage.
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