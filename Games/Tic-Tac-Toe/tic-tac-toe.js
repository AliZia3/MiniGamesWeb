let player1 = 'X';
let player2 = 'O';
let currPlayer = player1
let gameOver = false;
let board;

// calls function to set game board on load
window.onload = function () {
    setGame();
};

// sets up game board
function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            // <div class='tile' id='0-0'></div>
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = row.toString() + '-' + column.toString();

            if (row == 0 || row == 1) {
                tile.classList.add("horizontal-line");
            }
            if (column == 0 || column == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener('click', setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

// marks game board and switches user
function setTile() {
    // doesn't allow any more changes after game is over
    if (gameOver) {
        return;
    }
    let turn = document.getElementById("turn");
    let coords = this.id.split('-');
    let x = coords[0];
    let y = coords[1];

    // if spot already taken
    if (board[x][y] != ' '){
        return;
    }

    // marks the board list
    board[x][y] = currPlayer; 
    this.innerText = currPlayer;

    // mark board and switch players and turn
    if (currPlayer==player1){
        currPlayer = player2;
        turn.innerText = "Turn: O";
    }
    else {
        currPlayer = player1;
        turn.innerText = "Turn: X";
    }

    checkWinner();
}

// games win conditions
function checkWinner() {
    //horizontally, check 3 rows
    for (let x = 0; x < 3; x++) {
        if (board[x][0] == board[x][1] && board[x][1] == board[x][2] && board[x][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let y = 0; y < 3; y++) {
                let tile = document.getElementById(x.toString() + "-" + y.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let y = 0; y < 3; y++) {
        if (board[0][y] == board[1][y] && board[1][y] ==  board[2][y] && board[0][y] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let x = 0; x < 3; x++) {
                let tile = document.getElementById(x.toString() + "-" + y.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }

    const reset = document.querySelector('button');
    reset.addEventListener('click', () => {
        document.getElementById("board").innerHTML = '';
        gameOver = false;
        setGame();
    }) 
}
