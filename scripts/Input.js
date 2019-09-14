/* Input.js - All input and control related stuff */

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_SPACEBAR = 32;
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_LESS_THAN = 188;
const KEY_GREATER_THAN = 190;
const KEY_LEFT_BRACKET = 219;
const KEY_RIGHT_BRACKET = 221;
const KEY_LETTER_A = 65;
const KEY_LETTER_B = 66;
const KEY_LETTER_C = 67;
const KEY_LETTER_D = 68;
const KEY_LETTER_E = 69;
const KEY_LETTER_F = 70;
const KEY_LETTER_G = 71;
const KEY_LETTER_H = 72;
const KEY_LETTER_I = 73;
const KEY_LETTER_J = 74;
const KEY_LETTER_K = 75;
const KEY_LETTER_L = 76;
const KEY_LETTER_M = 77;
const KEY_LETTER_N = 78;
const KEY_LETTER_O = 79;
const KEY_LETTER_P = 80;
const KEY_LETTER_Q = 81;
const KEY_LETTER_R = 82;
const KEY_LETTER_S = 83;
const KEY_LETTER_T = 84;
const KEY_LETTER_U = 85;
const KEY_LETTER_V = 86;
const KEY_LETTER_W = 87;
const KEY_LETTER_X = 88;
const KEY_LETTER_Y = 89;
const KEY_LETTER_Z = 90;
const KEY_NUMBER_0 = 48;
const KEY_NUMBER_1 = 49;
const KEY_NUMBER_2 = 50;
const KEY_NUMBER_3 = 51;
const KEY_NUMBER_4 = 52;
const KEY_NUMBER_5 = 53;
const KEY_NUMBER_6 = 54;
const KEY_NUMBER_7 = 55;
const KEY_NUMBER_8 = 56;
const KEY_NUMBER_9 = 57;

var keyHeld_Left = false;
var keyHeld_Right = false;

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    //	p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
}

function keyPressed(evt) {
    if (showKeyCodes) {
        showMessage(1, 'Pressed key with code ' + evt.keyCode);
    }
    if (evt.keyCode == KEY_BACKSPACE) {
        showKeyCodes = !showKeyCodes;
        showMessage(3, 'Show keyCodes ' + (showKeyCodes ? 'enabled' : 'disabled'));
    }
    if (evt.keyCode == KEY_SPACEBAR) {
        if (gameState == GAME_STATE_INTRO) {
            gameState = GAME_STATE_PLAY;
            playSound(sfxGameStart);
            starfield.dynamicLayers = false;
            starfield.setPower(6);
        } else {
            playerShootIfReloaded();
        }
    }
    if (evt.keyCode == KEY_LETTER_F) {
        fpsCounter.isVisible = !fpsCounter.isVisible;
    }
    if (evt.keyCode == KEY_LETTER_S) {
        if (soundEnabled) {
            soundEnabled = false;
            showMessage(3, 'Sound effects disabled');
        } else {
            soundEnabled = true;
            showMessage(3, 'Sound effects enabled');
        }
    }
    if (evt.keyCode == KEY_LETTER_D) {
        console.log('Debug mode ' + (debugEnabled ? 'OFF' : 'ON'));
        debugEnabled = !debugEnabled;
    }
    if (evt.keyCode == KEY_LESS_THAN) {
        starfield.removeLayer();
    }
    if (evt.keyCode == KEY_GREATER_THAN) {
        starfield.addLayer();
    }
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
    if (evt.keyCode == KEY_LETTER_C) {
        customImageLoaded = !customImageLoaded;
        showMessage(3, 'Custom images ' + (customImageLoaded ? 'enabled' : 'disabled'));
    }
    // Keycodes below are only available when in play
    if (gameState == GAME_STATE_PLAY ||
        gameState == GAME_STATE_PAUSE) {
        if (evt.keyCode == KEY_LEFT) {
            keyHeld_Left = true;
        }
        if (evt.keyCode == KEY_RIGHT) {
            keyHeld_Right = true;
        }
        if (evt.keyCode == KEY_TAB) {
            requestNextFrame = true;
        }
        if (evt.keyCode == KEY_LETTER_Q) {
            endGame();
            gameState = GAME_STATE_INTRO;
        }
        if (evt.keyCode == KEY_LETTER_G) {
            if (godModeEnabled) {
                godModeEnabled = false;
                player.shotSpeed = PL_SHOT_SPEED;
                showMessage(3, 'God mode disabled');
            } else {
                godModeEnabled = true;
                player.shotSpeed = PL_SHOT_SPEED_BOOST;
                showMessage(3, 'God mode enabled');
            }
        }
        if (evt.keyCode == KEY_LETTER_H) {
            if (showHitBoxes) {
                showHitBoxes = false;
                player.showHitbox = false;
                ufo.showHitbox = false;
                showMessage(3, 'Show hitboxes disabled');
            } else {
                showHitBoxes = true;
                player.showHitbox = true;
                ufo.showHitbox = true;
                showMessage(3, 'Show hitboxes enabled');
            }
        }
        if (evt.keyCode == KEY_LETTER_K) {
            if (godModeEnabled) {
                blastAllAliens();
            }
        }
        if (evt.keyCode == KEY_LETTER_T) {
            if (gameState == GAME_STATE_PLAY) {
                gameState = GAME_STATE_PAUSE;
                ufo.canBeSpawned = false;
                showMessage(1, 'Game paused for taking screenshots');
            } else {
                gameState = GAME_STATE_PLAY;
                ufo.canBeSpawned = true;
                showMessage(1, 'Game resumed');
            }
        }
        if (evt.keyCode == KEY_NUMBER_1) {
            player.changeShip(images["spaceship1"], images["playershot"]);
        }
        if (evt.keyCode == KEY_NUMBER_2) {
            player.changeShip(images["spaceship2"], images["playershot"]);
        }
        if (evt.keyCode == KEY_NUMBER_3) {
            player.changeShip(images["spaceship3"], images["playershot"]);
        }
        // Reset to default settings
        if (evt.keyCode == KEY_LETTER_R) {
            showMessage(3, 'Reset to default');
        }
        if (evt.keyCode == KEY_LETTER_P) {
            if (gameState == GAME_STATE_PLAY) {
                gameState = GAME_STATE_PAUSE;
                ufo.canBeSpawned = false;
                showMessage(3, 'Game paused');
            } else {
                gameState = GAME_STATE_PLAY;
                ufo.canBeSpawned = true;
                showMessage(3, 'Game resumed');
            }
        }
    } // end in-game controls
    evt.preventDefault();
}

function keyReleased(evt) {
    if (evt.keyCode == KEY_LEFT) {
        keyHeld_Left = false;
    }
    if (evt.keyCode == KEY_RIGHT) {
        keyHeld_Right = false;
    }
    evt.preventDefault();
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
    switch (thisKey) {
        case thisPlayer.controlKeyForGas:
            thisPlayer.keyHeld_Gas = setTo;
            break;
        case thisPlayer.controlKeyForReverse:
            thisPlayer.keyHeld_Reverse = setTo;
            break;
        case thisPlayer.controlKeyForTurnLeft:
            thisPlayer.keyHeld_TurnLeft = setTo;
            break;
        case thisPlayer.controlKeyForTurnRight:
            thisPlayer.keyHeld_TurnRight = setTo;
            break;
        default:
            break;
    }
}
