// FpsCounter.js
const MIN_THRESHOLD_DELTA = 75;
const TEXT_X = 50;
const TEXT_Y = CANVAS_HEIGHT - 50;
const CL_BELOW_THRESHOLD = 'red';
const CL_ABOVE_THRESHOLD = 'yellow';

function fpsCounterClass() {
	this.init = function () {
		this.secondsSinceGameStart = 0;
		this.isVisible = false;
	}
	// call this in setInterval each second
	this.tick = function () {
		this.secondsSinceGameStart++;
	}

	this.draw = function () {
        ctx.font = '12px Arial';
		if (this.isVisible) {
			var fps = Math.round(currentFrame / this.secondsSinceGameStart * 10);
			// fps dropped below minimum threshold
			if (fps < FRAMES_PER_SECOND * MIN_THRESHOLD_DELTA / 100) {
				drawText(TEXT_X, TEXT_Y, 'Fps: ' + fps, CL_BELOW_THRESHOLD);
			} else {
				drawText(TEXT_X, TEXT_Y, 'Fps: ' + fps, CL_ABOVE_THRESHOLD);
			}
		}
	}
}
