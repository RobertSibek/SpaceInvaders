// Ufo.js

const UFO_SCORE = 150;
const UFO_Y = 50;
const MOVE_SPEED = 2;
const MIN_SECONDS_TO_SPAWN = 4;
const MAX_SECONDS_TO_SPAWN = 15;


function ufoClass() {
    this.sprite = new spriteClass();


    this.init = function (whichImg) {
        console.log('ufoClass: Ufo initialized');
        this.img = whichImg;
        this.sprite.init(whichImg, 5, 6);
        this.totalFrames = 6;
        this.width = this.img.width / this.totalFrames;
        this.height = this.img.height;
        this.points = UFO_SCORE;
        this.y = UFO_Y;
        this.currentFrame = 0;
        this.nextFrame = 0;
        this.canBeSpawned = true;
        this.spriteIndex = 0;
        this.delay = 100;
        //		this.showHitbox = false;
        this.reset();
    }

    this.displayHitbox = function (isEnabled) {
        this.sprite.showHitbox = isEnabled;
    }

    this.reset = function () {
        this.isActive = false;
        // set starting position to left or right side
        if (getDiceRoll()) {
            this.x = CANVAS_WIDTH;
            this.direction = -1;
        } else {
            this.x = 0;
            this.direction = 1;
        }
        this.nextTimeToSpawn = this.getNextUfoArrivalTime();
    }

    this.spawn = function () {
        playSound(sounds["ufoSpawned"]);
        this.isActive = true;
    }

    this.destroy = function (wave) {
        playSound(sounds["ufoHit"]);
        this.reset();
        return this.points * wave;
    }

    this.move = function () {
        this.currentFrame++;
        if (this.currentFrame > this.nextFrame) {
            if (this.spriteIndex < this.totalFrames - 1) {
                this.spriteIndex++;
            } else {
                this.spriteIndex = 0;
            }
            this.nextFrame = this.currentFrame + this.delay * FRAMES_PER_SECOND / 1000;
        }

        if (this.isActive) {
            this.x += MOVE_SPEED * this.direction;

            if (this.x < 0 || this.x > CANVAS_WIDTH) {
                this.reset();
            }

            this.sprite.move(this.x, UFO_Y);
        }
    }

    this.draw = function () {
        if (this.isActive) {
            this.sprite.draw(0.4);
        } else {
            if (this.currentFrame >= this.nextTimeToSpawn &&
                this.canBeSpawned) {
                this.spawn();
            }
        }
    }

    this.drawHitBox = function () {
        if (this.showHitbox) {
            drawOutlineRect(this.x, this.y, this.width, this.height, 'blue');
        }
    }

    this.getNextUfoArrivalTime = function () {
        var nextArrival = getRandomIntInclusive(MIN_SECONDS_TO_SPAWN, MAX_SECONDS_TO_SPAWN);
        debugText('ufoClass: Next UFO arrival time in ' + nextArrival + ' seconds');
        return (this.currentFrame + nextArrival * FRAMES_PER_SECOND);
    }
}
