import { setupInput, setup_event } from "./event.js";
import Grid from "./grid.js";
import Tile from "./Tile.js";

const $board = document.getElementById('game-board');

const GRID = new Grid($board);
GRID.randomEmptyCell().tile = new Tile($board);
GRID.randomEmptyCell().tile = new Tile($board);

setup_event($board,GRID);
setupInput();