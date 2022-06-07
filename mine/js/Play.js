import Tile from "./Tile.js";

export default class Play{
    #SCORE
    constructor($board,GRID){
        this.$board = $board;
        this.GRID = GRID;
        this.KEYS = Object.freeze({
            up : "ArrowUp",
            down : "ArrowDown",
            left : "ArrowLeft",
            right : "ArrowRight",
        });
        this.$score = document.getElementById('score');
        this.score = 0;
    }//constructor

    setupInput(){
        window.addEventListener('keydown', this.handler, {once:true});
    }//setupInput

    handler = async(e)=>{
        const {up,down,left,right} = this.KEYS;
        
        //Move Tiles
        switch(e.key){
            case up :
                if(!this.canMoveUp()){this.setupInput(); return;}
                await this.moveUp();
                break;
                
            case down :
                if(!this.canMoveDown()){this.setupInput(); return;}
                await this.moveDown();
                break;
                
            case left :
                if(!this.canMoveLeft()){this.setupInput(); return;}
                await this.moveLeft();
                break;
                
            case right :
                if(!this.canMoveRight()){this.setupInput(); return;}
                await this.moveRight();
                break;

            default:
                this.setupInput();
                return;
        }//switch

        //Merge
        this.GRID.cells.forEach($cell => $cell.mergeTiles(this));

        //Make New Random Tile
        const newTile = new Tile(this.$board);
        this.GRID.randomEmptyCell().tile = newTile;

        //Game Over?
        if(!this.canMoveUp() && !this.canMoveDown() && !this.canMoveLeft() && !this.canMoveRight()){
            newTile.waitForTransition(true).then(()=>{
                console.log('패배');
                alert('YOU LOST');
            });
            return;
        }//if

        //reset-setupInput
        this.setupInput();
    }//handler

    /* [움직일 수 있는가?] */
    canMove(cells){
        return cells.some(colOrRow =>{
            return colOrRow.some(($cell,idx)=>{
                if(idx === 0) return false;
                if($cell.tile == null) return false;
                const $moveToCell = colOrRow[idx - 1];
                return $moveToCell.canAccept($cell.tile);
            });//some- colOrRow
        });//some-cells
    }//canMove

    canMoveUp(){return this.canMove(this.GRID.cellsByColumn);}
    canMoveDown(){return this.canMove(this.GRID.cellsByColumn.map(col=>[...col].reverse()));}
    canMoveLeft(){return this.canMove(this.GRID.cellsByRow);}
    canMoveRight(){return this.canMove(this.GRID.cellsByRow.map(row=>[...row].reverse()));}

    /* [움직이기] */
    slideTiles(cells){
        return Promise.all(
            cells.flatMap(group => {
                const promises = [];
                
                for(let i=1; i<group.length; i++){
                    const $cell= group[i];
                    if($cell.tile == null) continue;
                    let $lastValidCell;

                    for(let j=i-1; j>=0; j--){
                        const moveToCell = group[j];
                        if(!moveToCell.canAccept($cell.tile)) break;
                        $lastValidCell = moveToCell;
                    }//for-j

                    if($lastValidCell != null){
                        promises.push($cell.tile.waitForTransition());

                        if($lastValidCell.tile != null){
                            $lastValidCell.mergeTile = $cell.tile;
                        }else{
                            $lastValidCell.tile = $cell.tile;
                        }//if-else

                        $cell.tile = null;
                    }//if
                }//for-i

                return promises;
            })//flatMap
        );//return-Promise
    }//slideTiles

    moveUp(){
        const result = this.GRID.cellsByColumn;
        // console.log(result.flatMap(x=>x));
        return this.slideTiles(result);}
    moveDown(){
        return this.slideTiles(this.GRID.cellsByColumn.map(col=>[...col].reverse()));}
    moveLeft(){
        return this.slideTiles(this.GRID.cellsByRow);}
    moveRight(){
        return this.slideTiles(this.GRID.cellsByRow.map(row=>[...row].reverse()));}

    /* 💥03. 점수 */
    get score(){return this.#SCORE;}
    set score(num){
        this.#SCORE = num;
        this.$score.textContent = this.#SCORE;
    }//set-scroe
}//class-Play