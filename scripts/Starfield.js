// Starfield.js - render starfield background as separate layers

/*
	TODO:
		[] implement star blinking based on the distance from vertical center

*/

const DEFAULT_LAYERS = 3;
const MAX_LAYERS = 10;
const MAX_STARS_PER_LAYER = 30;

var starBrightness = ['#111111', '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888',
				  '#999999', '#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE', '#FFFFFF'];
const MAX_STAR_POWER = starBrightness.length;

var starfieldArray = [];

function starClass() {
	this.init = function (x, y) {
		this.x = x;
		this.y = y;
		this.starRadius = 1;
		//		this.bri++ghtness = 4;
	}
	this.getPos = function () {
		return {
			x: this.x,
			y: this.y
		}
	}
	this.setPos = function (x, y) {
		this.x = x;
		this.y = y;
	}
}

function starfieldClass() {

	this.init = function () {
		debugText('starfieldClass: Starfield initialized');
		this.layerCount = DEFAULT_LAYERS;
		this.currentFrame = 0;
		this.dynamicLayers = false;
		this.speedX = 1;
		this.power = 10;
		this.reset();
	}

	this.setPower = function (power) {
		var newPower = this.power + power;
		if (newPower < 0) {
			newPower = 0;
		}
		if (newPower > MAX_STAR_POWER - 1) {
			newPower = MAX_STAR_POWER - 1;
		}
		this.power = newPower;
		return newPower;
	}

	this.reset = function () {
		this.timeToChange = this.currentFrame + getRandomIntInclusive(5, 20) * FRAMES_PER_SECOND;
		if (this.dynamicLayers) {
			this.moveSpeedX = getRandomIntInclusive(-2, 2);
		} else {
			starfield.moveSpeedX = 0;
		}
		debugText('starfieldClass: moveSpeedX = ' + this.moveSpeedX);
		for (var l = 0; l < this.layerCount; l++) {
			var starArray = [];
			for (var s = 0; s < MAX_STARS_PER_LAYER; s++) {
				var star = new starClass();
				var posX = getRandomIntInclusive(0, CANVAS_WIDTH);
				var posY = getRandomIntInclusive(0, CANVAS_HEIGHT);
				star.init(posX, posY);
				starArray.push(star);
			}
			starfieldArray.push(starArray);
		}
	}

	this.switchDynamicLayers = function () {
		if (this.dynamicLayers) {
			this.dynamicLayers = false;
			this.reset();
			return false;
		} else {
			this.dynamicLayers = true;
			this.reset();
			return true;
		}	
	}

	this.addLayer = function () {
		if (this.layerCount < MAX_LAYERS) {
			this.layerCount++;
			this.reset();
			debugText('starfieldClass: Layer added (total ' + this.layerCount + ')');
		} else {
			debugText('starfieldClass: maximum number of layers reached');
		}
	}

	this.removeLayer = function () {
		if (this.layerCount > 0) {
			this.layerCount--;
			this.reset();
			debugText('starfieldClass: Layer removed (total ' + this.layerCount + ')');
		} else {
			debugText('starfieldClass: 0 layers already');
		}
	}

	this.move = function () {
		this.currentFrame++;
		for (var l = 0; l < this.layerCount; l++) {
			stars = starfieldArray[l];
			var layerMoveSpeedY = getRandomIntInclusive(1, 3);
			for (var s = 0; s < stars.length; s++) {
				var star = stars[s];
				var newX = star.x + this.moveSpeedX;
				var newY = star.y + layerMoveSpeedY;
				if (newY > CANVAS_HEIGHT) {
					newY = 0;
				}
				if (newX > CANVAS_WIDTH) {
					newX = 0;
				}
				if (newX < 0) {
					newX = CANVAS_WIDTH;
				}
				star.setPos(newX, newY);
			}
		}

		if (this.currentFrame > this.timeToChange) {
			debugText('starfieldClass: wind of change arrived');
			if (this.dynamicLayers) {
				if (getDiceRoll()) {
					this.addLayer();
				} else {
					this.removeLayer();
				}
			}
			this.timeToChange = this.currentFrame + getRandomIntInclusive(2, 10) * FRAMES_PER_SECOND;
		}
	}

	this.draw = function () {
		for (var l = 0; l < this.layerCount; l++) {
			stars = starfieldArray[l];
			for (var s = 0; s < stars.length; s++) {
				var star = stars[s];
				var pos = star.getPos();
				colorCircle(pos.x, pos.y, star.starRadius, starBrightness[this.power]);
			}
		}

	}


}
