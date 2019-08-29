const DEFAULT_SHOT_LIFE = 30;
const SHOT_SPEED = 5;
const CL_SHOT = 'red';
const SHOT_WIDTH = 3.5;
const SHOT_HEIGHT = 5;

function shotClass() {

	this.fire = function (x, y) {
		if (!isFiring) {
			this.shotX = x;
			this.shotY = y;
			this.isFiring = true;
		}
	}

	this.move = function () {
		if (this.isFiring) {
			if (this.shotY > 0) {
				this.shotY -= SHOT_SPEED;
			} else {
				this.isFiring = false;
			}

		}

	}

	this.draw = function () {
		if (this.isFiring) {
			colorRect(this.shotX, this.shotY, SHOT_WIDTH, SHOT_HEIGHT, CL_SHOT);
		}

	}

}
