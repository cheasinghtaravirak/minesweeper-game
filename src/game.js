// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`
import {Board} from './board.js';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs); //In order to use methods in the board class
  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex); //a method in board class
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {//Where playerBoard comes from? It comes from get playerBoard() in Board class
      console.log('Game Over');
      this._board.print();
    } else if(!this._board.hasSafeTiles()) {
      console.log('Congratulation, you won the game');
    } else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}
