/* ImageLoading.js - handling loading images */

const PATH_IMG = 'images/';

var imgSpaceship1 = new Image();
var imgSpaceship2 = new Image();
var imgSpaceship3 = new Image();
var imgSpaceship4 = new Image();
//var imgPlayer = document.createElement('img');
var imgPlayerShot = new Image();
var imgEnemyShot = new Image();
var imgUfo = new Image();
var imgBg = new Image();
var imgBgFrame = new Image();
var imgAliens = new Image();
var picsLoaded = 0;
var picsToLoad = 0;

var images = {};

loadImage("playerSpaceship1Scaled.png");
loadImage("playerSpaceship2Scaled.png");
loadImage("playerSpaceship3Scaled.png");

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
      resourceLoaded();
  }
  images[name].src = PATH_IMG + name;
}

var totalResources = 3;
var numResourcesLoaded = 0;
var fps = 30;

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
    console.log('IMAGE LOADING DONE');
  }
}


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
		{ varName: imgSpaceship1, theFile: "playerSpaceship1Scaled.png" },
		{ varName: imgSpaceship2, theFile: "playerSpaceship2Scaled.png" },
		{ varName: imgSpaceship3, theFile: "playerSpaceship3Scaled.png" },
		{ varName: imgSpaceship4, theFile: "playerSpaceship4Scaled.png" },
		{ varName: imgPlayerShot, theFile: "playerShot.png" },
		{ varName: imgEnemyShot, theFile: "enemyShot.png" },
		{ varName: imgUfo, theFile: "ufoSpritesheet.png" },
		{ varName: imgBg, theFile: "cloudBackground.png" },
		{ varName: imgBgFrame, theFile: "bgFrame.png" },
		{ varName: imgAliens, theFile: "alienSpritesheet.png"}
	];

	picsToLoad = imageList.length;
	for (var i = 0; i < picsToLoad; i++) {
		{
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = PATH_IMG + fileName;

}
