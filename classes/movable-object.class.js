class MovableObject{
    x = 120;
    y = 120;
    img;
    height = 200;
    width = 150;
    imageChace = {};
    currentImage = 0;
    speed = 0.15;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChace[path] = img;
        });
    }

    moverRight(){
        console.log("Moving Right")

    }

    moveLeft(){
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}