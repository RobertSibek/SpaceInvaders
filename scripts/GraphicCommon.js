/* 
	GraphicCommon.js
	common graphic stuff
*/

const CANVAS_NAME = 'gameCanvas';
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
const CX = CANVAS_WIDTH / 2; // Center X
const CY = CANVAS_HEIGHT / 2; // Center Y
const BG_COLOR = 'black';

var canvas;
var ctx;
var framesPerSecond = 30;

// Dynamically create canvas element
function createCanvas() {
	canvas = document.createElement('canvas');
	canvas.id = CANVAS_NAME;
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	canvas.style.zIndex = 8;
	canvas.style.position = "absolute";
	canvas.style.border = "1px solid";
	document.body.appendChild(canvas);
}

function drawBitmapCenteredAtLocationWithRotation(img, atX, atY, withAngle) {
	ctx.save();
	ctx.translate(atX, atY);
	ctx.rotate(withAngle);
	ctx.drawImage(img, -img.width / 2, -img.height / 2);
	ctx.restore();
}

// Draw colored rectangle
function drawRect(x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
} // drawRect()

function drawOutlineRect(x, y, width, height, color) {
	ctx.strokeStyle = color;
	ctx.strokeRect(x, y, width, height);
}

function drawText(x, y, text, color) {
	ctx.font = '12px Arial';
	ctx.fillStyle = color;
	ctx.textAlign = 'center';
	ctx.fillText(text, x, y);
}

// Draw colored circle
function drawCircle(x, y, r, a, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, a, true);
	ctx.fill();
} // drawCircle()

// Draw colored rectangle
function colorRect(x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
} // drawRect()

// Draw colored circle
function colorCircle(x, y, r, a, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, a, true);
	ctx.fill();
} // drawCircle()
