class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgorund;
    level_end_x = 2100;

    constructor(enemies, coins, bottles, clouds, backgorund) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgorund = backgorund;

    }
}