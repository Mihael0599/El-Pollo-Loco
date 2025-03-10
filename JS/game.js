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
let controlsMobile = document.getElementById("controlsMobile");
let controls = document.getElementById("controls");
let impressum = document.getElementById("impressum");
let fullscreen = document.getElementById("fullScreen");
let backgorundMusic = new Audio('audio/backgorund-music.mp3');
let soundVolume = localStorage.getItem("Sound") !== null ? parseFloat(localStorage.getItem("Sound")) : 1;
let backgorundMusicVolume = localStorage.getItem("Backgorund Music") !== null ? parseFloat(localStorage.getItem("Backgorund Music")) : 0.1;

/**
 * Initializes the game settings by checking the mute status.
 */
function init() {
    checkMute();
}

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
    playBckgorundMusic();
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
    backgorundMusicVolume = backgorundMusicVolume == 0.1 ? 0 : 0.1;
    updateMuteIcon();
    setToLocalStorage();
}

/**
 * Checks the mute status by retrieving values from local storage.
 * If values are not present, it sets them to default.
 * Updates the mute icon accordingly.
 */
function checkMute() {
    setToLocalStorage()
    soundVolume = parseFloat(localStorage.getItem("Sound"));
    backgorundMusicVolume = parseFloat(localStorage.getItem("Backgorund Music"));
    updateMuteIcon();
}

/**
 * Saves the current sound settings to local storage.
 */
function setToLocalStorage() {
    localStorage.setItem("Sound", soundVolume);
    localStorage.setItem("Backgorund Music", backgorundMusicVolume);
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

    if (window.innerWidth < window.innerHeight && !isLandscape()) {
        rotatePhone.style.display = "flex";
        controlsMobile.style.display = "none";
        controls.style.display = "none";
        intro.style.display = "none";
    } else if (isLandscape() && window.innerWidth > window.innerHeight) {
        rotatePhone.style.display = "none";
        controls.style.display = "none";
        controlsMobile.style.display = "flex";
        intro.style.display = "flex";
    } else {
        rotatePhone.style.display = "none";
        controlsMobile.style.display = "none";
        controls.style.display = "flex";
        intro.style.display = "flex";
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
    stopBackgorundMusic();
    clearAllIntervals();
}

/**
 * Displays the win screen when the player wins the game.
 */
function playerWon() {
    winScreen.style.display = "flex";
    canvas.style.display = "none";
    stopBackgorundMusic();
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
 * Closes the Impressum section and returns back to strat screen.
 */
function closeImpressum() {
    impressum.style.display = "none";
    intro.style.display = "flex";
}

/**
 * plays Background music
 */
function playBckgorundMusic() {
    backgorundMusic.volume = backgorundMusicVolume;
    backgorundMusic.play();
}

/**
 * Stops background music and reset it
 */
function stopBackgorundMusic() {
    backgorundMusic.pause();
    backgorundMusic.currentTime = 0;
}
