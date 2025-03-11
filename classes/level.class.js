class Level {
    
    /**
     * Array of enemy objects present in the level.
     * @type {Object[]}
     */
    enemies;

    /**
     * Array of cloud objects in the level.
     * @type {Object[]}
     */
    clouds;

    /**
     * Array of coin objects in the level.
     * @type {Object[]}
     */
    coins;

    /**
     * Array of bottle objects in the level.
     * @type {Object[]}
     */
    bottles;

    /**
     * Array of background objects in the level.
     * @type {Object[]}
     */
    background;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 4000;

    /**
     * Creates an instance of Level.
     * @param {Object[]} enemies - The enemies present in the level.
     * @param {Object[]} coins - The coins scattered throughout the level.
     * @param {Object[]} bottles - The bottles that can be collected in the level.
     * @param {Object[]} clouds - The clouds present in the background.
     * @param {Object[]} background - The background elements of the level.
     */
    constructor(enemies, coins, bottles, clouds, background) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.background = background;
    }
}
