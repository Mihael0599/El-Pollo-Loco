let canvas;
let ctx;

let world = new Character();


function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    console.log('My character is', world.character);
    console.log("test");
}
