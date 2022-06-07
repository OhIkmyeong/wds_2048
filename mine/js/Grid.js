import Cell from "./Cell.js";

export default class Grid{
    #CELLS

    constructor($board){
        this.$board = $board;
        this.SETTING = Object.freeze({
            gridSize : 4,
            cellSize : 15,
            cellGap : 1.5
        });
        this.init();
    }//constructor

    /* 💥01. 그리드 그려주고 Cell 클래스 개별 생성 관련 */
    /* init all */
    init(){
        const CELLS = this.draw_grid();

        this.#CELLS = CELLS.map(($cell,idx)=>{
            const X = idx % this.SETTING.gridSize;
            const Y = Math.floor(idx / this.SETTING.gridSize);
            return new Cell($cell,X,Y);
        });
    }//init

    /* draw grid */
    draw_grid(){
        const {gridSize,cellSize,cellGap} = this.SETTING;
        const CELLS = [];

        this.$board.style.setProperty('--grid-size',gridSize);
        this.$board.style.setProperty('--cell-size',`${cellSize}vmin`);
        this.$board.style.setProperty('--cell-gap',`${cellGap}vmin`);

        const $frag = document.createDocumentFragment();
        for(let i=0; i < gridSize ** 2; i++){
            const $cell = document.createElement('DIV');
            $cell.classList.add('cell');
            $frag.appendChild($cell);
            CELLS.push($cell);
        }//for

        this.$board.appendChild($frag);

        return CELLS;
    }//draw_grid

    /* get a random EMPTY tile */
    randomEmptyCell(){
        const rIdx = Math.floor(Math.random() * this.#EmptyCells.length);
        const emptyCell= this.#EmptyCells[rIdx];
        return emptyCell;
    }//randomEmptyCell

    /* GETTER, SETTER */
    get #EmptyCells(){
        return this.#CELLS.filter($cell => $cell.tile == null);
    }//#EmptyCells

    /* 💥02. 키보드 이벤트 핸들러 관련 */
    get cellsByColumn(){
        return this.#CELLS.reduce((cellGrid,cell)=>{
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        },[]);
    }//cellsByColumn

    get cellsByRow(){
        return this.#CELLS.reduce((cellGrid,cell)=>{
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        },[]);
    }//cellsByRow

    get cells(){return this.#CELLS;}
}//class-Grid