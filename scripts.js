const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(" ");
        }
    }
    
    const printBoard = () => console.log(board);
    const getBoard = () => board;


    return {printBoard, getBoard};  
})();




function gameController() {
   
    const players = [
        {
            name: "Player-One",
            sign: "X"
        },
        {
            name: "Player-Two",
            sign: "O"
        }
    ];
    
    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const playTurn = () => {

    }
        
}


GameController();


//have empty board - 3 X 3.
//have 2 players - X and O.
//player 1 take turn.
//check player 1 choice is viable.
//update board.
//check winning status.
//switch players.
//player 2 take turn.
//check player 2 choice is viable.
//update board.
//check winning status.
//repeat.
//if win or draw - game over and show winner.
//winning if 3 X or O in series.
//draw if no possible moves left (both players can have 4 moves, 
//only one player can have 5 before no more space left on board).
