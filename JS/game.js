/**
 * Global game variables and event listeners.
 */
let canvas;
let world;
let keyboard = new Keyboard();
let intro = document.getElementById("intro");
let gameoverScreen = document.getElementById("gameover");
let winScreen = document.getElementById("winScreen");
let rotatePhone = document.getElementById("rotatePhone");
let soundVolume = 1;
let controlsMobile = document.getElementById("controlsMobile");
let controls = document.getElementById("controls");
let impressum = document.getElementById("impressum");
let fullscreen = document.getElementById("fullScreen");

/**
 * Starts the game by initializing the level and creating the game world.
 */
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

/**
 * Toggles fullscreen mode for the game.
 */
function toggleFullscreen() {
    fullscreen = document.getElementById("fullScreen");
    if (!document.fullscreenElement) {
        if (fullscreen.requestFullscreen) {
            fullscreen.requestFullscreen();
        } else if (fullscreen.webkitRequestFullscreen) {
            fullscreen.webkitRequestFullscreen();
        } else if (fullscreen.msRequestFullscreen) {
            fullscreen.msRequestFullscreen();
        } else if (fullscreen.mozRequestFullScreen) {
            fullscreen.mozRequestFullScreen();
        }
    } else {
        exitFullScreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Toggles the game sound between mute and unmute.
 */
function toggleMute() {
    soundVolume = soundVolume == 1 ? 0 : 1;
    updateMuteIcon();
}

/**
 * Updates the mute/unmute icon based on the sound volume.
 */
function updateMuteIcon() {
    document.getElementById("volume").src = soundVolume === 0 ? 'img/10_controls/mute.png' : 'img/10_controls/volume.png';
}

/**
 * Checks if the current screen orientation is landscape.
 * @returns {boolean} True if the screen is in landscape mode.
 */
function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}

/**
 * Adjusts game controls and UI elements based on screen orientation.
 */
function checkOrientation() {
    let rotatePhone = document.getElementById("rotatePhone");

    if (window.innerWidth < 750 && !isLandscape()) {
        rotatePhone.style.display = "flex";
        controlsMobile.style.display = "none";
        controls.style.display = "none";
    } else if (isLandscape() && window.innerWidth < 1100) {
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

/**
 * Displays the game over screen and stops the game.
 */
function gameover() {
    gameoverScreen.style.display = "flex";
    canvas.style.display = "none";
    clearAllIntervals();
}

/**
 * Displays the win screen when the player wins the game.
 */
function playerWon() {
    winScreen.style.display = "flex";
    canvas.style.display = "none";
    clearAllIntervals();
}

/**
 * Clears all active intervals to stop animations and timers.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Returns to the start screen from the game over or win screen.
 */
function backToStartScreen() {
    gameoverScreen.style.display = "none";
    winScreen.style.display = "none";
    intro.style.display = "flex";
}

/**
 * Displays the Impressum section and hides the start screen.
 */
function showImpressum() {
    impressum.style.display = "flex";
    intro.style.display = "none";
}

/**
 * Closes the Impressum section when clicking outside of it.
 * @param {Event} event - The event triggered by clicking.
 */
window.onclick = function (event) {
    if (event.target == fullscreen) {
        impressum.style.display = "none";
        intro.style.display = "flex";
    }
}