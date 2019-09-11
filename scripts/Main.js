// Main.js

// GAME STATES
const GAME_STATE_INTRO = 0;
const GAME_STATE_MENU = 1;
const GAME_STATE_PLAY = 2;
const GAME_STATE_PAUSE = 3;
const GAME_STATE_WINSCREEN = 4;

// DEFAULT COLORS
const CL_HEADER_TEXT = 'yellow';
const CL_HEADER_BG = '';

// HEADER SETTINGS
const FNT_HEADER = '14px Tahoma'; // default header font
const HEADER_Y = 30; // header distance from the top
const HEADER_BG_HEIGHT = 25; // header background height
const HEADER_DIST_FROM_LEFT_EDGE = 55; // it's obvious
const HEADER_DIST_FROM_RIGHT_EDGE = 150; // same here
const DISPLAY_TOP = HEADER_BG_HEIGHT; // minimum drawing Y distance from the top

// GAME SETTINGS
const COUNT_FPS_TICK = 10;
const BARRIER_PIXEL_RES = 10;

// ENEMY SETTINGS
const ENEMY_SHOT_SPEED = 3;
const MAX_ALIENS_IN_ROW = 15;
const ALIEN_COLS = 15;
const ALIEN_ROWS = 5;
const ALIEN_W = 39; // originally 46
const ALIEN_H = 32; // originally 36
const TOTAL_ALIEN_SPRITES = 12;
const ALIEN_SPACING_W = 5;
const ALIEN_SPACING_H = 2;
const SWARM_ADVANCE_JUMP = ALIEN_H / 2;
const ALIEN_COUNT_BOOST_THRESHOLD = 30; // fewer than this, they speed up
const ALIEN_BOOST_MULT = 0.15; // higher means faster when few aliens left
const ALIEN_POINTS = 50;

var alienGrid = new Array(ALIEN_COLS * ALIEN_ROWS);
var aliensLeft;

// SHOT SETTINGS (should be moved to playerClass)
var shotX; // horizontal position of the shot
var shotY; // vertical position of the shot
var shotIsActive = false; // is shot active?

// CLASS INSTANCES
var ufo = new ufoClass();
var starfield = new starfieldClass();
var message = new messageClass();
var player = new playerClass();
var fpsCounter = new fpsCounterClass();
var barrier1 = new barrierClass();
var barrier2 = new barrierClass();
var barrier3 = new barrierClass();
var barrier4 = new barrierClass();

// GAME SETTINGS
var debugEnabled = false;
var soundEnabled = true;
var gameState = 2;
var showKeyCodes = false;
var playerScore = 0;
var currentWave = 1;
var godModeEnabled = false;
var sfxLoadComplete = false;
var currentFrame = 0; // counts how many times spent in the main game loop
var requestNextFrame = false; // if paused, this will request next frame while staying in pause
var showHitBoxes = false;
var alienType = 0;

// variables related to the aliens moving as a group, depends on which are alive
var swarmOffsetX = 0;
var swarmOffsetY = 0;
var swarmMoveDir = 1;
var swarmLowPopulationSpeedBoost = 1;
var swarmGroupWidth = 0;
var swarmGroupLeftMargin = 0;
var swarmGroupLowest = 0;

// variables to keep track of enemy shot position
var enemyShotX;
var enemyShotY;
var enemyShotIsActive = false;

// EASTER EGGS
var letterSequence = '';
var andrejMode = false;
var tomioMode = false;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (mainGame) {
            window.setTimeout(mainGame, 1000 / FRAMES_PER_SECOND);
        };
})();

window.onload = function () {
    loadSounds();
    loadImages();
    createCanvas();
    canvas = document.getElementById(CANVAS_NAME);
    ctx = canvas.getContext('2d');
}

function sfxLoadingDone() {
    sfxLoadComplete = true;
}

