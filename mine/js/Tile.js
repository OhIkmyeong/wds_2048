const bgColor = "--cell-bg-lightness";
const txtColor = "--cell-text-lightness";

export default class Tile{
    #TILE
    #x
    #y
    #VALUE

    constructor($board, vnum = Math.random() > 0.5 ? 2 : 4){
        this.$board = $board;
        this.#TILE = this.addTileElement();
        this.value = vnum; //set에서 실행됨
    }//constructor

    /* 💥 01. 랜덤한 타일 2개 생성 관련 */
    addTileElement(){
        const $tile = document.createElement('DIV');
        $tile.classList.add('tile');
        this.$board.appendChild($tile);
        return $tile;
    }//addTileElement

    /* [GETTER, SETTER] */
    set x(xnum){
        this.#x = xnum;
        this.#TILE.style.setProperty('--x',xnum);
    }//set-x

    set y(ynum){
        this.#x = ynum;
        this.#TILE.style.setProperty('--y',ynum);
    }//set-x

    get value(){return this.#VALUE;}

    set value(vnum){
        //숫자 설정
        this.#VALUE = vnum;
        this.#TILE.textContent = vnum;

        //배경색 및 글씨색
        const power = Math.log2(vnum);
        const bgLight = 100 - (power * 9);

        this.#TILE.style.setProperty(bgColor,`${bgLight}%`);
        this.#TILE.style.setProperty(txtColor,`${bgLight <= 50 ? 90 : 10}%`);
    }//set-value

    /* 💥 02. 이벤트 관련 */
    remove(){this.#TILE.remove();}

    waitForTransition(animation = false){
        return new Promise(res=>{
            const evt = animation ? "animationend" : "transitionend";
            this.#TILE.addEventListener(evt,res,{once:true});
        });
    }//waitForTransition
}//class-Tile