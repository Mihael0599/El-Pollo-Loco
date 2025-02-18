class Cloud extends MovableObject{
    x = Math.random() * 1200;
    y = 20;
    width = 720;

    image_floating = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.image_floating);
        this.speed = 0.7;
        this.animate();
        /* this.moveLeft(); */
    }

    animate(){

    setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60);

    setInterval(() => {
        /* this.playanimation(this.image_floating); */
    }, 200);
    }
}