function initAll() {
    initInput();
    player.init(images["spaceship3"], images["playershot"]);
    starfield.init();
    ufo.init(images["ufo"]);
    message.init(1000);
    fpsCounter.init();
    barrier1.init(104, CANVAS_HEIGHT - 170, BARRIER_PIXEL_RES);
    barrier2.init(278, CANVAS_HEIGHT - 170, BARRIER_PIXEL_RES);
    barrier3.init(452, CANVAS_HEIGHT - 170, BARRIER_PIXEL_RES);
    barrier4.init(626, CANVAS_HEIGHT - 170, BARRIER_PIXEL_RES);
}

function loadingDoneSoStartGame() {
    if (sfxLoadComplete) {
        window.requestAnimationFrame(mainGame);
        setInterval(countFps, 1000 / COUNT_FPS_TICK);
        initAll();
        resetGame();
    }
}

// *** MAIN GAME LOOP ***
function mainGame() {
    window.requestAnimationFrame(mainGame);
    currentFrame++;
    moveEverything();
    drawEverything();
}
// *** END OF MAIN GAME LOOP ***

function countFps() {
    fpsCounter.tick();
}

function debugText(text) {
    if (debugEnabled) {
        console.log(text);
    }
}

function resetGame() {
    resetAliens();
    ufo.reset();
    starfield.reset();
}

function endGame() {
    currentWave = 1;
    playerScore = 0;
    player.lifes = 3;
    alienType = 0;
    resetGame();
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

function drawEverything() {
    switch (gameState) {
        case GAME_STATE_PLAY:
        case GAME_STATE_PAUSE:
            ctx.fillStyle = 'black';
            colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, CL_BACKGROUND);
            ctx.globalAlpha = 0.3;
            ctx.drawImage(images["background"], 0, 0);
            ctx.globalAlpha = 1;
            starfield.draw();
            drawHeader();
            drawShots();
            drawAliens();
            barrier1.draw();
            ufo.draw();
            message.draw();
            player.draw();
            ctx.drawImage(images["tvframe"], 0, 0);
            fpsCounter.draw();
            break;
        default:
            break;
    }
}

function moveEverything() {
    if (gameState == GAME_STATE_PLAY) {
        starfield.move();
        moveAliens();
        ufo.move();
        enemyInColAbovePlayerAttemptToFire();
        moveShots();
        player.move();
        message.animate();
    } else if (gameState == GAME_STATE_PAUSE) {
        if (requestNextFrame) {
            starfield.move();
            moveAliens();
            ufo.move();
            enemyInColAbovePlayerAttemptToFire();
            moveShots();
            player.move();
            requestNextFrame = false;
        } else {
            // RELAX.zzzzzzzz
        }
    }
}

function blastAllAliens() {
    playSound(sfxBlastAll);
    for (var i = 0; i < alienGrid.length; i++) {
        if (alienGrid[i]) {
            alienGrid[i] = 0;
            aliensLeft--;
            playerScore += ALIEN_POINTS;
            shotIsActive = false;
        }
    }
    if (aliensLeft == 0) {
        startNextWave();
    }
}

function alienTileToIndex(tileCol, tileRow) {
    return (tileCol + ALIEN_COLS * tileRow);
}

function alienIndexToTile(alienIndex) {
    return ({
        tileCol: alienIndex % ALIEN_COLS,
        tileRow: Math.floor(alienIndex / ALIEN_COLS)
    })
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
        shotX = player.x;
        shotY = player.y;
        shotIsActive = true;
        playSound(sfxPlayerFire);
    }
}

function pixelOnUfoCheck(whatX, whatY) {
    if (ufo.isActive) {
        if (whatY < DISPLAY_TOP || whatY > ufo.y + player.shotSpeed) {
            return false;
        }

        if (whatX > ufo.x &&
            whatX < ufo.x + ufo.width) {
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
            if (aliensLeft < ALIEN_COUNT_BOOST_THRESHOLD) {
                swarmLowPopulationSpeedBoost = 1.0 +
                    (ALIEN_COUNT_BOOST_THRESHOLD - aliensLeft) * ALIEN_BOOST_MULT;
            }
            recomputeSwarmGroupWidth();
        }
    }
}

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

