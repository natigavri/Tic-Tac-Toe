// Gameboard data
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
    const getBoard = () => board;
    return {getBoard};  
})();

const display = (function () {
    const updateDisplay = (cellID, player, win, draw) => {
        const turn = document.getElementById("turnTitle");
        const cell = document.getElementById(cellID);
        const gameWin = win || false;
        const gameDraw = draw || false;
        cell.innerHTML = `${player.sign}`;
        if (player.sign !== " "){
            cell.classList.add(player.sign);
        }
        if (!gameWin && !gameDraw){
        // Display turn   
            if (player.name === "Player-One"){
                turn.innerHTML = "Player-Two turn!";
            }
            else {
                turn.innerHTML = "Player-One turn!";
            }
        }
        // Display win
        else if (gameWin && !gameDraw){
            turn.innerHTML = `${player.name} ` + 'wins!';
            turn.setAttribute("class", "winner");
        }
        // Display draw
        else if (gameDraw && !gameWin){
            turn.innerHTML = "Draw!";
            turn.setAttribute("class", "draw");
        }
    }

    const updateRound = (roundNum) => {
        const round = document.querySelector('#roundCounter');
        round.innerHTML = 'Round: ' + `${roundNum}`;
    }

    // Fresh gameboard
    let gameDef = {
        name: "",
        sign: " ",
    }
    updateDisplay('r2c2', gameDef);
    updateRound(1);

    return {updateDisplay, updateRound}
})();

const gameController = (function () {

    let gameOver = false;
    const rowIndex = 1;
    const colIndex = 3;
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

    // const getTurn = () => activePlayer;

    // Check if there is a winner
    const checkWin = (activePlayer, board) => {
        const checkRow = () => {
            if (`${board[0]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}` || `${board[1]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}` || `${board[2]}` == `${[activePlayer.sign,activePlayer.sign,activePlayer.sign]}`) {
                return true;
            }
        }

        const checkColumn = () => {
            if ((`${board[0][0]}` == `${activePlayer.sign}` && `${board[1][0]}` == `${activePlayer.sign}` && `${board[2][0]}` == `${activePlayer.sign}`) || (`${board[0][1]}` == `${activePlayer.sign}` && `${board[1][1]}` == `${activePlayer.sign}` && `${board[2][1]}` == `${activePlayer.sign}`) || (`${board[0][2]}` == `${activePlayer.sign}` && `${board[1][2]}` == `${activePlayer.sign}` && `${board[2][2]}` == `${activePlayer.sign}`)) {
                return true;
            }
        }

        const checkDiag = () => {
            if (((`${board[0][0]}` == `${activePlayer.sign}` && `${board[1][1]}` == `${activePlayer.sign}` && `${board[2][2]}` == `${activePlayer.sign}`) || (`${board[0][2]}` == `${activePlayer.sign}` && `${board[1][1]}` == `${activePlayer.sign}` && `${board[2][0]}` == `${activePlayer.sign}`))) {
                return true
            }
        }

        if (checkRow() || checkColumn() || checkDiag()){
            return true;
        }
    }

    //Check if there is a draw
    const checkDraw = (players) => {
        const moves = players[0].moves;
        if (moves === 5){
            return true;
        }
    }
    //Actual game turn
    const playTurn = (cellID) => {
        let board = gameboard.getBoard();
        let cellChoice = document.getElementById(cellID);
        let row = cellID[rowIndex];
        let column = cellID[colIndex];
        // check user chose empty cell
        if (cellChoice.innerHTML === " "){
            activePlayer.moves += 1;
            board[row][column] = activePlayer.sign;
            // check for winner
            if (checkWin(activePlayer, board)){
                display.updateDisplay(cellID, activePlayer, true, false);
                gameOver = true;
            // check for draw
            }else if(checkDraw(players, board)) {
                display.updateDisplay(cellID, activePlayer, false, true);
                gameOver = true;
            } else {
                display.updateDisplay(cellID, activePlayer);
                // switch player turn
                switchTurn();  
            }
            display.updateRound(players[1].moves + 1);
        } 
    }
    //Check for gameplay mouse click
    const grid = document.getElementById("grid");
    grid.addEventListener("click", (e) => {
        while(!gameOver){
            if(e.target.classList.contains("cell")){
                const cellID = e.target.getAttribute("id");
                return playTurn(cellID);
            }
        }
    });
})();





