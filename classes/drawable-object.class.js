class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 120;
    height = 200;
    width = 150;
    


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn(e);
            console.log(this.img.src);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottles || this instanceof Coins || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

/*     drawFrameItems(ctx){
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y + 120, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    } */

/*         drawFrameItems(ctx) {
            if (this instanceof ThrowableObject) {
                this.testCollisionOffsets(
                    ctx, 
                    this.x, 
                    this.y, 
                    this.width, 
                    this.height, 
                    this.offset.left, 
                    this.offset.right, 
                    this.offset.top, 
                    this.offset.bottom
                );
            }
        }

        testCollisionOffsets(ctx, x, y, width, height, offsetLeft, offsetRight, offsetTop, offsetBottom) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(
                x + offsetLeft, 
                y + offsetTop, 
                width - offsetLeft - offsetRight, 
                height - offsetTop - offsetBottom
            );
            ctx.stroke();
        } */
}