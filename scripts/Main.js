// Base script file

/* TODOS:

 	[] intro screen        
*/

const CANVAS_NAME = 'gameCanvas';
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CX = CANVAS_WIDTH / 2; // Center X
const CY = CANVAS_HEIGHT / 2; // Center Y
const CL_FIRE = 'white';
const CL_SHIP = 'yellow';
const CL_ENEMY = 'blue';
const CL_BACKGROUND = 'black';
const DEBUG_ELEMENT_NAME = 'debugText';
const GAME_STATE_INTRO = 0;
const GAME_STATE_MENU = 1;
const GAME_STATE_GAME = 2;
const GAME_STATE_PAUSE = 3;
const GAME_STATE_WINSCREEN = 4;
const SHIP_WIDTH = 100;
const SHIP_HEIGHT = 20;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACEBAR = 32;
const SHIP_MOVE_SPEED = 10;

var canvas;
var ctx;
var framesPerSecond = 60;
var shipX = CX;
var nextX = shipX;
var gameState = 2;
var shotX;
var shotY;
var isFiring = false;


// sounds
var sfxPaddleHit;
var sfxON = true;
var keyHeld_Left = false;
var keyHeld_Right = false;

var newShot = new shotClass();

window.onload = function () {
	createDebugInfo();
	//    loadSounds();
	createCanvas();
	canvas = document.getElementById(CANVAS_NAME);
	ctx = canvas.getContext('2d');
	setInterval(game, 1000 / framesPerSecond);

	//    canvas.addEventListener('mousemove', function (evt) {
	//        var mousePos = calculateMousePos(evt);
	//        paddleX = mousePos.x - (PADDLE_WIDTH / 2); // minus half paddle height to center
	//    });

	document.addEventListener('keydown', function (evt) {
		//		debugText('Pressed key with code ' + evt.keyCode);
		if (evt.keyCode == KEY_LEFT) {
			keyHeld_Left = true;
		}
		if (evt.keyCode == KEY_RIGHT) {
			keyHeld_Right = true;
		}
		if (evt.keyCode == KEY_SPACEBAR) {
			if (!newShot.isFiring) {
				newShot.fire(shipX, CANVAS_HEIGHT - SHIP_HEIGHT - 5);
			}
		}
		evt.preventDefault();
	})

	document.addEventListener('keyup', function (evt) {
		if (evt.keyCode == KEY_LEFT) {
			keyHeld_Left = false;
		}
		if (evt.keyCode == KEY_RIGHT) {
			keyHeld_Right = false;
		}
		evt.preventDefault();
	})

	game();

} // window.onload()

function debugText(text) {
	document.getElementById(DEBUG_ELEMENT_NAME).innerHTML = text;
}

function createDebugInfo() {
	var p = document.createElement('p');
	p.id = DEBUG_ELEMENT_NAME;
	document.body.appendChild(p);
}

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

function shotFire() {
	if (isFiring) {
		if (shotY > 0) {
			shotY -= SHOT_SPEED;
			colorRect(shotX, shotY, 2, 5, CL_FIRE);
		} else {
			isFiring = false;

		}

	}


}

// Get the mouse coordinates
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(),
		root = document.documentElement;

	// account for the margins, canvas position on page, scroll amount, etc.
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	};
} // calculateMousePos()    

// Main game loop
function game() {
	moveEverything();
	drawEverything();
} // game()

function resetGame() {

}

// Rendering
function drawEverything() {
	switch (gameState) {
		case GAME_STATE_GAME:
			ctx.fillStyle = 'black';
			colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, CL_BACKGROUND);
			colorRect(shipX - SHIP_WIDTH / 2, CANVAS_HEIGHT - SHIP_HEIGHT, SHIP_WIDTH, SHIP_HEIGHT, CL_SHIP);
			newShot.draw();
			break;
		default:
			break;


	}



} // drawEverything()

// Updating objects
function moveEverything() {

	if (keyHeld_Left) {
		nextX -= SHIP_MOVE_SPEED;
	}
	if (keyHeld_Right) {
		nextX += SHIP_MOVE_SPEED;
	}

	if (nextX > SHIP_WIDTH / 2 &&
		nextX < CANVAS_WIDTH - SHIP_WIDTH / 2) {
		shipX = nextX;
	} else {
		nextX = shipX;
		// out of bounds
	}

	newShot.move();
	//	if (isFiring) {
	//		shotY -= SHOT_SPEED;
	//	}

} // moveEverything()


function drawInfo() {
	ctx.fillStyle = 'white';
	ctx.font = '20px Tahoma';
	ctx.fillText('Bricks Left: ' + bricksLeft, 10, CANVAS_HEIGHT - 30);
}


function loadSounds() {
	sfxPaddleHit = new Audio("sounds/paddleHit.wav");
}

//TODO: Later add some nice brick images and background
function loadImages() {
	//    logoImg = new Image(562, 203);
	//    logoImg.src = 'images/tennisLogo.png';
	//    bgImg = new Image(800, 400);
	//    bgImg.src = 'images/background.png';


}

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
