/* Audio.js - handling loading sounds */

const PATH_SFX = 'sounds/';

var sfxLoaded = 0;
var sfxToLoad = 0;

var sounds = [];

function addSound(filename) {
    sfxToLoad++;
    sounds[filename] = new Audio();
    sounds[filename].onload = countLoadedSfxAndLaunchIfReady();    
    sounds[filename].src = PATH_SFX + filename + ".wav";
}

function countLoadedSfxAndLaunchIfReady() {
	sfxLoaded++;
	debugText(sfxLoaded + '/' + sfxToLoad + ' sounds loaded');
	if (sfxLoaded == sfxToLoad) {
		debugText('Sound loading complete');
		sfxLoadingDone();
	}
}

function loadSounds() {
	debugText('Loading sounds');
    addSound("gameStart");
    addSound("playerFire");
    addSound("playerHit");
    addSound("godProtection");
    addSound("enemyFire");
    addSound("enemyHit");
    addSound("shotLeft");
    addSound("ufoHit");
    addSound("ufoSpawned");
    addSound("blastAll");
    addSound("barrierHit");
}

function beginLoadingSound(sfxVar, fileName) {
	sfxVar.onload = countLoadedSfxAndLaunchIfReady();
	sfxVar.src = PATH_SFX + fileName;
}

function playSound(sfx) {
	if (soundEnabled) {
		sfx.play().catch(function() {
    		// do something
		});	
	}
}
