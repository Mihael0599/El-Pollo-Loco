class StatusBarCoins extends DrawableObject {
    images_coins = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
  
    y = 30;
    x = 0;
    height = 50;
    width = 200;
    percentage = 0;
  
    constructor() {
      super();
      // Lade zunächst das 100%-Bild
      this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
      this.loadImages(this.images_coins);
      this.setPercentage(0);
    }
  
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.resloveImageIndex();
      this.img = this.imageChace[path];
    }
  
    resloveImageIndex() {
      // Hier wird anhand der Prozentzahl der Index bestimmt.
      // Falls du z.B. pro eingesammelten Coin 10 Punkte erhältst, und 100 das Maximum ist:
      if (this.percentage >= 100) {
        return this.images_coins[5];
      } else if (this.percentage > 80) {
        return this.images_coins[4];
      } else if (this.percentage > 60) {
        return this.images_coins[3];
      } else if (this.percentage > 40) {
        return this.images_coins[2];
      } else if (this.percentage > 20) {
        return this.images_coins[1];
      } else {
        return this.images_coins[0];
      }
    }
  }