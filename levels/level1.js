/**
 * @name level1
 * @type {Level}
 * @desc Represents the Level 1 of the game.
 */
let level1;


/**
 * This function generates a level with all infos about enemies, backgrounds and collectable items
 * 
 */
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
            new Endboss(2270, 70), //richtiger endboss
            // new Endboss(400, 70), // test endboss für dmg tests
            // new Endboss(null, 70, true), // so könnte man einen endboss random spawnen lassen
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Coin(-450, 150),//erst x dann y position für feste positionierung von coins
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
            new Bottle(-520, 320), //erst x dann y position für feste positionierung von bottles
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            new Bottle(null, null, true),
            // new Bottle(-520, 320), //ab hier flaschen löschen für standart menge!
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
            // new Bottle(-520, 320),
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719, 0), 
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719, 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 0, 0), 
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0, 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 719, 0), 
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719, 0), 
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 1438, 0), 
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 1438, 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 1438, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 1438, 0),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3, 0), 
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),  
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
        ],
    );
    document.getElementById('looseGame').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('startGame').classList.add('d-none');
    document.getElementById('winGameInfos').classList.remove('d-flex');
    document.getElementById('stopSoundButton').classList.remove('d-none');
    document.getElementById('bigSoundImage').src = './img/mobil_icons/icons8-ton-100.png';
    document.getElementById('bigSoundImageSmall').src = './img/mobil_icons/icons8-ton-100.png';
    soundOn = true;
}