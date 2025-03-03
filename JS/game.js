let canvas;
let world;
let keyboard = new Keyboard();
let intro = document.getElementById("intro");
let volumeState = 1;

function startGame() {
    canvas = document.getElementById("canvas");
    intro = document.getElementById("intro");
    intro.style.display = "none";
    canvas.style.display = "block";
    initLevel();
    world = new World(canvas, keyboard);
}

function toggleFullscreen() {
    fullscreen = document.getElementById("body");
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
    }else if(fullscreen.webkitRequestFullscreen){
        fullscreen.webkitRequestFullscreen();
    }else if(fullscreen.msRequestFullscreen){
        fullscreen.msRequestFullscreen();
    }
}

function toggleMute() {
    volume = document.getElementById("volume");

    switch (volumeState) {
        case 1:
            volume.src = 'img/10_controls/mute.png';
            volumeState = 2;
            break;
    
        case 2:
            volume.src = 'img/10_controls/volume.png';
            volumeState = 1;
            break;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.UP = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

document.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})
