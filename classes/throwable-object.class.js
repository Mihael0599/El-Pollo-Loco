class ThrowableObject extends MovableObject{

    images_throw_bottle = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y, isCharachterMovingLeft){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_throw_bottle);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.isCharachterMovingLeft = isCharachterMovingLeft;
        this.throw();
    }

    throw(){
        this.speedY = 25;
        this.applyGravity();
        let throwDirection = this.isCharachterMovingLeft ? -40 : 40;
        setInterval(() => {
           this.x += throwDirection; 
        }, 100);
    }
}