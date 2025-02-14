class World {
    character = new Character();
    chicken = new Chicken();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottel = new StatusBarBottels();
    thowableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
            this.checkCollisionBottom();
        }, 100);
    }
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.thowableObjects.push(bottle)
        }
    }
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.isHit();
                this.statusBar.setPercentage(this.character.energy)
            }
        })
    }
    checkCollisionBottom(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingBottom(enemy) && !this.character.isEnemyHurt()) {
                this.character.isEnemyHit();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgorund);
        this.addObjectsToMap(this.thowableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottel);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.spinImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.spinImageBack(mo);
        }
    }

    spinImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    spinImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}