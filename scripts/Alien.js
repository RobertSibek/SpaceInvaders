// Alien.js

const ALIEN_MAX_X = CANVAS_WIDTH - 10;
const ALIEN_MIN_X = 10;
var alienMoveSpeed = 1;
var alienDescentSpeed = 5;

function alienClass() {
	this.tag = 'none';
	this.showTags = true;

	this.spawn = function (x, y, whichImg) {
		this.x = x;
		this.y = y;
		this.nextX = this.x;
		this.alienImg = whichImg;
		this.halfWidth = this.alienImg.width / 2;
		this.halfHeight = this.alienImg.height / 2;
		this.tag = 'none';
		this.isAlive = true;
	}

	this.spawn = function (x, y, whichImg, tagName) {
		this.x = x;
		this.y = y;
		this.nextX = this.x;
		this.alienImg = whichImg;
		this.halfWidth = this.alienImg.width / 2;
		this.halfHeight = this.alienImg.height / 2;
		this.isAlive = true;
		this.tag = tagName;
		debugText(tagName + ' spawned at ' + x + ',' + y);
	}


	this.move = function () {


		if (this.isAlive) {
			this.nextX = this.x + alienMoveSpeed;
			if (this.nextX > ALIEN_MIN_X && this.nextX < ALIEN_MAX_X) {
				this.x = this.nextX;
			}

			if (this.nextX <= ALIEN_MIN_X || this.nextX >= ALIEN_MAX_X) {
				alienMoveSpeed *= -1;
				this.y += alienDescentSpeed;
			}

			this.hitBoxX1 = this.x - this.alienImg.width / 2;
			this.hitBoxX2 = this.alienImg.width;
			this.hitBoxY1 = this.y - this.alienImg.height / 2;
			this.hitBoxY2 = this.alienImg.height;
		}
	}

	this.drawHitBox = function () {
		drawOutlineRect(this.hitBoxX1, this.hitBoxY1, this.hitBoxX2, this.hitBoxY2, 'blue');
	}

	this.drawCenter = function () {
		const LENGTH = 35;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(this.x - LENGTH, this.y);
		ctx.lineTo(this.x + LENGTH, this.y);
		ctx.moveTo(this.x, this.y - LENGTH);
		ctx.lineTo(this.x, this.y + LENGTH);
		ctx.stroke();
	}

	this.draw = function () {
		if (this.isAlive) {
			ctx.drawImage(this.alienImg,
				this.x - this.alienImg.width / 2,
				this.y - this.alienImg.height / 2,
				this.alienImg.width,
				this.alienImg.height
			);
			if (this.showTags) {
				drawText(this.x, this.y - 20, this.tag, 'yellow');
			}
			this.drawHitBox();
			this.drawCenter();
		}

	}

	this.beenHit = function (thisShot) {
		debugText('Checking shot hitbox against ' + this.tag);
		var leftX, rightX, topY, bottomY;

		leftX = this.hitBoxX1;
		rightX = this.hitBoxX2;
		topY = this.hitBoxY1;
		bottomY = this.hitBoxY2;

		if (thisShot.x < leftX ||
			thisShot.x > rightX ||
			thisShot.y < topY ||
			thisShot.y > bottomY) {
			return false;
		} else {
			return true;
		}
	}

	this.destroy = function () {
		this.isAlive = false;
	}



}
