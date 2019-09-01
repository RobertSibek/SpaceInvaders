// Ufo.js
const UFO_SCORE = 150;
const UFO_Y = 40;
const MOVE_SPEED = 2;
const MIN_SECONDS_TO_SPAWN = 5;
const MAX_SECONDS_TO_SPAWN = 15;

function ufoClass() {

	this.init = function (whichImg) {
		debugText('Ufo initialized');
		this.img = whichImg;
		this.width = this.img.width;
		this.height = this.img.height;
		this.points = UFO_SCORE;
		this.y = UFO_Y;
		this.currentFrame = 0;
		this.canBeSpawned = true;
		this.reset();
	}

	this.reset = function () {
		this.isActive = false;
		// set starting position to left or right side
		if (Math.random() > 0.5) {
			this.x = CANVAS_WIDTH - this.img.width;
			this.direction = -1;
		} else {
			this.x = this.img.width;
			this.direction = 1;
		}
		this.nextTimeToSpawn = this.getNextUfoArrivalTime();
	}

	this.spawn = function () {
		playSound(sfxUfoSpawned);
		this.isActive = true;
	}

	this.destroy = function () {
		playSound(sfxUfoHit);
		this.reset();
		return this.points;
	}

	this.move = function () {
		if (this.isActive) {
			this.x += MOVE_SPEED * this.direction;

			if (this.x < 0 || this.x > CANVAS_WIDTH) {
				this.reset();
			}
		}
	}

	this.draw = function () {
		this.currentFrame++;
		if (this.isActive) {
			ctx.drawImage(this.img, this.x, this.y);
//			this.drawHitBox();
		} else {
			if (this.currentFrame >= this.nextTimeToSpawn &&
			    this.canBeSpawned) {
				this.spawn();
			}
		}
	}
	
	this.drawHitBox = function () {
		drawOutlineRect(this.x, this.y, this.width, this.height, 'blue');
		
	}

	this.getNextUfoArrivalTime = function () {
		var nextArrival = getRandomIntInclusive(MIN_SECONDS_TO_SPAWN, MAX_SECONDS_TO_SPAWN);
		debugText('ufoClass: Next UFO arrival time in ' + nextArrival + ' seconds');
		return (this.currentFrame + nextArrival * FRAMES_PER_SECOND);
	}




}
