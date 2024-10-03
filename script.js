const game = () => {
  let updateMsg = document.getElementById("update-msg");
  const cells = document.querySelectorAll(".row");
  const X = document.getElementById("X");
  const O = document.getElementById("O");
  const resetBtn = document.getElementById("reset-game");

  let currPlayer = 0;

  const player1 = "X";
  const player2 = "O";

  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let cellsDisable = () => {
    for (const c of cells) {
      c.disabled = true;
    }
  };

  let cellsEnable = () => {
    for (const c of cells) {
      c.disabled = false;
    }
  };

  let choiceBtnDisable = () => {
    X.disabled = true;
    O.disabled = true;
  };

  let choiceBtnEnable = () => {
    X.disabled = false;
    O.disabled = false;
  };

  let choosePlayer = () => {
    X.addEventListener("click", () => {
      currPlayer = player1;
      choiceBtnDisable();
      updateMsg.innerText = "player X turn";
      cellsEnable();
    });

    O.addEventListener("click", () => {
      currPlayer = player2;
      choiceBtnDisable();
      updateMsg.innerText = "player O turn";
      cellsEnable();
    });
  };

  let players = () => {
    choosePlayer();
    cells.forEach((element) => {
      element.addEventListener("click", () => {
        if (currPlayer == false) {
          alert("Choose a Symbol first!!");
        } else if (currPlayer == player1) {
          element.innerText = "X";
          element.style.color = "red";
          currPlayer = player2;
          element.disabled = true;
          updateMsg.innerText = "player O turn";
        } else {
          element.innerText = "O";
          element.style.color = "#890189";
          currPlayer = player1;
          element.disabled = true;
          updateMsg.innerText = "player X turn";
        }
        winner();
      });
    });
  };

  let resetGame = () => {
    for (const p of patterns) {
      let pos1Cell = cells[p[0]];
      let pos2Cell = cells[p[1]];
      let pos3Cell = cells[p[2]];
      for (let row of cells) {
        row.innerText = "";
        row.disabled = true;
        pos1Cell.style.backgroundColor = "lightcyan";
        pos2Cell.style.backgroundColor = "lightcyan";
        pos3Cell.style.backgroundColor = "lightcyan";
      }
    }
    currPlayer = 0;
    updateMsg.innerText = "Choose Symbol to start game";
    choiceBtnEnable();
  };

  let resetNewBtn = () => {
    resetBtn.addEventListener("click", () => {
      resetGame();
    });
  };

  let winner = () => {
    let draw = true;

    for (const p of patterns) {
      let pos1Cell = cells[p[0]];
      let pos2Cell = cells[p[1]];
      let pos3Cell = cells[p[2]];
      let pos1 = cells[p[0]].innerText;
      let pos2 = cells[p[1]].innerText;
      let pos3 = cells[p[2]].innerText;
      if (pos1 != "" && pos2 != "" && pos3 != "") {
        if (pos1 === pos2 && pos2 === pos3) {
          updateMsg.innerText = `Player ${pos1} is the Winner, Restart to play new game`;
          cellsDisable();
          pos1Cell.style.backgroundColor = "yellow";
          pos2Cell.style.backgroundColor = "yellow";
          pos3Cell.style.backgroundColor = "yellow";
          return;
        }
      }
    }
    for (const cell of cells) {
      if (cell.innerText === "") {
        draw = false;
        break;
      }
    }
    if (draw) {
      updateMsg.innerText = "Match is Draw! Restart to play new game";
      cellsDisable();
    }
  };

  players();
  resetNewBtn();
};
game();
