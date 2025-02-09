class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgorund = level1.backgorund;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;


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
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgorund);
        this.addToMap(this.character)
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.ctx.translate(-this.camera_x, 0);
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