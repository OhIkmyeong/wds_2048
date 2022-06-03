export function setupInput(){
    window.addEventListener('keydown',handleInput,{once:true});
}//setupInput

function handleInput(e){
    console.log(e.key);
}