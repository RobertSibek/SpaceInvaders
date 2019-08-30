/* SoundLoading.js - handling loading sounds */

const PATH_SFX = 'sounds/';

var sfxPlayerFire = new Audio();
var sfxPlayerHit = new Audio();
var sfxEnemyFire = new Audio();
var sfxEnemyHit = new Audio();
var sfxGameStart = new Audio();
var sfxShotLeft = new Audio();
var sfxUfoHit = new Audio();
var sfxUfoSpawned = new Audio();
var sfxLoaded = 0;
var sfxToLoad = 0;


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
	var soundList = [
		{ varName: sfxPlayerFire, theFile: "playerFire.wav" },
		{ varName: sfxPlayerHit, theFile: "playerHit.wav" },
		{ varName: sfxEnemyFire, theFile: "enemyFire.wav" },
		{ varName: sfxEnemyHit, theFile: "enemyHit.wav" },
		{ varName: sfxGameStart, theFile: "gameStart.wav" },
		{ varName: sfxShotLeft, theFile: "shotLeft.wav" },
		{ varName: sfxUfoHit, theFile: "ufoHit.wav" },
		{ varName: sfxUfoSpawned, theFile: "ufoSpawned.wav" }
	];

	sfxToLoad = soundList.length;
	for (var i = 0; i < sfxToLoad; i++) {		
		beginLoadingSound(soundList[i].varName, soundList[i].theFile);		
	}
}

function beginLoadingSound(sfxVar, fileName) {
	sfxVar.onload = countLoadedSfxAndLaunchIfReady();
	sfxVar.src = PATH_SFX + fileName;
}
