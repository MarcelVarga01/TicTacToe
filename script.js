// Game variables
let xIsNext = true;
let gameIsLive = true;
let filledCells = 0;

class Board{

    constructor(cellTextElement){
        this.cellTextElement = cellTextElement;
    }

    playerMove(i){  
        if(this.cellTextElement[i].textContent !== '') {console.log("Cell is full"); return;}
        if(xIsNext) {
                this.cellTextElement[i].textContent = 'X';
                xIsNext = false;
            }
            else {
                this.cellTextElement[i].textContent = 'O';
                xIsNext = true;
            }
        filledCells++;
    }

    getWinner(){
        let winner = '';

        if (board.checkWinner('X') === true) winner = 'X';
        if (board.checkWinner('O') === true) winner = 'O';
        if(filledCells == 9 && winner === '')
            return "Draw";
        
        return winner;
    }

    checkWinner(player){
        // Check rows and columns for 3 in a row
        for (let i = 0; i < 3; i++){
            var similar0 = 0;
            var similar1 = 0;
            for(let j = 0; j < 3; j++){
                if(this.cellTextElement[i * 3 + j].textContent === player) similar0++;
                if(this.cellTextElement[j * 3 + i].textContent === player) similar1++;
            }
            if(similar0 === 3 || similar1 === 3) return true;
        }
        // Check diagonals
        var similar0 = 0;
        var similar1 = 0;
        for(let i = 0; i < 3; i++){
            if(this.cellTextElement[4 * i].textContent === player) similar0++;
            if(this.cellTextElement[2 * i + 2].textContent === player) similar1++;

            if (similar0 === 3 || similar1 === 3) return true;
        }

        return false;
    }

    handleWinner(winner){

        if(winner === '') return;
        gameIsLive = false;
        overlay.style.display = "flex";
        
        if(winner === 'Draw') overlayText.textContent = `Draw!`;
        else overlayText.textContent = `${winner} Wins!`;
    }

    restartGame(){
        gameIsLive = true;
        xIsNext = true;
        filledCells = 0;
        for (let i = 0; i < cellTextElement.length; i++)
            cellTextElement[i].textContent = '';
    }
    
}  


const cellTextElement = document.querySelectorAll('.cell');
const overlayButton = document.querySelector('#overlayButton');
const overlay = document.querySelector('#overlay');
const overlayText = document.querySelector("#overlayText");

const board = new Board(cellTextElement);

for (let i = 0; i < cellTextElement.length; i++) {
    let element = cellTextElement[i];
    element.addEventListener('click', () =>{
        if(gameIsLive){
            board.playerMove(i);
            let winner = board.getWinner();
            board.handleWinner(winner);
        }
    })
}

overlayButton.addEventListener('click', () =>{
    overlay.style.display = "none";
    board.restartGame();
})