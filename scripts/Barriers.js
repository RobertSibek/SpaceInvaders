// Barriers.js

const BARRIER_RES = 2; // 2px width and height
const BARRIER_COLS = 7;
const BARRIER_ROWS = 6;
const BARRIER_COLOR = '#FFBB00';

const barrierGrid1 = [
    0, 0, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1
];

const barrierGrid2 = [
    0, 0, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1
];

function barrierClass() {
    this.init = function (x, y, pixelWidth) {
        this.x = x;
        this.y = y;
        this.barrierGrid = barrierGrid1;
        this.pixelWidth = pixelWidth;
    }

    this.reset = function () {
        // check how to replace one array with another
        for (var i = 0; i < this.barrierGrid.length; i++) {
            this.barrierGrid[i] = barrierGrid1[i];
        }
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
        // handle player shots
        if (isFriendly) {
            if (shotY >= this.y && shotY <= this.y + BARRIER_ROWS * this.pixelWidth) {
                if (shotX >= this.x && shotX <= this.x + BARRIER_COLS * this.pixelWidth) {
                    var bTileCol = (shotX - this.x) / this.pixelWidth;;
                    var bTileRow = Math.floor((shotY - this.y) / this.pixelWidth);
                    var bTileIndex = bTileRow * BARRIER_COLS + bTileCol;
                    if (this.barrierGrid[bTileIndex]) {
                        this.barrierGrid[bTileIndex - BARRIER_COLS] = 0;
                        this.barrierGrid[bTileIndex] = 0;
                        //                    this.barrierGrid[bTileIndex + BARRIER_COLS] = 0;
                        return true; // Deactivete shot now
                    }
                }
            }
            return false;
        // handle enemy shots
        } else {
//            var shotY = y;
            if (shotY >= this.y && shotY <= this.y + BARRIER_ROWS * this.pixelWidth) {
                if (shotX >= this.x && shotX <= this.x + BARRIER_COLS * this.pixelWidth) {
                    var bTileCol = (shotX - this.x) / this.pixelWidth;;
                    var bTileRow = Math.floor((shotY - this.y) / this.pixelWidth);
                    var bTileIndex = bTileRow * BARRIER_COLS + bTileCol;
                    if (this.barrierGrid[bTileIndex]) {
                        //                    this.barrierGrid[bTileIndex - BARRIER_COLS] = 0;
                        this.barrierGrid[bTileIndex] = 0;
                        this.barrierGrid[bTileIndex + BARRIER_COLS] = 0;
                        return true; // Deactivete shot now
                    }
                }
            }
            return false;
        }
    }
}
