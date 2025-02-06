class MovableObject{
    x = 120;
    y = 120;
    img;
    height = 200;
    width = 150;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    moverRight(){
        console.log("Moving Right")

    }

    moveLeft(){

    }

}