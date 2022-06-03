export default class Tile{
    #$tile
    #x
    #y
    #value

    constructor($board,value = Math.random() > .5 ? 2 : 4){
        this.$board = $board;
        this.#$tile = this.add_tile_elem();
        this.value = value;
    }//constructor

    /* [METHOD] */
    add_tile_elem(){
        const $tile = document.createElement('DIV');
        $tile.classList.add('tile');
        this.$board.appendChild($tile);
        return $tile;
    }//add_tile_elem

    /* [GETTER & SETTER] */
    set value(v){
        this.#value = v;
        this.#$tile.textContent = v;
        const power = Math.log2(v); //x의 2제곱이 v가 되는값(루트)
        const bgLight = 100 - (power * 9);

        this.#$tile.style.setProperty(
            "--cell-bg-lightness",
            `${bgLight}%`);
        this.#$tile.style.setProperty(
            "--cell-text-lightness",
            `${bgLight <= 50 ? 90 : 10}%`);
    }//set-value;

    set x(value){
        this.#x = value;
        this.#$tile.style.setProperty("--x",value);
    }//set-x

    set y(value){
        this.#y = value;
        this.#$tile.style.setProperty("--y",value);
    }//set-y

}//class-Tile