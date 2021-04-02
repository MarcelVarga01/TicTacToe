// Game variables
let xIsNext = true;
let gameIsLive = true;

class Board{

    constructor(cellTextElement){
        this.cellTextElement = cellTextElement;
    }
}  


const cellTextElement = document.querySelectorAll('.cell');
const board = new Board(cellTextElement);

cellTextElement.forEach( div => {
    div.addEventListener('click', () =>{
        
        if(xIsNext) {
            div.textContent = 'X';
            xIsNext = false;
        }
        else {
            div.textContent = 'O';
            xIsNext = true;
        }
    })
})