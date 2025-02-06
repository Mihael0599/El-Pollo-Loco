class Cloud extends MovableObject{
    x = Math.random() * 50;
    y = 0;
    width = 720;
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
    }
}