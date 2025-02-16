class Bottles extends DrawableObject {
    x = 300 + Math.random() * 3000;

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.width = 100;
        this.height = 100;
        this.y = 330;
    }
}