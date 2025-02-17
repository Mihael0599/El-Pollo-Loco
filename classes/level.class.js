class Level {
    enemies;
    clouds;
    coins;
    bottels;
    backgorund;
    level_end_x = 2100;

    constructor(enemies, coins, bottels, clouds, backgorund) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottels = bottels;
        this.clouds = clouds;
        this.backgorund = backgorund;

    }
}