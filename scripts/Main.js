// Main.js

/* TODOS:

	[] CLEAN THE MESS! (refactor, refactor, refactor)
	[x] add sounds
		[x] add enemy hit sfx
		[x] add player hit sfx
		[x] add shot left screen sfx	
	[] add max lives for player
		[] define max lives
		[] show lives left in screen top
	[x] add UFO as class (hell YEAH!)
	[] add score
	[] add star field background (parallax vertical scroll in 3 rows)
 	[] intro screen   
	[] performance check to adjust speed automatically for slower/faster machines
	[x] shot as image
	[] add easter eggs
		[] babis mode (password ano)
		[] tomio mode (password ninja)
	
*/

const FRAMES_PER_SECOND = 60;
const CL_BACKGROUND = 'black';
// Game states
const GAME_STATE_INTRO = 0;
const GAME_STATE_MENU = 1;
const GAME_STATE_GAME = 2;
const GAME_STATE_PAUSE = 3;
const GAME_STATE_WINSCREEN = 4;

// Key definitions
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACEBAR = 32;
const KEY_LESS_THAN = 188;
const KEY_GREATER_THAN = 190;
const KEY_LEFT_BRACKET = 219;
const KEY_RIGHT_BRACKET = 221;
const KEY_TAB = 9;
const KEY_LETTER_A = 65;
const KEY_LETTER_N = 78;
const KEY_LETTER_O = 79;
const KEY_LETTER_D = 68;
const KEY_LETTER_H = 72;
const KEY_LETTER_R = 82;
const KEY_LETTER_P = 80;

const SHIP_MOVE_SPEED = 10;
const DEFAULT_SCALE_RATIO = 1 / 6;
const MAX_ALIENS_IN_ROW = 15;
//const MAX_ROWS = 5;
const ALIEN_COLS = 5;
const ALIEN_ROWS = 5;
const ALIEN_W = 46;
const ALIEN_H = 36;
const ALIEN_SPACING_W = 10;
const ALIEN_SPACING_H = 5;
const SWARM_ADVANCE_JUMP = 2;
const ALIEN_POPULATION_BOOST_THRESHOLD = 20; // fewer than this, they speed up
const ALIEN_BOOST_MULT = 0.25; // higher means faster when few aliens left

// player constants and variables
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const PLAYER_Y = CANVAS_HEIGHT - PLAYER_HEIGHT / 2;
//const MIN_SECONDS_TO_SPAWN_UFO = 3;
//const MAX_SECONDS_TO_SPAWN_UFO = 5;
//const UFO_Y = 35;
//const UFO_MOVE_SPEED = 1;

var alienGrid = new Array(ALIEN_COLS * ALIEN_ROWS);
var aliensLeft;
var imgScaleRatio = DEFAULT_SCALE_RATIO;
var playerX = CX;
var nextX = playerX;
var gameState = 2;
var shotX;
var shotY;
var isFiring = false;
var imgPlayer;
var debugEnabled = true;
var sfxLoadComplete = false;
var ufo = new ufoClass();

// sounds
var sfxPlayerFire;
var sfxON = true;
var keyHeld_Left = false;
var keyHeld_Right = false;

var newShot = new shotClass();
var alienPics = [];

var testAlien = new alienClass();
var aliens = [];
var requestNextFrame = false;

// variables related to the aliens moving as a group, depends on which are alive
var swarmOffsetX = 0;
var swarmOffsetY = 0;
var swarmMoveDir = 1;
var swarmLowPopulationSpeedBoost = 1;
var swarmGroupWidth = 0;
var swarmGroupLeftMargin = 0;
var swarmGroupLowest = 0;

// variables to keep track of player shot position
var shotX = 75,
	shotY = 75;
const PLAYER_SHOT_SPEED = 20;
var shotIsActive = false;

// variables to keep track of enemy shot position
var enemyShotX = 75,
	enemyShotY = 75;
const ENEMY_SHOT_SPEED = 3;
var enemyShotIsActive = false;
var letterSequence = '';

// easter eggs
var andrejMode = false;
var tomioMode = false;

var currentFrame = 0;
var nextUfoArrivalFrame;
//var ufoSpawned = false;
//var ufoX = -1;
//var ufoDirection = -1;
var score = 0;
var wave = 1;

