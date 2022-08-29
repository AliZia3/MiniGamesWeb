// Board
let board;
let blockSize;
let rows;
let cols;
let boardSize = window.matchMedia("(max-width: 1000px")
let context; // Drawing object

// Snake Head (Starts at (5,5) on board)
let snakeX;
let snakeY;

// Snake Velocity
let velocityX = 0;
let velocityY = 0;

// Snake Body
let snakeBody = [];

// Food
let foodX;
let foodY;

// Gameplay Conditions
let score = 0;
let gameOver = false;
let resetBtn = document.getElementById('reset').addEventListener('click', resetGame);


window.onload = function () {
    // Prevents window from scrolling when clicking keys in the array
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    boardSizeChanger(boardSize);
    swiperHandler();
    setGame();
    setInterval(update, 1000 / 10); //Calls update function every 100 miliseconds
}


// Initializes game 
function setGame() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    // Used for drawing on the board
    context = board.getContext("2d");

    placeFood();
    document.addEventListener('keyup', changeDir);
}


//Game board conditions for different screens
function boardSizeChanger(boardSize) {
    if (boardSize.matches) {
        blockSize = 20;
        rows = 16;
        cols = 16;
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
    }
    else {
        blockSize = 25;
        rows = 21;
        cols = 21;
        snakeX = blockSize * 4;
        snakeY = blockSize * 4;
    }
}


// Updates board
function update() {
    if (gameOver) {
        return;
    }

    // Board
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height); // (0,0) is x/y coord board.width/height is width and height

    // Food
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        document.getElementById('game-score').innerText = score += 1;
        placeFood();
    }

    // Keep snake body and head attached
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Snake
    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // (snakeX, snakeY) is x/y coord and blocksize is width and height
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game Over Conditions
    // Out of Bounds
    if (snakeX < 0 || snakeX > (cols * blockSize) - 1 || snakeY < 0 || snakeY > (rows * blockSize) - 1) {
        gameOver = true;
        gameOverMessage();
    }
    // Bumping into body parts
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            gameOverMessage();
        }
    }
}


// Changes direction of snake
function changeDir(e) {
    // && statement ensures the snake is not allowed to go in the opposite direction it is currently travelling
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


// Changes direction of snake when swiping on touch screen devices (i.e phones)
function swiperHandler() {
    let boardEl = document.getElementById('board')
    boardEl.addEventListener('touchstart', handleTouchStart, false);
    boardEl.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||
            evt.originalEvent.touches;
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0 && velocityX != -1) {
                // Swipe Right
                velocityX = -1;
                velocityY = 0;
            } else if (xDiff < 0 && velocityX != 1) {
                // Swipe Left
                velocityX = 1;
                velocityY = 0;
            }
        } else {
            if (yDiff > 0 && velocityY != 1) {
                // Swipe Up 
                velocityX = 0;
                velocityY = -1;
            } else if (yDiff < 0 && velocityY != -1) {
                // Swipe Down
                velocityX = 0;
                velocityY = 1;
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
}


// Places food in random (x,y) coord
function placeFood() {
    // (0-19.999) -> Math.floor -> (0-19) -> (0-19) * blocksize
    let randomX = Math.floor(Math.random() * rows);
    let randomY = Math.floor(Math.random() * cols);
    foodX = blockSize * randomX;
    foodY = blockSize * randomY;
}

// Displays game over message when player loses
function gameOverMessage() {
    let message = document.createElement('div');
    message.classList.add('game-over');
    message.innerHTML = "Game Over";
    document.querySelector('.game-header').appendChild(message);
}

function resetGame() {
    location.reload();
}
