class Keyboard {
    
    /**
     * Indicates if the left arrow or touch button is pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates if the right arrow or touch button is pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates if the space bar or jump touch button is pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates if the up arrow key is pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates if the down arrow key is pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates if the 'D' key or throw touch button is pressed.
     * @type {boolean}
     */
    D = false;

    /**
     * Creates an instance of the Keyboard class and binds event listeners.
     */
    constructor() {
        this.bindButtonsPressEvents();
        this.bindKeyPressEvents();
    }

    /**
     * Binds touch events to on-screen control buttons.
     */
    bindButtonsPressEvents() {
        document.getElementById("moveLeft").addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        }, { passive: false });

        document.getElementById("moveLeft").addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        }, { passive: false });

        document.getElementById("moveRight").addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        }, { passive: false });

        document.getElementById("moveRight").addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        }, { passive: false });

        document.getElementById("jump").addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        }, { passive: false });

        document.getElementById("jump").addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        }, { passive: false });

        document.getElementById("throw").addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        }, { passive: false });

        document.getElementById("throw").addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        }, { passive: false });
    }

    /**
     * Binds keyboard events to control the character.
     */
    bindKeyPressEvents() {
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
                keyboard.DOWN = true;
            }
            if (e.keyCode == 68) {
                keyboard.D = true;
            }
        });
        
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
        });
    }
}
