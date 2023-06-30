let level1;

function initLevel1() {
    level1 = new Level(
        [
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new EnemyChicken(),
            new SmallEnemyChicken(),
            new SmallEnemyChicken(),
            new SmallEnemyChicken(),
            new SmallEnemyChicken(),
            new SmallEnemyChicken(),
            new SmallEnemyChicken(),
            new Endboss(),
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Coin(-450, 150),//erst x dann y position
            new Coin(-430, 120),
            new Coin(-410, 90),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Coin(null, null, true),
            new Bottle(-520, 320), //erst x dann y position
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),

        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719, 0), // level nach hinten verlängern
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719, 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 0, 0), //man könnte lange level auch mit einer for-schleife lösen.
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0, 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 719, 0), //weitere hintergründe um 719px verschoben damit kein
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719, 0), //schwarzer überlappungssctreifen entsteht
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 1438, 0), // weitere hintergründe (für längere welt...)
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 1438, 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 1438, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 1438, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3, 0), //einfach mal 3 rechnen oder mal 4, spart man sich das
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),  // rechnen , oder ne for-schleife nehmen
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
        ],
    );
    document.getElementById('looseGame').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
}