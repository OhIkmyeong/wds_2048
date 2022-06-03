import Cell from "./Cell.js";

export default class Grid{
    #cells

    constructor($gridElem){
        this.$board = $gridElem;
        this.STYLE = Object.freeze({
            gridSize : 4,
            cellSize:15,
            cellGap:1.5
        });
        
        this.init();        
    }//constructor

    /* [GETTER, SETTER] */
    get cells(){return this.#cells;}

    get cellsByRow(){
        return this.#cells.reduce((cellGrid, cell)=>{
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        },[]);
    };

    get cellsByColumn(){
        return this.#cells.reduce((cellGrid, cell)=>{
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        },[]);
    };

    get #emptyCells(){
        return this.#cells.filter($cell => $cell.tile == null);
    }//emptyCells
    
    /* [METHOD] */
    // INIT
    init(){
        this.set_board();

        this.#cells = this.createCellElements()
        .map(($cell,index)=>{
            const X = index % this.STYLE.gridSize;
            const Y = Math.floor(index / this.STYLE.gridSize);
            return new Cell($cell,X,Y);
        });
    }//init
    
    /* set style of : var(--) */
    set_board(){
        const {gridSize, cellSize, cellGap} = this.STYLE;
        this.$board.style.setProperty("--grid-size", gridSize);
        this.$board.style.setProperty("--cell-size", `${cellSize}vmin`);
        this.$board.style.setProperty("--cell-gap", `${cellGap}vmin`);
    }//set_board

    /* create default cells */
    createCellElements(){
        const {gridSize} = this.STYLE;
        const $frag = document.createDocumentFragment();
        const result = [];
        
        for(let i=0; i<gridSize ** 2; i++){
            const $cell = document.createElement('DIV');
            $cell.classList.add('cell');
            result.push($cell);
            $frag.appendChild($cell);
        }

        this.$board.appendChild($frag);
        return result;
    }//createCellElements

    /* create random Empty */
    randomEmptyCell(){
        const randomIdx = Math.floor( Math.random() * this.#emptyCells.length );
        return this.#emptyCells[randomIdx];
    }//randomEmptyCell
}//Grid