// Player.js

const PL_MOVE_SPEED = 10;
const PL_SHOT_SPEED = 10;
const PL_SHOT_SPEED_BOOST = 30;
const PL_SHIP_OFFSET = 20;

function playerClass() {

	this.init = function (shipImg, shotImg) {
		this.x = CX;
		this.nextX = this.x;
		this.ship = shipImg;
		this.shot = shotImg;
		this.y = CANVAS_HEIGHT - this.ship.height - PL_SHIP_OFFSET;
		this.lifes = 3;
		this.shotSpeed = PL_SHOT_SPEED;
        this.showHitbox = false;
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
    
	this.drawHitBox = function () {
		if (this.showHitbox) {
			drawOutlineRect(this.x - this.ship.width / 2, this.y, this.ship.width, this.ship.height, 'blue');
		}
	}    

	this.draw = function () {
		ctx.drawImage(this.ship, this.x - this.ship.width / 2, this.y, this.ship.width, this.ship.height);
        this.drawHitBox();
	}
}
