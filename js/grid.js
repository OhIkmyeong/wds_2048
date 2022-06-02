
export default class Grid{
    #cells //Private field
    constructor($gridElem){
        this.$board = $gridElem;
        this.STYLE = Object.freeze({
            gridSize : 4,
            cellSize:15,
            cellGap:1.5
        });
        
        this.init();
    }//constructor

    init(){
        this.set_property();
        this.#cells = this.create_cell()
        .map(($cell,index)=>{
            const X = index % this.STYLE.gridSize;
            const Y = Math.floor(index / this.STYLE.gridSize);
            return new Cell($cell,X,Y);
        });
    }//init
    
    /* set style of : var(--) */
    set_property(){
        const {gridSize, cellSize, cellGap} = this.STYLE;
        this.$board.style.setProperty("--grid-size", gridSize);
        this.$board.style.setProperty("--cell-size", `${cellSize}vmin`);
        this.$board.style.setProperty("--cell-gap", `${cellGap}vmin`);
    }//set_property

    /* create default cells */
    create_cell(){
        const {gridSize} = this.STYLE;
        const $frag = document.createDocumentFragment();
        const cells = [];
        
        for(let i=0; i<gridSize ** 2; i++){
            const $cell = document.createElement('DIV');
            $cell.classList.add('cell');
            cells.push($cell);
            $frag.appendChild($cell);
        }

        this.$board.appendChild($frag);
        return cells;
    }//create_cell

    /* getter */
    get #emptyCells(){
        return this.#cells.filter($cell => $cell.tile == null);
    }//emptyCells

    /* create random Empty */
    randomEmptyCell(){
        const randomIdx = Math.floor( Math.random() * this.#emptyCells.length );
        return this.#emptyCells[randomIdx];
    }//randomEmptyCell
}//Grid

class Cell{
    #cellElem
    #x
    #y
    #tile
    constructor($cell,X,Y){
        this.#cellElem = $cell;
        this.#x = X;
        this.#y = Y;
    }//constructor

    get tile(){return this.#tile;}
}//class-Cell