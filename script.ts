// types
type Player = {
  currentScore: number;
  totalScore: number;
  isActive: boolean;
};

type Players = {
  player1: Player;
  player2: Player;
};

const players: Players = {
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

rollDiceBtn?.addEventListener("click", () => {
  if (!isWinnerDeclared) {
    const diceValue = `${Math.floor(Math.random() * 6 + 1)}`;
    dice.src = `./assets/dice/dice-${diceValue}.png`;

    if (+diceValue === 1) {
      toggleActiveUser();

      return;
    }

    for (let player in players) {
      if (players[player as keyof Players].isActive) {
        players[player as keyof Players].currentScore += +diceValue;

        break;
      }
    }

    updateUserValue();
  }
});

holdBtn?.addEventListener("click", () => {
  if (!isWinnerDeclared) {
    for (let player in players) {
      if (players[player as keyof Players].isActive) {
        players[player as keyof Players].totalScore +=
          players[player as keyof Players].currentScore;

        if (players[player as keyof Players].totalScore >= 100) {
          if (player === "player1") {
            player1?.classList.add("winner");
          } else {
            player2?.classList.add("winner");
          }

          isWinnerDeclared = true;
        }
      }
    }

    toggleActiveUser();
  }
});

newGameBtn?.addEventListener("click", () => {
  if (isWinnerDeclared) {
    isWinnerDeclared = false;
    document.querySelectorAll(".winner").forEach((winner) => {
      winner.classList.remove("winner");
    });
  }

  for (let player in players) {
    players[player as keyof Players].currentScore = 0;
    players[player as keyof Players].totalScore = 0;
    if (player === "player1") {
      players[player as keyof Players].isActive = true;
    } else {
      players[player as keyof Players].isActive = false;
    }
  }

  if (!player1?.classList.contains("active")) player1?.classList.add("active");
  player2?.classList.remove("active");
  updateUserValue();
});

function toggleActiveUser() {
  for (let player in players) {
    players[player as keyof Players].isActive =
      !players[player as keyof Players].isActive;

    players[player as keyof Players].currentScore = 0;
  }

  player1?.classList.toggle("active");
  player2?.classList.toggle("active");

  updateUserValue();
}

function updateUserValue() {
  player1CurrentScore.innerHTML = `${players.player1.currentScore}`;
  player1TotalScore.innerHTML = `${players.player1.totalScore}`;
  player2CurrentScore.innerHTML = `${players.player2.currentScore}`;
  player2TotalScore.innerHTML = `${players.player2.totalScore}`;
}