let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(index) {
  if (!gameOver && gameBoard[index] === "") {
    gameBoard[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;
    document.getElementsByClassName("cell")[index].classList.add(currentPlayer);

    if (checkWin()) {
      gameOver = true;
      localStorage.setItem("gameResult", `🏆 Player ${currentPlayer} Wins!`);
      setTimeout(() => window.location.href = "gameover.html", 2000);  // 👈 Updated here
    } else if (gameBoard.every(cell => cell !== "")) {
      gameOver = true;
      localStorage.setItem("gameResult", "🤝 It's a Draw!");
      setTimeout(() => window.location.href = "gameover.html", 2000);  // 👈 Updated here
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("turnIndicator").textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => gameBoard[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  document.getElementById("turnIndicator").textContent = `Player ${currentPlayer}'s Turn`;

  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("X", "O");
  }
}
