// Messages.js

const MSG_CL_DEFAULT = 'yellow';
const MSG_FONT_DEFAULT = '20px Tahoma';
const fps = FRAMES_PER_SECOND;
const MSG_BG_HEIGHT = 40;
const MSG_BG_COLOR = 'gray';
const MSG_TEXT_Y_OFFSET = 10;

function messageClass() {

	this.init = function () {
		this.x = CX;
		this.y = CY;
		this.textAlign = 'center';
		ctx.textBaseline = 'middle';
		this.color = MSG_CL_DEFAULT;
		this.font = MSG_FONT_DEFAULT;
		this.delay = 1;
		this.isActive = false;
	}

	this.push = function (text) {
		if (this.isActive) {
			this.clear();
		}
		this.text = text;
		this.isActive = true;
		this.currentFrame = 0;
	}

	this.clear = function () {
		this.text = '';
		this.isActive = false;
	}

	this.animate = function () {
		this.currentFrame++;
		if (this.isActive) {
			if (this.currentFrame > this.delay * fps) {
				this.clear();
			}
		}
	}

	this.draw = function () {
		if (this.isActive) {
			ctx.globalAlpha = 0.3;
			colorRect(0, CY - MSG_BG_HEIGHT / 2, CANVAS_WIDTH, MSG_BG_HEIGHT, MSG_BG_COLOR);
			ctx.globalAlpha = 1;
			customText(this.x, this.y - MSG_TEXT_Y_OFFSET, this.text, this.color, this.font, this.textAlign);
		}
	}
}
