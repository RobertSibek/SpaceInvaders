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
    drawHorizontallyCenteredTextWithFont('Top 10 players', 100, '20px Arial', '#C0F0BB');
    for (var i = 0; i < topTenScores.length; i++) {
        drawHorizontallyCenteredTextWithFont(topTenScores[i].name + '.........' + lpad(topTenScores[i].score, 6), 160 + i * 30, '20px Courier New', '#C0F0BB');
    }
}