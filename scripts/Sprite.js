const FRAMES_PER_SECONDS = 15;

function spriteClass() {
    this.init = function (image, cols, rows) {
        this.sheetWidth = image.width;
        this.sheetHeight = image.height;
        this.frameWidth = this.sheetWidth / cols;
        this.frameHeight = this.sheetHeight / rows;
        this.image = image;
        this.totalFrames = cols * rows;
        this.cols = cols;
        this.rows = rows;
        this.spriteIndex = 0;
        this.delay = 100;
        this.currentFrame = 0;
        this.nextFrame = 0;
        this.x = CX;
        this.y = CY;
        this.showHitbox = false;
    }

    this.animate = function () {
        this.currentFrame++;
        if (this.currentFrame > this.nextFrame) {
            if (this.spriteIndex < this.totalFrames - 1) {
                this.spriteIndex++;
            } else {
                this.spriteIndex = 0;
            }
            this.nextFrame = this.currentFrame + this.delay * FRAMES_PER_SECONDS / 1000;
        }
    }

    this.move = function (x, y) {
        this.animate();
        this.x = x;
        this.y = y;
    }
    
	this.drawHitbox = function () {
		if (this.showHitbox) {
			drawOutlineRect(this.x, this.y, this.frameWidth * this.scale, this.frameHeight * this.scale, 'blue');
		}
	}    

    this.draw = function (scale) {
        this.scale = scale;
        var x = this.spriteIndex % this.cols;
        var y = Math.floor(this.spriteIndex / this.cols);
        ctx.drawImage(this.image, 
                      x * this.frameWidth, 
                      y * this.frameHeight, 
                      this.frameWidth, 
                      this.frameHeight, 
                      this.x, 
                      this.y,
                      this.frameWidth * scale,
                      this.frameHeight * scale);
        if (this.showHitbox) { this.drawHitbox(); }
    }
}
