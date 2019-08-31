function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getDiceRoll() {
	if (Math.random() > 0.5) {
		return true;
	} else {
		return false;
	}
}