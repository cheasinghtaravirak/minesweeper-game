//Player's Board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let i = 0; i < numberOfRows; i++) {
    let row = [];
    for(let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//Bomb Board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for(let i = 0; i < numberOfRows; i++) {
    let row = [];
    for(let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }
  let countBombs = 0;
  while(countBombs < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows); // 0 -> row - 1
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns); // 0 -> column -1
    if(board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      countBombs++;
    }
  }
  return board;
};
//Add getNumberOfNeighborBombs() function
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {

  let numberOfBombs = 0;
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  neighborOffsets.forEach(offset => {
    neighborRowIndex = offset[0] + rowIndex;
    neighborColumnIndex = offset[1] + columnIndex;
    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 &&
    neighborColumnIndex < numberOfColumns) {
      if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs += 1;
      }
    }
  });
  return numberOfBombs;
};

//Add flipTile() function
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile is already opened.');
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    //console.log('This is a bomb tile. You lose!!!');
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

//printBoard function
const printBoard = board => {
  //console.log(board.map(board.join(' ')));
  console.log(board.map(row => row.join(' | ')).join('\n'));
};
/*
.join(' '), .join('|'),
*/
//Print both boards
const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 3, 4);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

//Print Updated board
flipTile(playerBoard, bombBoard, 1, 1);
console.log('Updated board: ');
printBoard(playerBoard);
