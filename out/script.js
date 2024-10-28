"use strict";
const players = {
    player1: {
        currentScore: 0,
        totalScore: 0,
        isActive: true,
    },
    player2: {
        currentScore: 0,
        totalScore: 0,
        isActive: false,
    },
};
// buttons
const rollDiceBtn = document.getElementById("rollDiceBtn");
const dice = document.getElementById("dice");
const holdBtn = document.getElementById("holdBtn");
const newGameBtn = document.getElementById("newGameBtn");
const player1 = document.getElementById("player-1");
const player1TotalScore = document.getElementById("player-1-total-score");
const player1CurrentScore = document.getElementById("player-1-current-score");
const player2 = document.getElementById("player-2");
const player2TotalScore = document.getElementById("player-2-total-score");
const player2CurrentScore = document.getElementById("player-2-current-score");
let isWinnerDeclared = false;
rollDiceBtn === null || rollDiceBtn === void 0 ? void 0 : rollDiceBtn.addEventListener("click", () => {
    if (!isWinnerDeclared) {
        const diceValue = `${Math.floor(Math.random() * 6 + 1)}`;
        dice.src = `./assets/dice/dice-${diceValue}.png`;
        if (+diceValue === 1) {
            toggleActiveUser();
            return;
        }
        for (let player in players) {
            if (players[player].isActive) {
                players[player].currentScore += +diceValue;
                break;
            }
        }
        updateUserValue();
    }
});
holdBtn === null || holdBtn === void 0 ? void 0 : holdBtn.addEventListener("click", () => {
    if (!isWinnerDeclared) {
        for (let player in players) {
            if (players[player].isActive) {
                players[player].totalScore +=
                    players[player].currentScore;
                if (players[player].totalScore >= 100) {
                    if (player === "player1") {
                        player1 === null || player1 === void 0 ? void 0 : player1.classList.add("winner");
                    }
                    else {
                        player2 === null || player2 === void 0 ? void 0 : player2.classList.add("winner");
                    }
                    isWinnerDeclared = true;
                }
            }
        }
        toggleActiveUser();
    }
});
newGameBtn === null || newGameBtn === void 0 ? void 0 : newGameBtn.addEventListener("click", () => {
    if (isWinnerDeclared) {
        isWinnerDeclared = false;
        document.querySelectorAll(".winner").forEach((winner) => {
            winner.classList.remove("winner");
        });
    }
    for (let player in players) {
        players[player].currentScore = 0;
        players[player].totalScore = 0;
        if (player === "player1") {
            players[player].isActive = true;
        }
        else {
            players[player].isActive = false;
        }
    }
    if (!(player1 === null || player1 === void 0 ? void 0 : player1.classList.contains("active")))
        player1 === null || player1 === void 0 ? void 0 : player1.classList.add("active");
    player2 === null || player2 === void 0 ? void 0 : player2.classList.remove("active");
    updateUserValue();
});
function toggleActiveUser() {
    for (let player in players) {
        players[player].isActive =
            !players[player].isActive;
        players[player].currentScore = 0;
    }
    player1 === null || player1 === void 0 ? void 0 : player1.classList.toggle("active");
    player2 === null || player2 === void 0 ? void 0 : player2.classList.toggle("active");
    updateUserValue();
}
function updateUserValue() {
    player1CurrentScore.innerHTML = `${players.player1.currentScore}`;
    player1TotalScore.innerHTML = `${players.player1.totalScore}`;
    player2CurrentScore.innerHTML = `${players.player2.currentScore}`;
    player2TotalScore.innerHTML = `${players.player2.totalScore}`;
}
