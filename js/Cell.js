export default class Cell{
    #$cell
    #x
    #y
    #tile
    #mergeTile

    constructor($cell,X,Y){
        this.#$cell = $cell;
        this.#x = X;
        this.#y = Y;
    }//constructor

    /* [GETTER, SETTER] */
    get x(){return this.#x;}
    get y(){return this.#y;}

    get tile(){return this.#tile;}

    set tile(value){
        this.#tile = value;
        if(value == null){return;}
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }//set-tile

    get mergeTile(){ return this.#mergeTile;}

    set mergeTile(value){
        this.#mergeTile = value;
        if(value == null){return;}
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }//set-mergeTile

    /* [METHOD] */
    canAccept(tile){
        return (
            this.tile == null || 
            (this.mergeTile == null && this.tile.value === tile.value)
        )
    }//canAccept

    mergeTiles(){
        if(this.tile == null || this.mergeTile == null){return}
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }//mergeTiles
}//class-Cell