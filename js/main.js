import { setupInput } from "./event.js";
import Grid from "./grid.js";
import Tile from "./Tile.js";

const $gameBoard = document.getElementById('game-board');
const GRID = new Grid($gameBoard);

// console.log(GRID.randomEmptyCell()); //테스트
GRID.randomEmptyCell().tile = new Tile($gameBoard);
GRID.randomEmptyCell().tile = new Tile($gameBoard);


/* --- window event 관련 ---- */
setupInput();

//31:40