class Bottles extends DrawableObject {

    offset = {
        top: 20,
        bottom: 10,
        left: 45,
        right: 20
    };


    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.width = 100;
        this.height = 100;
        this.y = 330;
        this.x = 200 + Math.random() * 1000;
    }
}