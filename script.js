var playerOne = "R";
var playerTwo = "B";

var currentPlayer = playerOne;
let currentPlayerText = document.getElementById('whosTurn');
var gameOver= false;

var board;
var currentColumn;

var rows= 6;
var slots= 7;



window.onload = function(){
    setGame();
}

function setGame(){
    board= [];
    //sets the slot height defaults as 5 and accounts for the gravity aspect of the game
    currentColumn = [5,5,5,5,5,5,5];

    for(let r = 0; r < rows; r++){
        let row = [];
        for (let s = 0; s < slots; s++){
            row.push(" ");

            let tile = document.createElement('div');
            tile.id = r.toString() + "+" + s.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);

        }

        board.push(row);
    }
}

function setPiece() {
    if (gameOver){
        
        return;
    }

    let coordinates = this.id.split("+");
    let r = parseInt(coordinates[0]);
    let s = parseInt(coordinates[1]);

    r = currentColumn[s];
    if (r < 0){
        return 
    }
    
    

    board[r][s] = currentPlayer;

    let tile = document.getElementById(r.toString() + "+"+ s.toString());
    //checks who the current player is and sets the color accordingly
    if(currentPlayer == playerOne){
        let delay = 100;

        for (let i = 0; i <= r; i++) {
            let previousTile = document.getElementById((i-1).toString() + "+" + s.toString());

            setTimeout(function (){
                if(i > 0){
                    previousTile.classList.remove('redPiece');
                }
              
                let currentTile = document.getElementById(i.toString() + "+" + s.toString());
                currentTile.classList.add("redPiece");
            }, delay *(rows -1+i));

        }
        //player one takes their turn and the curren player updates to blue
        currentPlayer = playerTwo;
        document.getElementById("whosTurn").innerHTML = "Player twos Turn";

    }
    else{
        let delay = 100;

        for (let i = 0; i <= r; i++) {
            let previousTile = document.getElementById((i-1).toString() + "+" + s.toString());
            setTimeout(function (){
                if( i > 0){
                   
                    previousTile. classList.remove("bluePiece")
                }
                let currentTile = document.getElementById(i.toString() + "+" + s.toString());
                currentTile.classList.add("bluePiece");
            }, delay *(rows -1+i));

        }
          //player two takes their turn and the curren player updates to red
          currentPlayer = playerOne;
          document.getElementById("whosTurn").innerHTML = "Player Ones Turn";
    }
//change row height 
    r = r-1;

//update the array
    currentColumn[s] = r;

    checkForWinner();

}

function checkForWinner(){
//check diagonal Left slant
for(let r = 0; r< rows-3; r++){
    for(let s = 0; s< slots-3; s++){
    if(board[r][s] != " "){
        if (board[r][s] == board[r+1][s+1] &&
            board[r][s] == board[r+2][s+2] &&
            board[r][s] == board[r+3][s+3] ){

                declareWinner(r,s);
                return;
            }
            }
        }
    }
//check diagonal right slant
for (let r = 3; r< rows ; r++){
    for(let s= 0; s < slots-3; s++){
        if(board[r][s] != " "){
            if (board[r][s] == board[r-1][s+1] &&
                board[r][s] == board[r-2][s+2] &&
                board[r][s] == board[r-3][s+3] ){
    
                    declareWinner(r,s);
                    return;
                }
            }
        }
    }

//check vertically
    for(let s = 0; s< slots; s++){
        for(let r = 0; r< rows-3; r++){
            if(board[r][s] != " "){
                if (board[r][s] == board[r+1][s] &&
                    board[r][s] == board[r+2][s] &&
                    board[r][s] == board[r+3][s] ){

                        declareWinner(r,s);
                        return;
                    }
            

        }
    }
}
    //check horizontally
    for(let r = 0; r< rows; r++){
        for(let s = 0; s < slots-3; s++){
            if(board[r][s] != " "){
                if (board[r][s] == board[r][s+1] &&
                    board[r][s] == board[r][s+2] &&
                    board[r][s] == board[r][s+3] ){

                        declareWinner(r,s);
                        return;
                    }
            

        }
    }
}

}

function declareWinner(r,s){
    if (board[r][s] == playerOne){
        document.getElementById("whosTurn").innerHTML = "";
        document.getElementById("declareWinner").innerHTML = "Player Two Wins!"
    }
    else{
        document.getElementById("whosTurn").innerHTML = "";
        document.getElementById("declareWinner").innerHTML = "Player Two Wins!"
    }

    gameOver = true;

}