class StatusBarBottels extends DrawableObject {
    images_bottels = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    y = 70;
    x = 0;
    height = 50;
    width = 200;
    percentage = 0;

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.images_bottels);
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_bottels[this.resloveImageIndex()]
        this.img = this.imageCache[path];

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