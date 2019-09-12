/* 
	GraphicCommon.js
	common graphic stuff
*/

const CANVAS_NAME = 'gameCanvas';
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CX = CANVAS_WIDTH / 2; // Center X
const CY = CANVAS_HEIGHT / 2; // Center Y
const CL_BACKGROUND = 'black';
const CL_INTRO_BACKGROUND = 'black';
const CL_DEFAULT = 'white';
const DEFAULT_FONT = '12px Arial';
var FRAMES_PER_SECOND = 60;

var canvas;
var ctx;
var prevFont;
var prevAlign;
var prevFillStyle;

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

function drawOutlineRect(x, y, width, height, color) {
	ctx.strokeStyle = color;
	ctx.strokeRect(x, y, width, height);
}

function drawText(x, y, text) {
	ctx.font = DEFAULT_FONT;
	ctx.fillStyle = CL_DEFAULT;
	ctx.textAlign = 'left';
	ctx.fillText(text, x, y);
}

function saveFontSettings() {
	prevFont = ctx.font;
	prevAlign = ctx.textAlign;
	prevFillStyle = ctx.fillStyle;
}

function resumeFontSettings() {
	ctx.font = prevFont;
	ctx.textAlign = prevAlign;
	ctx.fillStyle = prevFillStyle;
}

function customText(x, y, text, color, font, align) {
	saveFontSettings();
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.textAlign = align;
	ctx.fillText(text, x, y);
	resumeFontSettings();
}

function drawText(x, y, text, color) {
	ctx.font = DEFAULT_FONT;
	ctx.fillStyle = color;
	ctx.textAlign = 'left';
	ctx.fillText(text, x, y);
}

function drawText(x, y, text, color, font, align) {
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.textAlign = align;
	ctx.textBaseline = 'top';
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
function colorCircle(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.fill();
} // drawCircle()
