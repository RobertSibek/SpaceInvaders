// Messages.js

const MSG_FONT_DEFAULT = '20px Tahoma';
const FPS = FRAMES_PER_SECOND;
const MSG_BG_HEIGHT = 40;
const MSG_BG_COLOR = 'gray';
const MSG_TEXT_Y_OFFSET = 10;
const MSG_COLORS2 = ['#444400', '#555500', '#666600', '#777700',
					'#888800', '#999900', '#AAAA00', '#BBBB00',
				    '#CCCC00', '#DDDD00', '#EEEE00', '#FFFF00'];
const MSG_COLORS = MSG_COLORS2.reverse();

function messageClass() {

	this.init = function (defaultDelay) {
		this.x = CX;
		this.y = CY;
		this.textAlign = 'center';
		ctx.textBaseline = 'middle'; // not good, will change context for ALL ctx objects, think again		;
		this.colorIndex = 0;
		this.color = MSG_COLORS[this.colorIndex];
		this.font = MSG_FONT_DEFAULT;
		this.delay = defaultDelay; // how many ms will message stay on screen
		this.isActive = false;
		this.fadingEnabled = false;
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
		this.colorIndex = 0;
		this.color = MSG_COLORS[this.colorIndex];
	}

	this.animate = function () {
		this.currentFrame++;
		var msgDelay = this.delay / 1000 * FPS;
		if (this.isActive) {
			if (this.fadingEnabled) {
						if (this.currentFrame > (msgDelay / MSG_COLORS.length * this.colorIndex)) {
							this.color = MSG_COLORS[this.colorIndex];
							this.colorIndex++;
						}
			} 
			
			if (this.currentFrame > msgDelay) {
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

function showMessage(target, text) {
	switch (target) {
		case 0: // do not show messages at all (reserved)
			break;
		case 1: // only show messages in the console
			if (debugEnabled) {
				console.log(text);
			}
			break;
		case 2: // only show messages on screen
			message.push(text);
			break;
		case 3: // show messages both in the console and on the screen
			if (debugEnabled) {
				console.log(text);
			}
			message.push(text);
			break;
		default:
			break;
	}
}
