import Tile from './Tile.js';

let GRID,$board;

export function setup_event(BOARD,grid){
    $board = BOARD;
    GRID = grid;
}//setup_event

export function setupInput(){
    window.addEventListener('keydown',handleInput,{once:true});
}//setupInput

async function handleInput(e){
    switch(e.key){
        case "ArrowUp":
            if(!canMoveUp()){
                setupInput();
                return;}
            await moveUp()
            break;
        case "ArrowDown":
            if(!canMoveDown()){
                setupInput();
                return;}
            await moveDown()
            break;
        case "ArrowLeft":
            if(!canMoveLeft()){
                setupInput();
                return;}
            await moveLeft()
            break;
        case "ArrowRight":
            if(!canMoveRight()){
                setupInput();
                return;}
            await moveRight()
            break;
        default:
            break;
    }//switch
    
    //other codes
    GRID.cells.forEach($cell => $cell.mergeTiles());

    const newTile = new Tile($board);
    GRID.randomEmptyCell().tile = newTile;

    if(!canMoveUp() && !canMoveDown() 
       && !canMoveLeft() && !canMoveRight()){
        newTile.waitForTransition(true).then(()=>{alert("YOU LOST");});
        return;}

    setupInput();
}//handleInput

function moveUp(){
    return slideTiles(GRID.cellsByColumn);
}//moveUp

function moveDown(){
    return slideTiles(GRID.cellsByColumn.map(column => [...column].reverse()));
}//moveDown

function moveLeft(){
    return slideTiles(GRID.cellsByRow);
}//moveLeft

function moveRight(){
    return slideTiles(GRID.cellsByRow.map(column =>[...column].reverse()));
}//moveRight

/* slideTiles */
function slideTiles(cells){
    return Promise.all(
        cells.flatMap(group=>{
            const promises = [];
            for(let i = 1; i < group.length; i++){
                const $cell = group[i];
                if($cell.tile == null){continue;}
                let $lastValidCell;

                for(let j = i-1; j >= 0; j--){
                    const moveToCell = group[j];
                    if(!moveToCell.canAccept($cell.tile)){break;}
                    $lastValidCell = moveToCell;
                }//for-j

                if ($lastValidCell != null){
                    promises.push($cell.tile.waitForTransition());
                    if($lastValidCell.tile != null){
                        $lastValidCell.mergeTile = $cell.tile;
                    }else{
                        $lastValidCell.tile = $cell.tile;
                    }//if else
                    $cell.tile = null;
                }//if
            }//for-i

            return promises;
        })//forEach
    );//Promise.all
}//slideTiles

/* 움직일 수 있는지 */
function canMoveUp(){
    return canMove(GRID.cellsByColumn);
}//canMoveUp

function canMoveDown(){
    return canMove(GRID.cellsByColumn.map(col=>[...col].reverse()));
}//canMoveDown

function canMoveLeft(){
    return canMove(GRID.cellsByRow);
}//canMoveLeft

function canMoveRight(){
    return canMove(GRID.cellsByRow.map(row=>[...row].reverse()));
}//canMoveRight

function canMove(cells){
    return cells.some(group => {
        return group.some(($cell, index) => {
            if (index === 0){return false}
            if ($cell.tile == null){return false}
            const $moveToCell = group[index-1]
            return $moveToCell.canAccept($cell.tile)
        })
    })
}//canMove