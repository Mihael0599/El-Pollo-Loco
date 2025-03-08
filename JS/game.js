let canvas;
let world;
let keyboard = new Keyboard();
let intro = document.getElementById("intro");
let volumeState = 0;
let gameoverScreen = document.getElementById("gameover");
let winScreen = document.getElementById("winScreen");
let rotatePhone = document.getElementById("rotatePhone")
let soundVolume = 1;
let controlsMobile = document.getElementById("controlsMobile");
let controls = document.getElementById("controls");
let moveLeft = document.getElementById("moveLeft");
let moveRight = document.getElementById("moveRight");
let jump = document.getElementById("jump");
let throwBottle = document.getElementById("throw");


function startGame() {
    canvas = document.getElementById("canvas");
    intro = document.getElementById("intro");
    intro.style.display = "none";
    gameoverScreen.style.display = "none";
    winScreen.style.display = "none";
    canvas.style.display = "block";
    initLevel();
    world = new World(canvas, keyboard);
}


function toggleFullscreen() {
    fullscreen = document.getElementById("fullScreen");
    if (!document.fullscreenElement) {
        if (fullscreen.requestFullscreen) {
            fullscreen.requestFullscreen();
        } else if (fullscreen.webkitRequestFullscreen) {
            fullscreen.webkitRequestFullscreen();
        } else if (fullscreen.msRequestFullscreen) {
            fullscreen.msRequestFullscreen();
        }
    } else {
        exitFullScreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function toggleMute() {
    soundVolume = soundVolume == 1 ? 0 : 1;
    updateMuteIcon();
}


function updateMuteIcon() {
    document.getElementById("volume").src = soundVolume === 0 ? 'img/10_controls/mute.png' : 'img/10_controls/volume.png';
}


function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}

function checkOrientation() {
    let rotatePhone = document.getElementById("rotatePhone");

    if (window.innerWidth < 750 && !isLandscape()) {
        rotatePhone.style.display = "flex";
        controlsMobile.style.display = "none";
        controls.style.display = "none";
    } else if (isLandscape() && window.innerWidth < 750) {
        rotatePhone.style.display = "none";
        controls.style.display = "none";
        controlsMobile.style.display = "flex";
    } else {
        rotatePhone.style.display = "none";
        controlsMobile.style.display = "none";
        controls.style.display = "flex";
    }
}


document.addEventListener("DOMContentLoaded", checkOrientation);
window.addEventListener("resize", checkOrientation);

function gameover() {
    gameoverScreen.style.display = "flex";
    canvas.style.display = "none";
    clearAllIntervals();
}

function playerWon() {
    winScreen.style.display = "flex";
    canvas.style.display = "none";
    clearAllIntervals();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
