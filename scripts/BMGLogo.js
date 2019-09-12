const TILE_W = 20;
const TILE_H = 20;
const SQUARE_WHITE = 1;
const SQUARE_BLACK = 2;
const SQUARE_RED = 6;
const NW_BLACK = 3;
const NW_WHITE = 8;
const NE_BLACK = 4;
const NE_WHITE = 7;
const SW_WHITE = 9;
const SE_BLACK = 10;
const SE_WHITE = 14;
const SW_BLACK = 11;
const NW_RED = 13;
const NE_RED = 12;
const N_BLACK = 5;
const N_RED_WHITE = 15;
const CL_WHITE = 'white';
const CL_BLACK = 'black';
const CL_RED = 'red';

const BMG_LOGO = [
    1, 1, 1, 1, 1, 1, 1, 9,
    1, 10, 11, 1, 10, 11, 1, 1,
    1, 1, 1, 5, 1, 1, 1, 8,
    1, 1, 1, 1, 1, 1, 1, 0,
    7, 12, 12, 15, 13, 13, 8, 0,
    0, 7, 1, 1, 1, 8, 0, 0
];

const LOGO_COLS = 8;
const LOGO_ROWS = 6;


function BMGLogoClass() {

    this.init = function () {
        this.scale = 1;
        this.tileW = TILE_W 
        this.tileH = TILE_H;
        this.x = CX - LOGO_COLS * this.tileW / 2 + TILE_W; // center
        this.y = CY - LOGO_ROWS * this.tileH / 2; // center
        this.showIndex = false;
        this.isAnimating = false;

        console.log('BMGLogoClass initialized.');
    }

    function drawTile(x, y, tileType) {
        switch (tileType) {
            case SQUARE_WHITE:
            case SQUARE_BLACK:
                colorRect(x, y, TILE_W, TILE_H, (tileType == SQUARE_WHITE) ? CL_WHITE : CL_BLACK);
                break;
            case SQUARE_RED:
                colorRect(x, y, TILE_W, TILE_H, CL_RED);
                break;
            case N_BLACK:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.beginPath();
                ctx.moveTo(x + TILE_W / 2, y + TILE_H / 2);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x + TILE_W / 2, y + TILE_H / 2);
                ctx.fillStyle = CL_BLACK;
                ctx.fill();
                break;            
            case N_RED_WHITE:
                colorRect(x, y, TILE_W, TILE_H, CL_RED);
                ctx.beginPath();
                ctx.moveTo(x + TILE_W / 2, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x + TILE_W / 2, y);
                ctx.fillStyle = CL_WHITE;
                ctx.fill();
                break;
            case NW_BLACK:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.fillStyle = CL_BLACK;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill();
                break;
            case NW_RED:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.fillStyle = CL_RED;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill();
                break;
            case NW_WHITE:
                ctx.fillStyle = CL_WHITE;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill();
                break;
            case SW_WHITE:
                ctx.fillStyle = CL_WHITE;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill();
                break;
            case SW_BLACK:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.fillStyle = CL_BLACK;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill();
                break;
            case SE_BLACK:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.fillStyle = CL_BLACK;
                ctx.beginPath();
                ctx.moveTo(x + TILE_W, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y + TILE_H);
                ctx.lineTo(x + TILE_W, y);
                ctx.fill();
                break;
            case NE_BLACK:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.fillStyle = CL_BLACK;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill()
                break;
            case NE_RED:
                colorRect(x, y, TILE_W, TILE_H, CL_WHITE);
                ctx.fillStyle = CL_RED;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fill()
                break;
            case NE_WHITE:
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE_W, y);
                ctx.lineTo(x + TILE_W, y + TILE_H);
                ctx.lineTo(x, y);
                ctx.fillStyle = CL_WHITE;
                ctx.fill();
                break;
        }
    }

    this.move = function () {
        if (this.isAnimating) {
            this.scale += 0.05;
            this.tileW = TILE_W * this.scale;
            this.tileH = TILE_H * this.scale;
            if (this.scale >= 1) {
                this.isAnimating = false;
                this.scale = 1;
            }
        }
    }

    this.draw = function () {
        for (var row = 0; row < LOGO_ROWS; row++) {
            for (var col = 0; col < LOGO_COLS; col++) {
                var tileIndex = row * LOGO_COLS + col;
                var tileX = this.x + col * TILE_W;
                var tileY = this.y + row * TILE_H;
                var tile = BMG_LOGO[tileIndex];
                drawTile(tileX, tileY, tile);
                if (this.showIndex) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillText(BMG_LOGO[tileIndex], tileX + TILE_W / 2, tileY + TILE_H / 2);
                }
            }
        }
        ctx.fillStyle = '#666999';
        ctx.font = '25px Arial';
        var bmg = 'Bad Mug Games';
        var text = ctx.measureText(bmg);   
        ctx.fillText(bmg, CX - text.width / 2 + TILE_W / 2, CY + LOGO_ROWS * TILE_H * 0.75);
    }

}
