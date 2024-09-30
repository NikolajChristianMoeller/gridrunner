"use strict";

// Note to self: Shift + option + f = prettier formater

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

function start() {
  console.log(`JavaScript kører`);

  document.addEventListener("keydown", keyDown);

  // start ticking
  tick();
}

function keyDown(event) {
  console.log(event);
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
  }
}

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  // TODO: Do stuff
  //writeToCell(player.row, player.col, 0);

  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }

  // const newHead = {
  //   row: queue[queue.length-1].row,
  //   col: queue[queue.length-1].col
  // }

  //player.col--;

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  };

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col++;
      if (head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row++;
      if (head.row > 9) {
        head.row = 0;
      }
  }

  queue.push(head);

  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  // writeToCell(player.row, player.col, 1);

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

const queue = [
  {
    row: 5,
    col: 5,
  },
  {
    row: 5,
    col: 6,
  },
  {
    row: 5,
    col: 7,
  }, // her er enden af køen - der kommer nye elementer ind
];

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
