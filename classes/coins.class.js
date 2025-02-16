class Coins extends DrawableObject {
    constructor(index, totalCoins) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 800 + Math.random() * 500;
        this.y = 200;

        let startX = 800;
        let endX = 1200;
        let spacing = (endX - startX) / (totalCoins - 1);
        this.x = startX + index * spacing;

        this.startY = 300;         
        this.peakHeight = 100;     
        let h = (startX + endX) / 2;
        let k = this.startY - this.peakHeight;

        let a = this.peakHeight / ((startX - h) ** 2);
        this.y = a * (this.x - h) ** 2 + k;

        this.width = 120;
        this.height = 120;

        this.drawWidth = 170; 
        this.drawHeight = 170;
    }
}