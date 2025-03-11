/**
 * Global game variables and event listeners.
 */
let canvas = document.getElementById("canvas");;
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
let gameScreen = document.getElementById("gameScreen");
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
    getCanvasTemplate();
    canvas = document.getElementById("canvas");
    playBckgorundMusic();
    initLevel();
    checkMute();
    world = new World(canvas, keyboard);
}

/**
 * Toggles fullscreen mode for the game.
 */
function toggleFullscreen() {
    fullscreen = document.getElementById("gameScreen");
    if (!document.fullscreenElement) {
        if (fullscreen.requestFullscreen) {
            fullscreen.requestFullscreen().then(resizeCanvas);
        } else if (fullscreen.webkitRequestFullscreen) {
            fullscreen.webkitRequestFullscreen().then(resizeCanvas);
        } else if (fullscreen.msRequestFullscreen) {
            fullscreen.msRequestFullscreen().then(resizeCanvas);
        } else if (fullscreen.mozRequestFullScreen) {
            fullscreen.mozRequestFullScreen().then(resizeCanvas);
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
    if (canvas) {
        canvas.width = 720;
        canvas.height = 480;
        controlsFullscreen.style.position = "relative";
        controlsFullscreen.style.right = "-580px";
    }
}

/**
 * Adjusts the canvas size to fit the full screen.
 */
function resizeCanvas() {
    controlsFullscreen = document.getElementById("inGameControls");
    if (canvas) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        controlsFullscreen.style.position = "absolute";
        controlsFullscreen.style.right = "50px";
    }
}

/**
 * Toggles the game sound between mute and unmute.
 */
function toggleMute() {
    soundVolume = soundVolume == 1 ? 0 : 1;
    backgorundMusicVolume = backgorundMusicVolume == 0.1 ? 0 : 0.1;
    backgorundMusic.volume = backgorundMusicVolume;
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
 * Displays the game over screen and stops the game.
 */
function gameover() {
    getGameOverTemplate();
    stopBackgorundMusic();
    clearAllIntervals();
}

/**
 * Displays the win screen when the player wins the game.
 */
function playerWon() {
    getWinTemplate();
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
    getStartScreen();
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

/**
 * Clears the controls and game screen, then renders the canvas.
 */
function getCanvasTemplate() {
    controls.innerHTML = "";
    gameScreen.innerHTML = "";
    gameScreen.innerHTML += renderCanvas();
}

/**
 * Clears the game screen and renders the win screen.
 */
function getWinTemplate() {
    gameScreen.innerHTML = "";
    gameScreen.innerHTML += renderWinScreen();
}

/**
 * Clears the game screen and renders the game over screen.
 */
function getGameOverTemplate() {
    gameScreen.innerHTML = "";
    gameScreen.innerHTML += renderGameOverScreen();
}

/**
 * Clears the game screen and renders the start screen.
 */
function getStartScreen() {
    gameScreen.innerHTML = "";
    gameScreen.innerHTML += renderStartScreen();
}