// Ufo.js

function ufoClass() {


	this.reset = function () {
		this.isActive = false;
		if (Math.random() > 0.5) {
			ufoX = CANVAS_WIDTH - imgUfo.width;
			ufoDirection = -1;
		} else {
			ufoX = imgUfo.width;
			ufoDirection = 1;
		}
		nextUfoArrivalFrame = currentFrame + getRandomIntInclusive(MIN_SECONDS_TO_SPAWN_UFO, MAX_SECONDS_TO_SPAWN_UFO) * FRAMES_PER_SECOND;
	}

	this.spawn = function () {
		sfxUfoSpawned.play();
		ufoSpawned = true;
	}

	this.move = function () {
		if (this.isActive) {
			this.x += this.moveSpeed * this.direction;

			if (this.x < 0 || this.x > CANVAS_WIDTH) {
				this.reset();
			}
		}
	}

	this.draw = function () {
		if (this.isActive) {
			ctx.drawImage(this.img, this.x, this.y);
		}
	}





}
