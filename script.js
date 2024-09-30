"use strict";

// Note to self: Shift + option + f = prettier formater

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

function start() {
  console.log(`Javascript kører`);

  // start ticking
  tick();
}

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  // TODO: Do stuff
  writeToCell(player.row, player.col, 0);

  //player.col--;

  switch (direction) {
    case "left":
      player.col--;
      if (player.col < 0) {
        player.col = 9;
      }
      break;
    case "right":
      player.col++;
      if (player.col > 9) {
        player.col = 0;
      }
      break;
  }

  writeToCell(player.row, player.col, 1);

  // display the model in full
  displayBoard();
}

// #endregion controller

// ****** MODEL ******
// #region model

let direction = "left";
//let direction="right"

const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

const player = {
  row: 5,
  col: 5,
};

// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

// #endregion view
