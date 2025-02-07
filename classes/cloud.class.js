class Cloud extends MovableObject{
    x = Math.random() * 50;
    y = 20;
    width = 720;

    image_floating = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.image_floating)
        this.moveLeft();
    }
}