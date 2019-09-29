/* ImageLoading.js - handling loading images */

const PATH_IMG = 'images/';

var totalResources = 0;
var numResourcesLoaded = 0;
var images = {};

function loadImages() {

    loadImage("spaceship1");
    loadImage("spaceship2");
    loadImage("spaceship3");
    loadImage("background");
    loadImage("aliens");
    loadImage("tvframe");
    loadImage("playershot1");
    loadImage("playershot2");
    loadImage("playershot3");
    loadImage("enemyshot");
    loadImage("ufo1");
    loadImage("controlsScreen");
    loadImage("custom");

    function loadImage(name) {
        totalResources++;

        images[name] = new Image();
        images[name].onload = function () {
            resourceLoaded();
        }
        images[name].src = PATH_IMG + name + ".png";
    }

    function resourceLoaded() {

        numResourcesLoaded += 1;
        if (numResourcesLoaded === totalResources) {
            loadingDoneSoStartGame();            
        }
    }
}
