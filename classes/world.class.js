class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ]
    backgorund = [
        new BackgorundObject('img/5_background/layers/air.png'),
        new BackgorundObject('img/5_background/layers/3_third_layer/1.png'),
        new BackgorundObject('img/5_background/layers/2_second_layer/1.png'),
        new BackgorundObject('img/5_background/layers/1_first_layer/1.png')
    ]
    canvas;
    ctx;
    keyboard;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld()
    }

    setWorld(){
        this.character.world = this
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
        this.addObjectsToMap(this.backgorund);
        this.addToMap(this.character)
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        this.ctx.save();
        if (mo.otherDirection) {
            this.ctx.translate(mo.x + mo.width, mo.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
        this.ctx.restore();
    }
}