function getSwarmGroupLowest() {
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
    var w = player.ship.width / 4;
    var h = player.ship.height / 4;
    drawText(HEADER_DIST_FROM_LEFT_EDGE, HEADER_Y, 'Wave: ' + currentWave, CL_HEADER_TEXT, FNT_HEADER, 'left');
    drawText(CX, HEADER_Y, 'Score: ' + lpad(playerScore, 6), CL_HEADER_TEXT, FNT_HEADER, 'center');
    drawText(CANVAS_WIDTH - HEADER_DIST_FROM_LEFT_EDGE - 6.5 * w, HEADER_Y, 'Lifes: ', CL_HEADER_TEXT, FNT_HEADER, 'left');
    // draw player's lifes as ships
    var headerOffsetY = 1;
    for (var x = 1; x <= player.lifes; x++) {
        ctx.drawImage(player.ship, CANVAS_WIDTH - HEADER_DIST_FROM_RIGHT_EDGE + (w * x), HEADER_Y - headerOffsetY, w, h);
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
            }
        }
    }

    recomputeSwarmGroupWidth();
}

function drawShots() {
    if (shotIsActive) {
        ctx.drawImage(player.shot, shotX, shotY);       
    }
    if (enemyShotIsActive) {
        ctx.drawImage(images["enemyshot"], enemyShotX - 1, enemyShotY - 4);      
    }
}

function drawAliens() {
    var alienSpriteIndex = alienType * 3;
    for (var eachRow = 0; eachRow < ALIEN_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ALIEN_COLS; eachCol++) {
            if (isAlienAtTileCoord(eachCol, eachRow)) {
                var alienLeftEdgeX = eachCol * ALIEN_W + swarmOffsetX;
                var alienTopEdgeY = eachRow * ALIEN_H + swarmOffsetY;
                // new render method using spritesheet
                ctx.drawImage(images["aliens"],
                    alienSpriteIndex * ALIEN_W, 0, // source x, source y
                    ALIEN_W, ALIEN_H, // frame width, height
                    alienLeftEdgeX, // destination x
                    alienTopEdgeY, // destination y
                    ALIEN_W - ALIEN_SPACING_W,
                    ALIEN_H - ALIEN_SPACING_H);
            }
        }
        // change alien type for next row
        if (alienSpriteIndex < TOTAL_ALIEN_SPRITES - ALIEN_ROWS) {
            alienSpriteIndex++;
        } else {
            alienSpriteIndex = 0;
        }
    }
}



function moveAliens() {
    swarmOffsetX += swarmMoveDir * swarmLowPopulationSpeedBoost;
    if (swarmMoveDir > 0) { // rightward
        if (swarmOffsetX + swarmGroupWidth > canvas.width) { // check right edge
            swarmMoveDir = -1;
            swarmOffsetY += SWARM_ADVANCE_JUMP;
            getSwarmGroupLowest()
        }
    }

    if (swarmMoveDir < 0) { // leftward
        if (swarmOffsetX + swarmGroupLeftMargin < 0) { // check left edge
            swarmMoveDir = 1;
            swarmOffsetY += SWARM_ADVANCE_JUMP;
            getSwarmGroupLowest();
        }
    }
    // Check if aliens crossed the lower margin
    if (swarmGroupLowest + swarmOffsetY > player.y) {
        endGame();
    }
}

function moveShots() {
    if (shotIsActive) {
        shotY -= player.shotSpeed;
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
    var tileCol = (player.x + (player.ship.width / 2) - swarmOffsetX) / ALIEN_W;

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
            playSound(sfxEnemyFire);
            return; // lowest alien found, no need to keep searching
        }
    }
}

function enemyShotCollisionsCheck() {
    if (enemyShotY >= player.y && enemyShotY <= player.y + player.ship.height) { // vertically over player
        if (enemyShotX > player.x - player.ship.width / 2 && enemyShotX < player.x + player.ship.width / 2) { // horizontally too?
            // player has been hit by enemy
            if (!godModeEnabled) {
                playSound(sfxPlayerHit);
                enemyShotIsActive = false;
                if (player.lifes > 1) {
                    player.lifes--;
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
}
