class Level {
    enemies;
    clouds;
    coins;
    bottles;
    background;
    level_end_x = 3000;

    constructor(enemies, coins, bottles, clouds, background) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.background = background;

    }
}