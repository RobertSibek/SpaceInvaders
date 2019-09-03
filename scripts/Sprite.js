function spriteClass() {
	this.init = function (ctx, width, height, image) {

		this.context = ctx;
		this.width = width;
		this.height = height;
		this.image = image;
		this.totalFrames = image.width / width;
		this.delay = 100;
		this.currentFrame = 0;
		this.nextFrame = 0;
		this.x = 0;
		this.y = 0;
	}

	this.animate = function () {
		this.currentFrame++;
		if (this.currentFrame > this.nextFrame) {
			if (this.spriteIndex < this.totalFrames - 1) {
				this.spriteIndex++;
			} else {
				this.spriteIndex = 0;
			}
			this.nextFrame = this.currentFrame + this.delay * FRAMES_PER_SECOND / 1000;
		}
	}
	
	this.move() = function (x, y) {
		this.x = x;
		this.y = y;		
	}

	this.draw = function () {
		this.context.drawImage(this.image, this.spriteIndex * this.width + 3, 4, this.width - 4, this.height - 4, this.x, this.y, this.width, this.height);
	}
}
