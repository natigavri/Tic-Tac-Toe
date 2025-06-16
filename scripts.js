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
    
    const printBoard = (board) => console.log(board);
    const getBoard = () => board;
    printBoard(board);
    // board[1][2] = "X";
    // console.log(board);
    // board[2][2] = "X";
    // console.log(board);


    return {printBoard, getBoard};  
})();

const gameController = (function () {
   
    const players = [
        {
            name: "Player-One",
            sign: "X",
            moves: 0
        },
        {
            name: "Player-Two",
            sign: "O",
            moves: 0
        }
    ];

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`${activePlayer.name} turn!`);
    };

    const getTurn = () => activePlayer;
    
    const checkWin = (activePlayer, board) => {
        // console.log(board[0]);
        // console.log([`${activePlayer.sign}, ${activePlayer.sign}, ${activePlayer.sign}`])
        // console.log([activePlayer.sign,activePlayer.sign,activePlayer.sign])
        const checkRow = () => {
            if (`${board[0]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}` || `${board[1]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}` || `${board[2]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}`) {
                console.log("row!");
                return true;
            }
        }

        const checkColumn = () => {
            if ((`${board[0][0]}` == `${activePlayer.sign}` && `${board[1][0]}` == `${activePlayer.sign}` && `${board[2][0]}` == `${activePlayer.sign}`) || (`${board[0][1]}` == `${activePlayer.sign}` && `${board[1][1]}` == `${activePlayer.sign}` && `${board[2][1]}` == `${activePlayer.sign}`) || (`${board[0][2]}` == `${activePlayer.sign}` && `${board[1][2]}` == `${activePlayer.sign}` && `${board[2][2]}` == `${activePlayer.sign}`)) {
                console.log("column!");
                return true;
            }
        }

        const checkDiag = () => {
            if (((`${board[0][0]}` == `${activePlayer.sign}` && `${board[1][1]}` == `${activePlayer.sign}` && `${board[2][2]}` == `${activePlayer.sign}`) || (`${board[0][2]}` == `${activePlayer.sign}` && `${board[1][1]}` == `${activePlayer.sign}` && `${board[2][0]}` == `${activePlayer.sign}`))) {
                console.log("diagonal!");
                return true
            }
        }

        // if (`${board[0]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}`) {
        //     console.log(board);
        //     console.log(`${activePlayer.name} wins!`);
        // }
        if (checkRow() || checkColumn() || checkDiag()){
            console.log(board);
            console.log(`${activePlayer.name} wins!`);
            return true;
        }

    }

    const checkDraw = (players, board) => {
        const moves = players[0].moves;
        console.log(`moves: ${moves}`);
        if (moves === 5){
            console.log(board);
            console.log("Draw!");
            return true;
        }
    }

    const playTurn = (playerChoiceRow, playerChoiceColumn) => {
        const activePlayer = getTurn();
        let board = gameboard.getBoard();
        if (board[playerChoiceRow][playerChoiceColumn] === " "){
            activePlayer.moves = activePlayer.moves += 1;
            console.log(`${activePlayer.name} choice: [${playerChoiceRow}][${playerChoiceColumn}]`);
            board[playerChoiceRow][playerChoiceColumn] = activePlayer.sign;
            gameboard.printBoard(board);
            if (checkWin(activePlayer, board)){
                return;
            }else if(checkDraw(players, board)) {
                return;
            } else {
            switchTurn();
            }
        }
        else {
            console.log("Invalid move, try another");
        }  
    }
        return {playTurn};
})();


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
