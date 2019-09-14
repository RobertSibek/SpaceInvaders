// Barriers.js

const BARRIER_RES = 5; // 5px  width and height
const BARRIER_COLS = 15;
const BARRIER_ROWS = 15;
const BARRIER_COLOR = '#FFAA00';

const barrierGrid3 = [
    0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
];

function barrierClass() {

    this.init = function (x, y) {
        this.x = x;
        this.y = y;
        this.barrierGrid = barrierGrid3.slice(0);
        this.pixelWidth = BARRIER_RES;
    }

    this.reset = function () {
        this.barrierGrid = barrierGrid3.slice(0);
    }

    this.draw = function () {
        for (var row = 0; row < BARRIER_ROWS; row++) {
            for (var col = 0; col < BARRIER_COLS; col++) {
                var tileIndex = row * BARRIER_COLS + col;
                if (this.barrierGrid[tileIndex]) {
                    colorRect(this.x + col * this.pixelWidth, this.y + row * this.pixelWidth, this.pixelWidth, this.pixelWidth, BARRIER_COLOR);
                }
            }
        }
    }

    this.checkHit = function (shotX, shotY, isFriendly) {
        if (isFriendly) {
            // handle player shots
            if (shotY >= this.y && shotY <= this.y + BARRIER_ROWS * this.pixelWidth) {
                if (shotX >= this.x && shotX <= this.x + BARRIER_COLS * this.pixelWidth) {
                    var bTileCol = Math.floor((shotX - this.x) / this.pixelWidth);
                    var bTileRow = Math.floor((shotY - this.y) / this.pixelWidth);
                    var bTileIndex = bTileRow * BARRIER_COLS + bTileCol;
                    if (this.barrierGrid[bTileIndex]) {
                        this.barrierGrid[bTileIndex] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + 1] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex - 1] = 0;
                        this.barrierGrid[bTileIndex + BARRIER_COLS] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + BARRIER_COLS + 1] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + BARRIER_COLS - 1] = 0;
                        return true; // Deactivete shot after impact
                    }
                }
            }
            return false;
        } else {
            // handle enemy shots            
            if (shotY >= this.y && shotY <= this.y + BARRIER_ROWS * this.pixelWidth) {
                if (shotX >= this.x && shotX <= this.x + BARRIER_COLS * this.pixelWidth) {
                    var bTileCol = Math.floor((shotX - this.x) / this.pixelWidth);
                    var bTileRow = Math.floor((shotY - this.y) / this.pixelWidth);
                    var bTileIndex = bTileRow * BARRIER_COLS + bTileCol;
                    if (this.barrierGrid[bTileIndex]) {
                        this.barrierGrid[bTileIndex] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + 1] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex - 1] = 0;
                        this.barrierGrid[bTileIndex + BARRIER_COLS] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + BARRIER_COLS + 1] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + BARRIER_COLS - 1] = 0;
                        if (getDiceRoll()) this.barrierGrid[bTileIndex + 2 * BARRIER_COLS] = 0;
                        return true; // Deactivete shot after impact
                    }
                }
            }
            return false;
        }
    }
}
