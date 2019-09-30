//localStorage.setItem("topTenScores", JSON.stringify(topTen));

function saveScore() {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("topTenScores", JSON.stringify(topTenScores));
    } else {
        // storage not supported
    }
}

function loadScore() {
    if (typeof (Storage) !== "undefined") {
        topTenScores = JSON.parse(localStorage.getItem('topTenScores'));
        if (topTenScores == null) {
            topTenScores = topTenDefault;
            saveScore();
        }
    } else {
        // storage not supported
    }
}

function drawHighScore() {
    drawHorizontallyCenteredTextWithFont('Top 10 players', POS_HEADER, FNT_HEADER, CL_TEXT_HEADER);
    for (var i = 0; i < topTenScores.length; i++) {
        drawHorizontallyCenteredTextWithFont(topTenScores[i].name + '.........' + lpad(topTenScores[i].score, 6), POS_SUBTEXT + i * 30, FNT_MONO3, CL_TEXT_NORMAL);
    }
}
