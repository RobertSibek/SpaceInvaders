// Main.js

// Game states
const GAME_STATE_INTRO = 0;
const GAME_STATE_MENU = 1;
const GAME_STATE_PLAY = 2;
const GAME_STATE_PAUSE = 3;
const GAME_STATE_WINSCREEN = 4;

// COLORS
const CL_HEADER_TEXT = 'yellow';
const CL_HEADER_BG = '';

// HEADER SETTINGS
const FNT_HEADER = '14px Tahoma';
const HEADER_Y = 30;
const HEADER_BG_HEIGHT = 25;
const HEADER_DIST_FROM_EDGE = 55;

const DISPLAY_TOP = HEADER_BG_HEIGHT;

// PLAYER SETTINGS
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 80;
const PLAYER_Y = CANVAS_HEIGHT - PLAYER_HEIGHT;
const PLAYER_SHOT_SPEED = 20;
const PLAYER_MOVE_SPEED = 12;
var imgPlayer = imgSpaceship4;
var godModeEnabled = false;

// ENEMY SETTINGS
const ENEMY_SHOT_SPEED = 3;
const MAX_ALIENS_IN_ROW = 15;
const ALIEN_COLS = 15;
const ALIEN_ROWS = 5;
const ALIEN_W = 46;
const ALIEN_H = 36;
const ALIEN_SPACING_W = 10;
const ALIEN_SPACING_H = 5;
const SWARM_ADVANCE_JUMP = 5;
const ALIEN_POPULATION_BOOST_THRESHOLD = 30; // fewer than this, they speed up
const ALIEN_BOOST_MULT = 0.1; // higher means faster when few aliens left
const ALIEN_POINTS = 50;

var alienGrid = new Array(ALIEN_COLS * ALIEN_ROWS);
var aliensLeft;

var playerX = CX;
var nextX = playerX;
var shotX;
var shotY;
var isFiring = false;
var playerLives = 3;

var sfxLoadComplete = false;

// class instances
var ufo = new ufoClass();
var starfield = new starfieldClass();
var message = new messageClass();

// Game settings
var debugEnabled = false;
var soundEnabled = true;
var gameState = 2;
var showKeyCodes = false;
var playerScore = 0;
var currentWave = 1;

var keyHeld_Left = false;
var keyHeld_Right = false;

var alienPics = [];
var aliens = [];
var alienType = 0;

// variables related to the aliens moving as a group, depends on which are alive
var swarmOffsetX = 0;
var swarmOffsetY = 0;
var swarmMoveDir = 1;
var swarmLowPopulationSpeedBoost = 1;
var swarmGroupWidth = 0;
var swarmGroupLeftMargin = 0;
var swarmGroupLowest = 0;

// variables to keep track of player shot position
var shotX = 75;
var shotY = 75;
var shotIsActive = false;

// variables to keep track of enemy shot position
var enemyShotX = 75;
var enemyShotY = 75;
var enemyShotIsActive = false;

