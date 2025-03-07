let canvas;
let world;
let keyboard = new Keyboard();
let intro = document.getElementById("intro");
let volumeState = 0;
let gameoverScreen = document.getElementById("gameover");
let winScreen = document.getElementById("winScreen");
let rotatePhone = document.getElementById("rotatePhone")
let soundVolume = 1;

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
    fullscreen = document.getElementById("body");
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) {
        fullscreen.webkitRequestFullscreen();
    } else if (fullscreen.msRequestFullscreen) {
        fullscreen.msRequestFullscreen();
    }
}

function toggleMute() {
    soundVolume = soundVolume == 1 ? 0 : 1;
    updateMuteIcon();
}


function updateMuteIcon() {
    document.getElementById("volume").src = soundVolume === 0  ? 'img/10_controls/mute.png' : 'img/10_controls/volume.png';
}


/* window.onresize = function () {
    applyOrientation();
}

function applyOrientation() {
    let rotatePhone = document.getElementById("rotatePhone");

    if (window.innerWidth < window.innerHeight) {
        rotatePhone.style.display = "flex";
    } else {
        rotatePhone.style.display = "none";
    }
} */


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
