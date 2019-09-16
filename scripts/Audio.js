/* Audio.js - handling loading sounds */

const PATH_SFX = 'sounds/';

var sfxLoaded = 0;
var sfxToLoad = 0;

var sounds = [];

function addSound(filename) {
    sfxToLoad++;
    sounds[filename] = new Audio();
    sounds[filename].onload = countLoadedSfxAndLaunchIfReady();
    if (filename == 'DarkVibes') {
        sounds[filename].src = PATH_SFX + filename + ".mp3";
    } else {
        sounds[filename].src = PATH_SFX + filename + ".wav";
    }
    if (filename.includes('playerFire')) {
        sounds[filename].volume = 0.3;
    }

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
    addSound("playerFire1");
    addSound("playerFire2");
    addSound("playerFire3");
    addSound("playerHit");
    addSound("godProtection");
    addSound("enemyFire");
    addSound("enemyHit");
    addSound("shotLeft");
    addSound("ufoHit");
    addSound("ufoSpawned");
    addSound("blastAll");
    addSound("barrierHit");
    addSound("DarkVibes");
}

function beginLoadingSound(sfxVar, fileName) {
    sfxVar.onload = countLoadedSfxAndLaunchIfReady();
    sfxVar.src = PATH_SFX + fileName;
}

function playSound(sfx) {
    if (soundEnabled) {
        sfx.play().catch(function () {
            // do something
        });
    }
}

function stopSound(sfx) {
    if (soundEnabled) {
        sfx.currentTime = 0;
        sfx.pause();
    }
}
