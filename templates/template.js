function renderCanvas() {
    return `
            <div class="in-game-controls" id="inGameControls">
                <img onclick="toggleMute()" id="volume" class="volume-img" src="./img/10_controls/volume.png" alt="">
                <img onclick="toggleFullscreen()" id="fullScreenBtn" class="fullscreen-img" src="./img/10_controls/fullscreen.png" alt="">
            </div>
            <canvas id="canvas" width="720px" height="480px"></canvas>
    `;
}

function renderStartScreen() {
    return `
    <div class = start-screen>
        <div class="start-button-container">
            <button class="start-btn" onclick="startGame()">Start</button>
            <div class="fullscreen-volume-container">
                <button class="impressum-btn" onclick="showImpressum()">Impressum</button>
                <img onclick="toggleMute()" id="volume" class="volume-img" src="./img/10_controls/volume.png" alt="">
                <img onclick="toggleFullscreen()" id="fullScreenBtn" class="fullscreen-img" src="./img/10_controls/fullscreen.png" alt="">
            </div>
        </div>
        <div class="controls" id="controls">
            <p>Move Left and Right</p>
            <img class="arrow-img" src="./img/10_controls/arrow_left.png" alt="">
            <img class="arrow-img" src="./img/10_controls/arrow_right.png" alt="">
            <p>Jump</p>
            <img class="space-img" src="./img/10_controls/space.png" alt="">
            <p>Throw Bottle</p>
            <p>D</p>
        </div>
        <div class="controls-mobile" id="controlsMobile">
            <div class="move-buttons">
                <button id="moveLeft" class="control-btns">
                    <img class="arrow-img" src="./img/10_controls/arrow_left.png" alt="">
                </button>
                <button id="moveRight" class="control-btns">
                    <img class="arrow-img" src="./img/10_controls/arrow_right.png" alt="">
                </button>
            </div>
            <div class="jump-throw-buttons">
                <button id="jump" class="control-btns">
                    <img class="arrow-img" src="./img/10_controls/arrow-up.png" alt="">
                </button>
                <button id="throw" class="control-btns">
                    <img class="arrow-img" src="./img/10_controls/throw-arrow.png" alt="">
                </button>
            </div>
        </div>
    </div>
    `;
}

function renderWinScreen() {
    return `
        <div class="win-screen" id="winScreen">
            <div class="btn-container">
                <button class="restart-btn" onclick="startGame()">Play again</button>
                <button class="back-btn" onclick="backToStartScreen()">Leave Game</button>
            </div>
        </div>
    `;
}

function renderGameOverScreen() {
    return `
        <div class="gameover" id="gameover">
            <div class="btn-container">
                <button class="restart-btn" onclick="startGame()">Play again</button>
                <button class="back-btn" onclick="backToStartScreen()">Leave Game</button>
            </div>
        </div>
    `;
}
