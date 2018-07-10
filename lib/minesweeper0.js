'use strict';

//Player's Board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//Bomb Board
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }
  var countBombs = 0;
  while (countBombs < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows); // 0 -> row - 1
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns); // 0 -> column -1
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      countBombs++;
    }
  }
  return board;
};
//Add getNumberOfNeighborBombs() function
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {

  var numberOfBombs = 0;
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  neighborOffsets.forEach(function (offset) {
    neighborRowIndex = offset[0] + rowIndex;
    neighborColumnIndex = offset[1] + columnIndex;
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs += 1;
      }
    }
  });
  return numberOfBombs;
};

//Add flipTile() function
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile is already opened.');
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    //console.log('This is a bomb tile. You lose!!!');
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

//printBoard function
var printBoard = function printBoard(board) {
  //console.log(board.map(board.join(' ')));
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};
/*
.join(' '), .join('|'),
*/
//Print both boards
var playerBoard = generatePlayerBoard(3, 3);
var bombBoard = generateBombBoard(3, 3, 4);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

//Print Updated board
flipTile(playerBoard, bombBoard, 1, 1);
console.log('Updated board: ');
printBoard(playerBoard);