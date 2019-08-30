/* Input.js - All input and control related stuff */

const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

const KEY_LETTER_W = 87;
const KEY_LETTER_S = 83;
const KEY_LETTER_A = 65;
const KEY_LETTER_D = 68;

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