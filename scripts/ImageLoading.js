/* ImageLoading.js - handling loading images */

const PATH_IMG = 'images/';
const ALIEN1A = 0;
const ALIEN2A = 1;
const ALIEN3A = 2;
const ALIEN1B = 3;
const ALIEN2B = 4;
const ALIEN3B = 5;
const ALIEN1C = 6;
const ALIEN2C = 7;
const ALIEN3C = 8;
const ALIEN1D = 9;
const ALIEN2D = 10;
const ALIEN3D = 11;

var imgPlayer = document.createElement('img');
var imgPlayerShot = document.createElement('img');
var imgEnemyShot = document.createElement('img');
var imgUfo = document.createElement('img');
var picsLoaded = 0;
var picsToLoad = 0;


function countLoadedImageAndLaunchIfReady() {
	picsLoaded++;
	debugText(picsLoaded + '/' + picsToLoad + ' images loaded');
	if (picsLoaded == picsToLoad) {
		debugText('Image loading complete');
		loadingDoneSoStartGame();
	}
}

function loadImages() {
	debugText('Loading images');
	var imageList = [
		{ varName: imgPlayer, theFile: "playerSpaceshipScaled.png" },
		{ varName: imgPlayerShot, theFile: "playerShot.png" },
		{ varName: imgEnemyShot, theFile: "enemyShot.png" },
		{ varName: imgUfo, theFile: "ufo.png" },
		
		{ alienType: ALIEN1A, theFile: "alien1a.png" },
		{ alienType: ALIEN2A, theFile: "alien2a.png" },
		{ alienType: ALIEN3A, theFile: "alien3a.png" },
		{ alienType: ALIEN1B, theFile: "alien1b.png" },
		{ alienType: ALIEN2B, theFile: "alien2b.png" },
		{ alienType: ALIEN3B, theFile: "alien3b.png" },
		{ alienType: ALIEN1C, theFile: "alien1c.png" },
		{ alienType: ALIEN2C, theFile: "alien2c.png" },
		{ alienType: ALIEN3C, theFile: "alien3c.png" },
		{ alienType: ALIEN1D, theFile: "alien1d.png" },
		{ alienType: ALIEN2D, theFile: "alien2d.png" },
		{ alienType: ALIEN3D, theFile: "alien3d.png" },
	];

	picsToLoad = imageList.length;
	for (var i = 0; i < picsToLoad; i++) {
		if (imageList[i].alienType != undefined) {
			// here we handle alien images
			loadImageForAlien(imageList[i].alienType, imageList[i].theFile);
		} else {
			// This is the player's image
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}

function loadImageForAlien(alienCode, fileName) {
	alienPics[alienCode] = document.createElement("img");
	beginLoadingImage(alienPics[alienCode], fileName);
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = PATH_IMG + fileName;

}
