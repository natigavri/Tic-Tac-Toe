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

const display = (function () {
    const getCellNum = (row, column) => {
        switch (row) {
            case 0:
                if (column == 0){
                    return '#cell1';
                }
                else if (column == 1){
                    return '#cell2';
                }
                else if (column == 2){
                    return '#cell3';
                }
                break;
            case 1:
                if (column == 0){
                    return '#cell4';
                }
                else if (column == 1){
                    return '#cell5';
                }
                else if (column == 2){
                    return '#cell6';
                }
                break;
            case 2:
                if (column == 0){
                    return '#cell7';
                }
                else if (column == 1){
                    return '#cell8';
                }
                else if (column == 2){
                    return '#cell9';
                }
                break;      
        }
    }
    const updateDisplay = (row, column, roundNum, player, win, draw) => {
        const round = document.querySelector('#roundCounter');
        const turn = document.getElementById("turnTitle");
        const cell = document.querySelector(getCellNum(row, column));
        const gamwWin = win || false;
        const gamewDraw = draw || false;
        if (!gamwWin && !gamewDraw){   
            cell.innerHTML = `${player.sign}` || " ";
            round.innerHTML = 'round: ' + `${roundNum}`;
            turn.innerHTML = `${player.name} ` + 'turn!' || "Player One turn!";
        }
        else if (gamwWin && !gamewDraw){
            cell.innerHTML = `${player.sign}`;
            round.innerHTML = 'round: ' + `${roundNum}`;
            turn.innerHTML = `${player.name} ` + 'wins!';
        }
        else if (gamewDraw && !gamwWin){
            cell.innerHTML = `${player.sign}`;
            round.innerHTML = 'round: ' + `${roundNum}`;
            turn.innerHTML = "Draw!";
        }
    }

    let player = {
        name: "Player-One",
        sign: " ",
        moves: 0
    }
    updateDisplay(1,2, 1 , player);
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

    const playTurn = (playerChoiceRow, playerChoiceColumn) => {
        let activePlayer = getTurn();
        let board = gameboard.getBoard();
        // check valid user input
        if (playerChoiceRow < 0 || playerChoiceRow > 2 || playerChoiceColumn < 0 || playerChoiceColumn > 2){
            console.log("Invalid move, try another");
            alert("Invalid move, try another");
        }
        else if (board[playerChoiceRow][playerChoiceColumn] === " "){ // check user chose empty cell
            activePlayer.moves = activePlayer.moves += 1;
            console.log(`${activePlayer.name} choice: [${playerChoiceRow}][${playerChoiceColumn}]`);
            board[playerChoiceRow][playerChoiceColumn] = activePlayer.sign;
            gameboard.printBoard(board);
            
            // check for winner
            if (checkWin(activePlayer, board)){
                display.updateDisplay(playerChoiceRow, playerChoiceColumn, players[0].moves + 1, activePlayer, true, false);
                return (gameOver = true);
            // check for draw
            }else if(checkDraw(players, board)) {
                display.updateDisplay(playerChoiceRow, playerChoiceColumn, players[0].moves + 1, activePlayer, false, true);
                return (gameOver = true);
            } else {
            display.updateDisplay(playerChoiceRow, playerChoiceColumn, players[0].moves + 1, activePlayer);
            // switch player turn
            switchTurn();  
            }
        }
        // in case user chose taken cell
        else {
            console.log("Invalid move, try another");
            alert("Invalid move, try another");
        }  
    }
    
    while (!gameOver){
        let row = parseInt(prompt(`${activePlayer.name} - Row:`));
        let column = parseInt(prompt(`${activePlayer.name} - Column:`));
        playTurn(row, column);
    }
    return {playTurn};
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

