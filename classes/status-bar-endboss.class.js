class StatusBarEndboss extends DrawableObject {

images_health_endboss = [
    'img/7_statusbars/2_statusbar_endboss/0.png',
    'img/7_statusbars/2_statusbar_endboss/20.png',
    'img/7_statusbars/2_statusbar_endboss/40.png',
    'img/7_statusbars/2_statusbar_endboss/60.png',
    'img/7_statusbars/2_statusbar_endboss/80.png',
    'img/7_statusbars/2_statusbar_endboss/100.png',
];
    y = -5;
    x = 490;
    height = 60;
    width = 220;
    percentage = 100;

    constructor() {
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/100.png');
        this.loadImages(this.images_health_endboss)
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_health_endboss[this.resloveImageIndex()]
        this.img = this.imageChace[path];

    }

    resloveImageIndex() {
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