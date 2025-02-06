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
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
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

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}