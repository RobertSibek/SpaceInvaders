// Player.js

const PL_MOVE_SPEED = 10;
const PL_SHOT_SPEED = 25;
const PL_SHIP_IMAGE = imgSpaceship4;
const PL_SHOT_IMAGE = imgPlayerShot;
const PL_SHIP_OFFSET = 20;

function playerClass() {

	this.init = function () {
		this.x = CX;
		this.nextX = this.x;
		this.ship = PL_SHIP_IMAGE;
		this.shot = PL_SHOT_IMAGE;
		this.y = CANVAS_HEIGHT - this.ship.height - PL_SHIP_OFFSET;
		this.lifes = 3;
		this.shotSpeed = PL_SHOT_SPEED;
	}

	this.reset = function () {
//		this.x = CX;
//		this.nextX = this.x;
	}

	this.changeShip = function (newShip, newShot) {
		this.ship = newShip;
		this.shot = newShot;
	}

	this.move = function () {
		if (keyHeld_Left) {
			this.nextX -= PL_MOVE_SPEED;
		}
		if (keyHeld_Right) {
			this.nextX += PL_MOVE_SPEED;
		}

		if (this.nextX > this.ship.width / 2 &&
			this.nextX < CANVAS_WIDTH - this.ship.width / 2) {
			this.x = this.nextX;
		} else {
			this.nextX = this.x;
		}

	}

	this.draw = function () {
		ctx.drawImage(this.ship, this.x - this.ship.width / 2, this.y, this.ship.width, this.ship.height);
	}
}
