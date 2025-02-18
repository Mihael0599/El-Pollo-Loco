const level1 = new Level(
    [
/*     new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(), */
],
[
    new Coins (0, 5),
    new Coins (1, 5),
    new Coins (2, 5),
    new Coins (3, 5),
    new Coins (4, 5),
],
[
    new Bottles(),
/*     new Bottles(),
    new Bottles(),
    new Bottles(), */
],
[
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),

],
[
    new BackgorundObject('img/5_background/layers/air.png', -719),
    new BackgorundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgorundObject('img/5_background/layers/2_second_layer/2.png', -719),
    new BackgorundObject('img/5_background/layers/1_first_layer/2.png', -719),

    new BackgorundObject('img/5_background/layers/air.png', 0),
    new BackgorundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgorundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgorundObject('img/5_background/layers/1_first_layer/1.png', 0),
    new BackgorundObject('img/5_background/layers/air.png', 719),
    new BackgorundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgorundObject('img/5_background/layers/2_second_layer/2.png', 719),
    new BackgorundObject('img/5_background/layers/1_first_layer/2.png', 719),

    new BackgorundObject('img/5_background/layers/air.png', 719*2),
    new BackgorundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgorundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgorundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
    new BackgorundObject('img/5_background/layers/air.png', 719*3),
    new BackgorundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgorundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgorundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
]
) 