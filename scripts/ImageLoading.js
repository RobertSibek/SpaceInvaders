/* ImageLoading.js - handling loading images */

const PATH_IMG = 'images/';
var totalResources = 9;
var numResourcesLoaded = 0;
var images = {};

function loadImages() {

    loadImage("spaceship1");
    loadImage("spaceship2");
    loadImage("spaceship3");
    loadImage("background");
    loadImage("aliens");
    loadImage("tvframe");
    loadImage("playershot");
    loadImage("enemyshot");
    loadImage("ufo");

    function loadImage(name) {

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
