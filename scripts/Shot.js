const DEFAULT_SHOT_LIFE = 30;
const DEFAULT_SHOT_SPEED = 5;
const CL_SHOT = 'red';
const SHOT_WIDTH = 3.5;
const SHOT_HEIGHT = 5;
const SHOT_SLOWDOWN_MULT = 1;

function shotClass() {


	this.fire = function (x, y, whichImg) {
		if (!isFiring) {
			this.shotSpeed = DEFAULT_SHOT_SPEED;
			this.x = x;
			this.y = y;
			this.isFiring = true;
			this.shotImg = whichImg;
			this.halfWidth = this.shotImg.width / 2;
			this.halfHeight = this.shotImg.height / 2;
		}
	}

	this.move = function () {
		if (this.isFiring) {
			if (this.y > 0) {
				this.y -= this.shotSpeed;
				this.shotSpeed *= SHOT_SLOWDOWN_MULT;
			} else {
				this.isFiring = false;
			}
			// update hitbox
			this.hitBoxX1 = this.x - this.halfWidth;
			this.hitBoxX2 = this.shotImg.width ;
			this.hitBoxY1 = this.y - this.halfHeight;
			this.hitBoxY2 = this.shotImg.height;
		}

	}

	this.drawHitBox = function () {
		drawOutlineRect(this.hitBoxX1, this.hitBoxY1, this.hitBoxX2, this.hitBoxY2, 'yellow');
	}
	
	this.drawCenter = function () {
		const LENGTH = 20;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(this.x - LENGTH, this.y);
		ctx.lineTo(this.x + LENGTH, this.y);
		ctx.moveTo(this.x, this.y - LENGTH);
		ctx.lineTo(this.x, this.y + LENGTH);
		ctx.stroke();
	}	

	this.draw = function () {
		if (this.isFiring) {
			ctx.drawImage(this.shotImg,
				this.x - this.shotImg.width / 2,
				this.y - this.shotImg.height / 2,
				this.shotImg.width,
				this.shotImg.height);
//			this.drawHitBox();
//			this.drawCenter();
		}
	}

}