window.onload = function () {
	loadSounds();
	loadImages();
	createCanvas();
	canvas = document.getElementById(CANVAS_NAME);
	ctx = canvas.getContext('2d');

	function getKey(keyCode) {
		if (evt.keyCode == keyCode) {
			return true;
		} else {
			return false;
		}
	}

	document.addEventListener('keydown', function (evt) {
		//				debugText('Pressed key with code ' + evt.keyCode);

		if (evt.keyCode == KEY_LEFT) {
			keyHeld_Left = true;
		}
		if (evt.keyCode == KEY_RIGHT) {
			keyHeld_Right = true;
		}
		if (evt.keyCode == KEY_SPACEBAR) {
			playerShootIfReloaded();
		}
		if (evt.keyCode == KEY_TAB) {
			requestNextFrame = true;
		}
		if (evt.keyCode == KEY_LETTER_A) {
			letterSequence = 'a';
			debugText('letterSequence = ' + letterSequence);
		}
		if (evt.keyCode == KEY_LETTER_N) {
			letterSequence += 'n';
			debugText('letterSequence = ' + letterSequence);
		}
		if (evt.keyCode == KEY_LETTER_O) {
			letterSequence += 'o';
			debugText('letterSequence = ' + letterSequence);
		}
		// Reset to default settings
		if (evt.keyCode == KEY_LETTER_R) {
			debugText('Reset to default');
			andrejMode = false;
			letterSequence = '';
		}
		if (evt.keyCode == KEY_LETTER_P) {
			if (gameState == GAME_STATE_GAME) {
				gameState = GAME_STATE_PAUSE;
				debugText('Game paused');
			} else {
				gameState = GAME_STATE_GAME;
				debugText('Game resumed');
			}
		}
		if (evt.keyCode == KEY_LETTER_D) {
			console.log('Debug mode ' + (debugEnabled ? 'OFF' : 'ON'));
			debugEnabled = !debugEnabled;
		}
		if (evt.keyCode == KEY_LETTER_H) {
			debugText('--- HELP ---');
			debugText('d - debug mode');
			debugText('r - reset settings');
			debugText('p - pause game');
			debugText('h - help');
			debugText('[,] - scale images');
			debugText('<,> - scale canvas');
			debugText('TAB - request next frame in pause mode');
		}
		if (letterSequence == 'ano') {
			if (!andrejMode) {
				debugText('WARNING: ANDREJ MODE ACTIVATED');
				andrejMode = true;
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

	//	game();

} // window.onload()

function sfxLoadingDone() {
	sfxLoadComplete = true;
	//	var promise = sfxGameStart.play();
	//	if (promise !== undefined) {
	//		promise.then(_ => {
	//			// Music started
	//			 sfxGameStart.play();
	//		}).catch(error => {
	//			debugText('Can\'t play sounds');
	//
	//		});
	//	}
}

function loadingDoneSoStartGame() {
	if (sfxLoadComplete) {
		setInterval(game, 1000 / FRAMES_PER_SECOND);
		ufo.init(imgUfo);
		resetGame();
	}
}

function debugText(text) {
	if (debugEnabled) {
		console.log(text);
	}
}

// Main game loop
function game() {
	currentFrame++;
	moveEverything();
	drawEverything();
} // game()

function resetGame() {
	resetAliens();
	ufo.reset();
	currentFrame = 0;
}

function alienTileToIndex(tileCol, tileRow) {
	return (tileCol + ALIEN_COLS * tileRow);
}

function isAlienAtTileCoord(alienTileCol, alienTileRow) {
	var alienIndex = alienTileToIndex(alienTileCol, alienTileRow);
	return (alienGrid[alienIndex] == 1);
}

function playerShotCollisionsCheck() {
	pixelOnAlienCheck(shotX, shotY);
	pixelOnUfoCheck(shotX, shotY);
	if (shotY < 0) { // if shot has moved beyond the top edge
		sfxShotLeft.play();
		shotIsActive = false;
	}
}

function playerShootIfReloaded() {
	if (shotIsActive == false) {
		shotX = playerX;
		shotY = PLAYER_Y;
		shotIsActive = true;
		sfxPlayerFire.play();
	}
}

function pixelOnUfoCheck(whatX, whatY) {
	if (ufo.isActive) {
		if (whatY < 0 || whatY > ufo.y) {
			return false;
		}

		if (whatX > ufo.x - ufo.width / 2 &&
			whatX < ufo.x + ufo.width / 2) {		
			score += ufo.destroy();
		}
	}
}

function pixelOnAlienCheck(whatX, whatY) {
	var shotPosInTileX = Math.floor(whatX - swarmOffsetX) % ALIEN_W;
	var shotPosInTileY = Math.floor(whatY - swarmOffsetY) % ALIEN_H;

	// was tile within the gap? if so, it didn't hit anything
	if (shotPosInTileX > ALIEN_W - ALIEN_SPACING_W ||
		shotPosInTileY > ALIEN_H - ALIEN_SPACING_H) {
		return false;
	}

	var tileCol = (whatX - swarmOffsetX) / ALIEN_W;
	var tileRow = (whatY - swarmOffsetY) / ALIEN_H;

	// we'll use Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	// first check whether the shot is within any part of the alien wall
	if (tileCol < 0 || tileCol >= ALIEN_COLS ||
		tileRow < 0 || tileRow >= ALIEN_ROWS) {
		return false; // bail out of function to avoid illegal array position usage
	}

	var alienIndex = alienTileToIndex(tileCol, tileRow);

	if (alienGrid[alienIndex] == 1) { // shot hit this alien
		sfxEnemyHit.play();
		alienGrid[alienIndex] = 0;
		aliensLeft--;
		shotIsActive = false;

		if (aliensLeft == 0) {
			resetGame();
		} else {
			if (aliensLeft < ALIEN_POPULATION_BOOST_THRESHOLD) {
				swarmLowPopulationSpeedBoost = 1.0 +
					(ALIEN_POPULATION_BOOST_THRESHOLD - aliensLeft) * ALIEN_BOOST_MULT;
			}

			recomputeSwarmGroupWidth();
		} // end of else
	} // end of if shot hit alien
} // end of pixelOnAlienCheck

// updates overall width of group, since that affects when it jumps down
function recomputeSwarmGroupWidth() {

	var rightMostCol = 0;
	for (var eachRow = 0; eachRow < ALIEN_ROWS; eachRow++) { // for all rows...
		// checking from the right edge inward, only care for first found
		for (var eachCol = ALIEN_COLS - 1; eachCol > rightMostCol; eachCol--) {
			var alienIndex = alienTileToIndex(eachCol, eachRow);
			if (alienGrid[alienIndex] == 1) {
				rightMostCol = eachCol;
				break; // found one, quit check this row
			}
		}
	}
	// used to tell if group is crossing right edge of play area
	swarmGroupWidth = (rightMostCol + 1) * ALIEN_W - ALIEN_SPACING_W;

	var leftMostCol = ALIEN_COLS - 1;
	for (var eachRow = 0; eachRow < ALIEN_ROWS; eachRow++) { // for all rows...
		// checking from the right edge inward, only care for first found
		for (var eachCol = 0; eachCol < leftMostCol; eachCol++) {
			var alienIndex = alienTileToIndex(eachCol, eachRow);
			if (alienGrid[alienIndex] == 1) {
				leftMostCol = eachCol;
				break; // found one, quit check this row
			}
		}
	}
	// used to tell if group is crossing left edge of play area
	swarmGroupLeftMargin = leftMostCol * ALIEN_W;

	var bottomMostRow = 0;
	for (var eachCol = 0; eachCol < ALIEN_COLS; eachCol++) { // for all cols...
		// checking from the bottom edge upward, only care for highest found
		for (var eachRow = ALIEN_ROWS - 1; eachRow > bottomMostRow; eachRow--) {
			var alienIndex = alienTileToIndex(eachCol, eachRow);
			if (alienGrid[alienIndex] == 1) {
				bottomMostRow = eachRow;
				break; // found one, quit check this row
			}
		}
	}
	// used to tell if group is crossing bottom edge of play area
	swarmGroupLowest = (bottomMostRow + 1) * ALIEN_H - ALIEN_SPACING_H;
}

function resetAliens() {
	aliensLeft = 0;
	swarmLowPopulationSpeedBoost = 1.0;
	swarmOffsetX = 0;
	swarmOffsetY = 0;
	swarmMoveDir = 1;

	for (var eachRow = 0; eachRow < ALIEN_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < ALIEN_COLS; eachCol++) {
			var alienIndex = alienTileToIndex(eachCol, eachRow);
			if (eachRow >= 2) { // only place aliens at or below margin line
				alienGrid[alienIndex] = 1;
				aliensLeft++;
			} else { // placing 0's for margin along the top
				alienGrid[alienIndex] = 0;
			} // end no alien in this row

		} // end eachCol
	} // end eachRow

	recomputeSwarmGroupWidth();
} // end resetAliens

function drawShots() {
	if (shotIsActive) {
		ctx.drawImage(imgPlayerShot, shotX, shotY);
	}
	if (enemyShotIsActive) {
		ctx.drawImage(imgEnemyShot, enemyShotX - 1, enemyShotY - 4);
	}
}

function drawAliens() {
	var alienPicType = 7;

	for (var eachRow = 0; eachRow < ALIEN_ROWS; eachRow++) { // in each row within that col
		for (var eachCol = 0; eachCol < ALIEN_COLS; eachCol++) { // in each column...
			if (isAlienAtTileCoord(eachCol, eachRow)) {
				var alienLeftEdgeX = eachCol * ALIEN_W + swarmOffsetX;
				var alienTopEdgeY = eachRow * ALIEN_H + swarmOffsetY;
				ctx.drawImage(alienPics[alienPicType],
					alienLeftEdgeX,
					alienTopEdgeY,
					ALIEN_W - ALIEN_SPACING_W,
					ALIEN_H - ALIEN_SPACING_H,
				);
			} // end of isAlienAtTileCoord()
		} // end of for eachCol
		// change alien type for next row
		alienPicType++;
	} // end of for eachRow
} // end of drawAliens()

// Rendering
function drawEverything() {
	switch (gameState) {
		case GAME_STATE_GAME:
		case GAME_STATE_PAUSE:
			ctx.fillStyle = 'black';
			colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, CL_BACKGROUND);
			drawShots();
			drawAliens();
			ufo.draw();
			// draw player
			ctx.drawImage(imgPlayer, playerX - imgPlayer.width / 2, CANVAS_HEIGHT - imgPlayer.height, imgPlayer.width, imgPlayer.height);

			break;
		default:
			break;
	}
} // drawEverything()

function moveAliens() {
	swarmOffsetX += swarmMoveDir * swarmLowPopulationSpeedBoost;
	if (swarmMoveDir > 0) { // rightward
		if (swarmOffsetX + swarmGroupWidth > canvas.width) { // check right edge
			swarmMoveDir = -1;
			swarmOffsetY += SWARM_ADVANCE_JUMP;
		}
	}

	if (swarmMoveDir < 0) { // leftward
		if (swarmOffsetX + swarmGroupLeftMargin < 0) { // check left edge
			swarmMoveDir = 1;
			swarmOffsetY += SWARM_ADVANCE_JUMP;
		}
	}
}

function moveShots() {
	if (shotIsActive) {
		shotY -= PLAYER_SHOT_SPEED;
		playerShotCollisionsCheck();
	}

	if (enemyShotIsActive) {
		enemyShotY += ENEMY_SHOT_SPEED;
		enemyShotCollisionsCheck();
	}
}

function enemyInColAbovePlayerAttemptToFire() {
	if (enemyShotIsActive) {
		return; // shared enemy shot is still in use, will need to try again later
	}

	// which column lines up with the player's center?
	var tileCol = (playerX + (PLAYER_WIDTH / 2) - swarmOffsetX) / ALIEN_W;

	// use Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);

	if (tileCol < 0 || tileCol >= ALIEN_COLS) {
		return;
	}

	for (var eachRow = ALIEN_ROWS - 1; eachRow >= 0; eachRow--) {
		var alienIndex = alienTileToIndex(tileCol, eachRow);
		if (alienGrid[alienIndex] == 1) {
			enemyShotX = swarmOffsetX + tileCol * ALIEN_W + (ALIEN_W - ALIEN_SPACING_W) * 0.5;
			enemyShotY = swarmOffsetY + eachRow * ALIEN_H + (ALIEN_H - ALIEN_SPACING_H) * 0.5;
			enemyShotIsActive = true;
			sfxEnemyFire.volume = 0.1;
			sfxEnemyFire.play();
			return; // lowest alien found, no need to keep searching
		}
	}
}

function enemyShotCollisionsCheck() {
	if (enemyShotY >= PLAYER_Y && enemyShotY <= PLAYER_Y + imgPlayer.height) { // vertically over player
		if (enemyShotX > playerX - imgPlayer.width && enemyShotX < playerX + imgPlayer.width) { // horizontally too?
			sfxPlayerHit.play();
			resetGame();
		}
	}
	if (enemyShotY > canvas.height) { // if shot has moved beyond the bottom edge
		enemyShotIsActive = false;
	}
} // end of enemyShotCollisionsCheck()

// Updating objects
function moveEverything() {
	if (gameState == GAME_STATE_GAME) {

		moveAliens();
		ufo.move();
		enemyInColAbovePlayerAttemptToFire();
		// controlling player movement
		if (keyHeld_Left) {
			nextX -= SHIP_MOVE_SPEED;
		}
		if (keyHeld_Right) {
			nextX += SHIP_MOVE_SPEED;
		}

		if (nextX > PLAYER_WIDTH / 2 &&
			nextX < CANVAS_WIDTH - PLAYER_WIDTH / 2) {
			playerX = nextX;
		} else {
			nextX = playerX;
			// out of bounds
		}
		moveShots();
	}
} // moveEverything()
