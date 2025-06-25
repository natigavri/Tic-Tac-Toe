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
    return {printBoard, getBoard};  
})();

const display = (function () {
    const updateDisplay = (cellID, roundNum, player, win, draw) => {
        const round = document.querySelector('#roundCounter');
        const turn = document.getElementById("turnTitle");
        const cell = document.getElementById(cellID);
        const gamwWin = win || false;
        const gamewDraw = draw || false;
        if (!gamwWin && !gamewDraw){
        // Display turn   
            cell.innerHTML = `${player.sign}` || " ";
            round.innerHTML = 'round: ' + `${roundNum}`;
            turn.innerHTML = `${player.name} ` + 'turn!';
        }
        // Display win
        else if (gamwWin && !gamewDraw){
            cell.innerHTML = `${player.sign}`;
            round.innerHTML = 'round: ' + `${roundNum}`;
            turn.innerHTML = `${player.name} ` + 'wins!';
        }
        // Display draw
        else if (gamewDraw && !gamwWin){
            cell.innerHTML = `${player.sign}`;
            round.innerHTML = 'round: ' + `${roundNum}`;
            turn.innerHTML = "Draw!";
        }
    }
    // Fresh gameboard
    let gameDef = {
        name: "Player-One",
        sign: " ",
    }
    updateDisplay('r2c2', 1 , gameDef);

    return {updateDisplay}
})();

const gameController = (function () {

    let gameOver = false;
   // Players objects
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

    // Change player turn
    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`${activePlayer.name} turn!`);
    };

    const getTurn = () => activePlayer;

    // Check if there is a winner
    const checkWin = (activePlayer, board) => {
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

        if (checkRow() || checkColumn() || checkDiag()){
            console.log(board);
            console.log(`${activePlayer.name} wins!`);
            return true;
        }
    }

    //Check if there is a draw
    const checkDraw = (players, board) => {
        const moves = players[0].moves;
        console.log(`moves: ${moves}`);
        if (moves === 5){
            console.log(board);
            console.log("Draw!");
            return true;
        }
    }

    const playTurn = (cellID) => {
        let activePlayer = getTurn();
        let board = gameboard.getBoard();
        let cellChoice = document.getElementById(cellID);
        let row = cellID[1];
        let column = cellID[3];

        if (cellChoice.innerHTML !== " "){
            console.log("Invalid move, try another");
        }
        else { // check user chose empty cell
            activePlayer.moves = activePlayer.moves += 1;
            console.log(`${activePlayer.name} choice: ${cellID}`);
            board[row][column] = activePlayer.sign;
            gameboard.printBoard(board);
            
            // check for winner
            if (checkWin(activePlayer, board)){
                display.updateDisplay(cellID, players[0].moves + 1, activePlayer, true, false);
                return (gameOver = true);
            // check for draw
            }else if(checkDraw(players, board)) {
                display.updateDisplay(cellID, players[0].moves + 1, activePlayer, false, true);
                return (gameOver = true);
            } else {
                display.updateDisplay(cellID, players[0].moves + 1, activePlayer);
                // switch player turn
                switchTurn();  
            }
        } 
    }
    
    const grid = document.getElementById("grid");
    grid.addEventListener("click", (e) => {
        while(!gameOver){
            if(e.target.className === 'cell'){
                let cellID = e.target.getAttribute("id");
                return playTurn(cellID);
        }
    }
});
    // while (!gameOver){
    //     let row = parseInt(prompt(`${activePlayer.name} - Row:`));
    //     let column = parseInt(prompt(`${activePlayer.name} - Column:`));
    //     playTurn(row, column);
    // }
    // return {playTurn};
})();


// const updateDisplay = (function (cellNum, roundNum, player) {
//     const round = document.querySelector('#roundCounter');
//     const turn = document.getElementById("turnTitle");
//     const cell = document.querySelector(cellNum || '#cell5');

//     cell.innerHTML = `${player.sign}`;
//     round.innerHTML = round.innerHTML + `${roundNum}`;
//     turn.innerHTML = `${player.name} ` + turn.innerHTML;
// })('#cell6', 2, {
//     name: "Player-Two",
//     sign: "O"
// });




// function updateDisplay (cellNum) {
//     const round = document.querySelector('#roundCounter');
//     const turn = document.getElementById("turnTitle");
//     const cell = document.querySelector(cellNum || '#cell5');

//     cell.innerHTML = "O";
//     round.innerHTML = '1';
//     turn.innerHTML = "MAGIC";
// }

// updateDisplay('#cell6');


