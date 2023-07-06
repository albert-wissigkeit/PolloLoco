/**
 * Represents the game world.
 * 
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];
    collectedBottles = 0;
    bottle;
    lastThrowTime = 0;
    isSoundEnabled = true;

    characterWalkSound = new Audio('./audio/character_walk.mp3');
    characterJumpSound = new Audio('./audio/character_jump.mp3');
    characterDeadSound = new Audio('./audio/character_dead.mp3');
    characterLongIdleSound = new Audio('./audio/character_sleep_snoring.mp3');
    characterLHurt = new Audio('./audio/character_damage_1.mp3');

    coinSound = new Audio('./audio/coin.mp3');
    bottleSound = new Audio('./audio/bottle.mp3');
    brokeBottleSound = new Audio('./audio/broken_bottle.mp3');

    chickenSound = new Audio('./audio/chicken.mp3');
    endbossDeadSound = new Audio('./audio/endboss_dead.mp3');

    winSound = new Audio('./audio/win.mp3');
    looseSound = new Audio('./audio/loose_2.mp3');

    backgroundSound = new Audio('./audio/background_guitar.mp3');
    backgroundSoundOn = true;


    /**
    * Creates a new instance of World.
    * 
    * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
    * @param {Keyboard} keyboard - The keyboard input handler.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundSound();
        this.backgroundSound.loop = true;
    }


    /**
     * Plays or pauses the background sound based on the sound settings.
     * 
     */
    playBackgroundSound() {
        if (this.isSoundEnabled && this.backgroundSoundOn) {
            this.backgroundSound.play();
        } else {
            this.backgroundSound.pause();
        }
    }


    /**
     * Sets up the world by assigning the world reference to the character.
     * 
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * runs the game loop to check for collisions and update the game state.
     * 
     */
    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
            this.playBackgroundSound();
        }, 100);
    }


    /**
     * throws a new bottle and pushes a new bottle to te array and updated bottle statusbar
     * 
     */
    checkThrowObjects() {
        if (this.keyboard.F && this.collectedBottles > 0) {
            const currentTime = Date.now();
            if (currentTime - this.lastThrowTime >= 1000) {
                this.bottle = new ThrowableObject(this.character.posX + 75, this.character.posY + 130);
                this.throwableObjects.push(this.bottle);
                this.collectedBottles--;
                this.statusBarBottle.updateBottleStatusBarWhenThrow();
                console.log('current bottles:', this.collectedBottles);
                this.lastThrowTime = currentTime;
            }
        }
    }


    /**
     * Checks for collisions between objects in the world.
     * 
     */
    checkCollisions() {
        this.checkThrowableObjectCollisions();
        this.checkCharacterEnemyCollisions();
        this.checkCharacterCloudCollisions();
    }


    /**
     * Checks for collisions between throwable objects and enemies.
     * 
     */
    checkThrowableObjectCollisions() {
        this.level.enemies.forEach((enemy) => {
            let enemyIndex = this.level.enemies.indexOf(enemy);
            this.throwableObjects.forEach((object) => {
                if (enemy.isDead()) {
                    return;
                }
                if (object.isCollidingEnemy(enemy) && !object.hasHitEnemy) {
                    console.log('Flasche trifft Gegner / objekt', enemy, object);
                    object.hasHitEnemy = true;
                    if (this.isSoundEnabled) {
                        this.brokeBottleSound.play();
                        this.chickenSound.play();
                    }
                    if (enemy instanceof Endboss) {
                        this.handleEndbossCollision(enemy);
                    } else if ((enemy instanceof EnemyChicken || enemy instanceof SmallEnemyChicken) && !enemy.isDead()) {
                        this.handleNormalEnemyCollision(enemy, enemyIndex);
                    }
                    console.log('enemyindex:', enemyIndex);
                }
            });
        });
    }


    /**
     * Handles the collision between the character and enemies.
     * 
     */
    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                let enemyIndex2 = this.level.enemies.indexOf(enemy);
                if (this.character.isAboveGround()) {
                    if (enemy instanceof EnemyChicken && !enemy.isDead() || enemy instanceof SmallEnemyChicken && !enemy.isDead()) {
                        this.handleCharacterJumpCollision(enemy, enemyIndex2);
                    } else {
                        console.log('Character collision with:', enemy);
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                        console.log('after collision energy from character:', this.character.energy);
                    }
                } else {
                    console.log('Character collision with:', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('after collision energy from character:', this.character.energy);
                    if (this.isSoundEnabled) {
                        this.characterLHurt.play();
                        this.characterLongIdleSound.pause();
                    }
                }
            }
        });
    }


    /**
    * Handles the collision between the character and cloud or (coin or bottle) objects.
    * 
    * @param {Cloud} cloud - The cloud object.
    */
    checkCharacterCloudCollisions() {
        this.level.clouds.forEach((cloud) => {
            if (this.character.isColliding(cloud)) {
                if (cloud instanceof Coin) {
                    this.handleCoinCollision(cloud);
                    if (this.isSoundEnabled) {
                        this.coinSound.play();
                    }
                } else if (cloud instanceof Bottle) {
                    this.handleBottleCollision(cloud);
                    if (this.isSoundEnabled) {
                        this.bottleSound.play();
                    }
                }
            }
        });
    }


    /**
    * Handles the collision between throwable objects and the endboss enemy.
    * 
    * @param {Endboss} enemy - The endboss enemy object.
    */
    handleEndbossCollision(enemy) {
        enemy.hit();
        console.log('bottle trifft Endboss Leben:', enemy.energy);
        if (enemy.isDead()) {
            enemy.playAnimation(enemy.IMAGES_DEAD);
            if (this.isSoundEnabled) {
                this.endbossDeadSound.play();
                this.backgroundSoundOn = false;
                this.winSound.play();
            }
            setTimeout(() => {
                document.getElementById('looseGame').classList.remove('d-none');
                for (let i = 1; i < 9999; i++) window.clearInterval(i);
                document.getElementById('startButton').classList.remove('d-none');
                document.getElementById('winGameInfos').classList.add('d-flex');
                document.getElementById('winGameInfos').innerHTML = /*html*/`
                    Gewonnen! Du hast ${this.statusBarCoin.countSessionCoins} Punkte erreicht, Glückwunsch!
                `;
            }, 1500);
        } else {
            enemy.playAnimation(enemy.IMAGES_HURT);
            enemy.intervalId = setInterval(() => {
                if (enemy.energy > 0) {
                    enemy.playAnimation(enemy.IMAGES_WALK);
                    enemy.posX -= 5;
                }
            }, 100);
        }
    }


    /**
    * Handles the collision between throwable objects and normal enemies.
    * 
    * @param {Enemy} enemy - The enemy object.
    * @param {number} enemyIndex - The index of the enemy in the enemies array.
    */
    handleNormalEnemyCollision(enemy, enemyIndex) {
        enemy.hit();
        console.log('bottle trifft normalen Gegner Leben:', enemy.energy);
        if (enemy.isDead()) {
            enemy.playAnimation(enemy.IMAGES_DEAD);
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 3000);
        }
    }


    /**
    * Handles the collision between the character and enemies when jumping on them.
    * 
    * @param {Enemy} enemy - The enemy object.
    * @param {number} enemyIndex - The index of the enemy in the enemies array.
    */
    handleCharacterJumpCollision(enemy, enemyIndex) {
        enemy.hit();
        console.log('springe auf gegner !! leben:', enemy.energy);
        if (enemy.isDead()) {
            enemy.playAnimation(enemy.IMAGES_DEAD);
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 3000);
        }
    }


    /**
    * Handles the collision between the character and a coin object.
    * 
    * @param {Coin} coin - The coin object.
    */
    handleCoinCollision(coin) {
        console.log('Character collided with coin:', coin);
        this.removeCoin(coin);
        this.statusBarCoin.updateCoinStatusBar();
        this.statusBarCoin.countSessionCoins++;
        console.log('session coins:', this.statusBarCoin.countSessionCoins);
    }


    /**
    * Handles the collision between the character and a bottle object.
    * 
    * @param {Bottle} bottle - The bottle object.
    */
    handleBottleCollision(bottle) {
        console.log('Character collided with bottle:', bottle);
        this.removeBottle(bottle);
        this.statusBarBottle.updateBottleStatusBar();
        this.collectedBottles++;
        console.log('current bottles:', this.collectedBottles);
    }


    /**
    * Removes a coin object from the clouds array.
    * 
    * @param {Coin} coin - The coin object to remove.
    */
    removeCoin(coin) {
        let coinIndex = this.level.clouds.indexOf(coin);
        if (coinIndex !== -1) {
            this.level.clouds.splice(coinIndex, 1);
        }
    }


    /**
    * Removes a bottle object from the clouds array.
    * 
    * @param {Bottle} bottle - The bottle object to remove.
    */
    removeBottle(bottle) {
        let bottleIndex = this.level.clouds.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.level.clouds.splice(bottleIndex, 1);
        }
    }


    /**
     * Draws the game world.
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // verschiebt die kamera x nach links , y wird um 0 verschoben
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); //verschiebt die kamera zurück damit die statusbar nicht bewegt wird (ende des verschiebens)
        // ---------------------------- space for fixed objects---------------------------------------
        this.addToMap(this.statusBar); //fügt die statusbar zur map hinzu
        this.addToMap(this.statusBarBottle); //fügt die statusbar zur map hinzu
        this.addToMap(this.statusBarCoin); //fügt die statusbar zur map hinzu
        this.ctx.translate(this.camera_x, 0); // verschiebt die kamera wieder damit sich alle bilder bewegen wie oben bei dem selben code

        this.addToMap(this.character);   //neu, so muss man nur 1 variable weitergeben rest geht automatisch
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); // verschiebt die kamera wieder zurück

        let self = this;    // das wort this. funktioniert in einer function in einer function nicht deswegen wird self initialisiert
        requestAnimationFrame(function () { //sooft die grafikkarte kann (FPS) wird die funktion hier ausgeführt
            self.draw();                    //sie ruft in dem sinne this.draw() auf also sich selber asynchron auf
        });                                  // aber erst wenn alles vorherige in der draw() geladen ist
    }


    /**
    * Adds an array of objects to the map for rendering.
    * 
    * @param {DrawableObject[]} objects - The objects to add to the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }


    /**
    * Adds an object to the map for rendering.
    * 
    * @param {DrawableObject} object - The object to add to the map.
    */
    addToMap(object) {
        if (object.otherDirection) {
            this.saveAndMirrorImage(object);
        }
        try {
            object.draw(this.ctx);
            // object.drawFrameBorder(this.ctx); // malt die collisionsboxen um die characters und coins etc.
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image:', object.img.src);
        }
        if (object.otherDirection) {
            this.restoreAndMirrorImageBack(object);
        }
    }


    /**
    * Saves the current canvas state, applies mirroring transformation, and adjusts the position of the object accordingly.
    * 
    * @param {DrawableObject} object - The object to mirror.
    */
    saveAndMirrorImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.posX = object.posX * -1;
    }


    /**
    * Restores the canvas state and reverses the mirroring transformation applied to the object.
    * 
    * @param {DrawableObject} object - The object to restore and un-mirror.
    */
    restoreAndMirrorImageBack(object) {
        object.posX = object.posX * -1;
        this.ctx.restore();
    }
}