// easter eggs
var letterSequence = '';
var andrejMode = false;
var tomioMode = false;

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

	// check if possible to create helper function which takes keyCode and function as parameters
	//	function setActionForKey(keyCode, function ()) {
	//		if (evt.keyCode == keyCode) {
	//			action;
	//		}
	//	}

	document.addEventListener('keydown', function (evt) {
		if (showKeyCodes) {
			debugText('Pressed key with code ' + evt.keyCode);
		}
		if (evt.keyCode == KEY_BACKSPACE) {
			showKeyCodes = !showKeyCodes;
			debugText('Show keyCodes ' + (showKeyCodes ? 'enabled' : 'disabled'));
		}
		if (evt.keyCode == KEY_LEFT) {
			keyHeld_Left = true;
			//			starfield.moveSpeedX = (CX - playerX) / 100;
		}
		if (evt.keyCode == KEY_RIGHT) {
			keyHeld_Right = true;
			//			starfield.moveSpeedX = (CX - playerX) / 100;
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
		// Turn God mode on/off
		if (evt.keyCode == KEY_LETTER_G) {
			if (godModeEnabled) {
				godModeEnabled = false;
				message.push('God mode disabled');
				debugText('God mode disabled');
			} else {
				godModeEnabled = true;
				message.push('God mode enabled');
				debugText('God mode enabled');
			}
		}
		// Turn sound fx on/off
		if (evt.keyCode == KEY_LETTER_S) {
			if (soundEnabled) {
				soundEnabled = false;
				debugText('Sound effects disabled');
				message.push('Sound effects disabled');
			} else {
				soundEnabled = true;
				debugText('Sound effects enabled');
				message.push('Sound effects enabled');
			}
		}
		if (evt.keyCode == KEY_NUMBER_1) {
			imgPlayer = imgSpaceship1;
		}
		if (evt.keyCode == KEY_NUMBER_2) {
			imgPlayer = imgSpaceship2;
		}
		if (evt.keyCode == KEY_NUMBER_3) {
			imgPlayer = imgSpaceship3;
		}
		if (evt.keyCode == KEY_NUMBER_4) {
			imgPlayer = imgSpaceship4;
		}


		// Reset to default settings
		if (evt.keyCode == KEY_LETTER_R) {
			debugText('Reset to default');
			andrejMode = false;
			letterSequence = '';
		}
		if (evt.keyCode == KEY_LETTER_P) {
			if (gameState == GAME_STATE_PLAY) {
				gameState = GAME_STATE_PAUSE;
				ufo.canBeSpawned = false;
				debugText('Game paused');
			} else {
				gameState = GAME_STATE_PLAY;
				ufo.canBeSpawned = true;
				debugText('Game resumed');
			}
		}

		if (evt.keyCode == KEY_LETTER_D) {
			console.log('Debug mode ' + (debugEnabled ? 'OFF' : 'ON'));
			debugEnabled = !debugEnabled;
		}
		if (evt.keyCode == KEY_LESS_THAN) {
			starfield.addLayer();
		}
		if (evt.keyCode == KEY_GREATER_THAN) {
			starfield.removeLayer();
		}
		
		// fix the out of bounds behaviour
		if (evt.keyCode == KEY_LEFT_BRACKET) {
			var pow = starfield.setPower(-1);
			message.push('Starfield power = ' + pow);
		}
		if (evt.keyCode == KEY_RIGHT_BRACKET) {
			var pow = starfield.setPower(1);
			message.push('Starfield power = ' + pow);
		}
		if (evt.keyCode == KEY_LETTER_L) {
			var dynLayers = starfield.switchDynamicLayers();
			message.push('Starfield dynamic layers ' + (dynLayers ? 'enabled' : 'disabled'));
		}
		if (evt.keyCode == KEY_LETTER_H) {
			debugText('--- HELP ---');
			debugText('1-4 - change player\'s ship');
			debugText('d - debug mode');
			debugText('r - reset settings');
			debugText('p - pause game');
			debugText('h - help');
			debugText('[,] - adjust star power');
			debugText('<,> - add/remove starfield layer');
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
		//		starfield.moveSpeedX = 0;
		if (evt.keyCode == KEY_LEFT) {
			keyHeld_Left = false;
		}
		if (evt.keyCode == KEY_RIGHT) {
			keyHeld_Right = false;
		}
		evt.preventDefault();
	})
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

function initInstances() {
	starfield.init();
	ufo.init(imgUfo);
	message.init();

}

function loadingDoneSoStartGame() {
	if (sfxLoadComplete) {
		setInterval(mainGame, 1000 / FRAMES_PER_SECOND);
		initInstances();
		resetGame();
	}
}

function debugText(text) {
	if (debugEnabled) {
		console.log(text);
	}
}

// Main game loop
function mainGame() {
	currentFrame++;
	moveEverything();
	drawEverything();
} // game()

function resetGame() {
	resetAliens();
	ufo.reset();
	starfield.reset();
	currentFrame = 0;
}

function endGame() {
	currentWave = 1;
	playerScore = 0;
	playerLives = 3;
	alienType = 0;
}

function startNextWave() {
	currentWave++;
	if (alienType < 3) {
		alienType++;
	} else {
		alienType = 0;
	}
	resetGame();
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
	if (shotY < DISPLAY_TOP) { // if shot has moved beyond the top edge
		playSound(sfxShotLeft);
		shotIsActive = false;
	}
}

function playerShootIfReloaded() {
	if (shotIsActive == false) {
		shotX = playerX;
		shotY = PLAYER_Y;
		shotIsActive = true;
		playSound(sfxPlayerFire);
	}
}

function pixelOnUfoCheck(whatX, whatY) {
	if (ufo.isActive) {
		if (whatY < DISPLAY_TOP || whatY > ufo.y + PLAYER_SHOT_SPEED) {
			return false;
		}

		if (whatX > ufo.x - ufo.width / 2 &&
			whatX < ufo.x + ufo.width / 2) {
			playerScore += ufo.destroy();
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

	if (alienGrid[alienIndex] == 1) {
		// shot hit this alien
		playSound(sfxEnemyHit);
		alienGrid[alienIndex] = 0;
		playerScore += ALIEN_POINTS;
		aliensLeft--;
		shotIsActive = false;

		if (aliensLeft == 0) {
			startNextWave();
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

function drawHeader() {
	//	colorRect(0, 0, CANVAS_WIDTH, HEADER_BG_HEIGHT, CL_HEADER_BG);
	var w = imgPlayer.width / 4;
	var h = imgPlayer.height / 4;
	drawText(HEADER_DIST_FROM_EDGE, HEADER_Y, 'Wave: ' + currentWave, CL_HEADER_TEXT, FNT_HEADER, 'left');
	drawText(CX, HEADER_Y, 'Score: ' + playerScore, CL_HEADER_TEXT, FNT_HEADER, 'center');
	drawText(CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 6.5 * w, HEADER_Y, 'Lifes: ', CL_HEADER_TEXT, FNT_HEADER, 'left');

	var headerOffsetY = 1;
	switch (playerLives) {
		case 3:
			ctx.drawImage(imgPlayer, CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 4 * w, HEADER_Y - headerOffsetY, w, h);
			ctx.drawImage(imgPlayer, CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 3 * w, HEADER_Y - headerOffsetY, w, h);
			ctx.drawImage(imgPlayer, CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 2 * w, HEADER_Y - headerOffsetY, w, h);
			break;
		case 2:
			ctx.drawImage(imgPlayer, CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 4 * w, HEADER_Y - headerOffsetY, w, h);
			ctx.drawImage(imgPlayer, CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 3 * w, HEADER_Y - headerOffsetY, w, h);
			break;
		case 1:
			ctx.drawImage(imgPlayer, CANVAS_WIDTH - HEADER_DIST_FROM_EDGE - 4 * w, HEADER_Y - headerOffsetY, w, h);
			break;
	}
}

function resetAliens() {
	aliensLeft = 0;
	swarmLowPopulationSpeedBoost = 1.0;
	swarmOffsetX = 0;
	swarmOffsetY = 2 * ALIEN_H;
	swarmMoveDir = 1;

	for (var eachRow = 0; eachRow < ALIEN_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < ALIEN_COLS; eachCol++) {
			var alienIndex = alienTileToIndex(eachCol, eachRow);
			if (eachRow >= 0) { // only place aliens at or below margin line
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
	var alienPicType = alienType * 3;

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
		if (alienPicType < alienPics.length - ALIEN_ROWS) {
			alienPicType++;
		} else {
			alienPicType = 0;
		}

	} // end of for eachRow
} // end of drawAliens()

// Rendering
function drawEverything() {
	switch (gameState) {
		case GAME_STATE_PLAY:
		case GAME_STATE_PAUSE:
			ctx.fillStyle = 'black';
			colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, CL_BACKGROUND);
			ctx.globalAlpha = 0.1;
			ctx.drawImage(imgBg, 0, 0);
			ctx.globalAlpha = 1;
			starfield.draw();
			drawHeader();
			drawShots();
			drawAliens();
			ufo.draw();
			message.draw();
			// draw player
			ctx.drawImage(imgPlayer, playerX - imgPlayer.width / 2, PLAYER_Y, imgPlayer.width, imgPlayer.height);
			ctx.drawImage(imgBgFrame, 0, 0);
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
			playSound(sfxEnemyFire);
			return; // lowest alien found, no need to keep searching
		}
	}
}

function enemyShotCollisionsCheck() {
	if (enemyShotY >= PLAYER_Y && enemyShotY <= PLAYER_Y + imgPlayer.height) { // vertically over player
		if (enemyShotX > playerX - imgPlayer.width && enemyShotX < playerX + imgPlayer.width) { // horizontally too?
			// player has been hit by enemy
			if (!godModeEnabled) {
				playSound(sfxPlayerHit);
				enemyShotIsActive = false;
				if (playerLives > 0) {
					playerLives--;
					resetGame();
				} else {
					endGame();
				}
			} else {
				playSound(sfxGodProtection);
			}


		}
	}
	if (enemyShotY > canvas.height) { // if shot has moved beyond the bottom edge
		enemyShotIsActive = false;
	}
} // end of enemyShotCollisionsCheck()

function movePlayer() {
	// controlling player movement
	if (keyHeld_Left) {
		nextX -= PLAYER_MOVE_SPEED;
	}
	if (keyHeld_Right) {
		nextX += PLAYER_MOVE_SPEED;
	}

	if (nextX > PLAYER_WIDTH / 2 &&
		nextX < CANVAS_WIDTH - PLAYER_WIDTH / 2) {
		playerX = nextX;
	} else {
		nextX = playerX;
		// out of bounds
	}
}
// Updating objects
function moveEverything() {
	if (gameState == GAME_STATE_PLAY) {
		starfield.move();
		moveAliens();
		ufo.move();
		enemyInColAbovePlayerAttemptToFire();
		moveShots();
		movePlayer();
		message.animate();
	} else if (gameState == GAME_STATE_PAUSE) {
		if (requestNextFrame) {
			starfield.move();
			moveAliens();
			ufo.move();
			enemyInColAbovePlayerAttemptToFire();
			moveShots();
			movePlayer();
			requestNextFrame = false;
		} else {
			// RELAX.zzzzzzzz
		}
	}

} // moveEverything()
