/* Input.js - All input and control related stuff */


// Key definitions
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_SPACEBAR = 32;
const KEY_LESS_THAN = 188;
const KEY_GREATER_THAN = 190;
const KEY_LEFT_BRACKET = 219;
const KEY_RIGHT_BRACKET = 221;
const KEY_TAB = 9;
const KEY_LETTER_A = 65;
const KEY_LETTER_L = 76;
const KEY_LETTER_N = 78;
const KEY_LETTER_O = 79;
const KEY_LETTER_D = 68;
const KEY_LETTER_H = 72;
const KEY_LETTER_P = 80;
const KEY_LETTER_R = 82;
const KEY_LETTER_S = 83;
const KEY_LETTER_W = 87;
const KEY_NUMBER_1 = 49;
const KEY_NUMBER_2 = 50;
const KEY_NUMBER_3 = 51;
const KEY_NUMBER_4 = 52;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
	p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D);	
}

function keyPressed(evt) {
//	console.log(evt.keyCode);
	setKeyHoldState(evt.keyCode, p1, true);
	setKeyHoldState(evt.keyCode, p2, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
	setKeyHoldState(evt.keyCode, p2, false);
}

function setKeyHoldState(thisKey, thisCar, setTo) {
	switch (thisKey) {
		case thisCar.controlKeyForGas:
			thisCar.keyHeld_Gas = setTo;
			break;
		case thisCar.controlKeyForReverse:
			thisCar.keyHeld_Reverse = setTo;
			break;
		case thisCar.controlKeyForTurnLeft:
			thisCar.keyHeld_TurnLeft = setTo;
			break;
		case thisCar.controlKeyForTurnRight:
			thisCar.keyHeld_TurnRight = setTo;
			break;
		default:
			break;
	}
}