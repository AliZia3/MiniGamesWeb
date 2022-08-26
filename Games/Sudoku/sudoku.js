let numSelected = ' ';
let tileSelected = ' ';
let errors = 3;
let solveBtn = document.getElementById('solve').addEventListener('click', solveBoard);
let changeBtn = document.getElementById('change').addEventListener('click', changeBoard);
let solve = false;
let change = false;
let board;
let solution;
const boards = [
    ["--74916-5", "2---6-3-9", "-----7-1-", "-586----4", "--3----9-", "--62--187", "9-4-7---2", "67-83----", "81--45---",],
    ["53--7----", "6--195---", "-98----6-", "8---6---3", "4--8-3--1", "7---2---6", "-6----28-", "---419--5", "----8--79",],
    ["-7------9", "51-42-6--", "-8-3--7--", "--8--137-", "-23-8--4-", "4--9--1--", "9628---3-", "----1-4--", "7--2-3-96",],
    ["---8-----", "4---15-3-", "-29-4-518", "-4----12-", "---6-2---", "-32----9-", "693-5-87-", "-5-48---1", "-----3---",],
    ["2-5--9--4", "------3-7", "7--856-1-", "45-7-----", "--9---1--", "-----2-85", "-2-418--6", "6-8------", "1--2--7-8",],
    ["--6-9-2--", "---7-2---", "-9-5-8-7-", "9---3---6", "75-----19", "1---4---5", "-1-3-9-8-", "---2-1---", "--9-8-1--",],
    ["---8-----", "789-1---6", "-----61--", "--7----5-", "5-87-93-4", "-4----2--", "--32-----", "8---7-439", "-----1---",],
]
const solutions = [
    ["387491625", "241568379", "569327418", "758619234", "123784596", "496253187", "934176852", "675832941", "812945763",],
    ["534678912", "672195348", "198342567", "859761423", "426853791", "713924856", "961537284", "287419635", "345286179",],
    ["374168259", "519427683", "286395714", "698541372", "123786945", "457932168", "962874531", "835619427", "741253896",],
    ["315827946", "468915732", "729346518", "946538127", "571692483", "832174695", "693251874", "257489361", "184763259",],
    ["215379864", "986124357", "734856219", "452781693", "869543172", "371692485", "527418936", "648937521", "193265748",],
    ["876493251", "345712968", "291568473", "982135746", "754826319", "163947825", "417359682", "638271594", "529684137",],
    ["165847923", "789312546", "432596178", "297463851", "518729364", "346158297", "973284615", "821675439", "654931782",],
]

// determines random board
function boardSelector() {
    let randomBoard = Math.floor(Math.random() * 7);
    let boardNum = randomBoard;
    board = boards[boardNum];
    solution = solutions[boardNum];
}

// Selects initial board and sets up game board on load
window.onload = function () {
    boardSelector();
    setGame();
};

// Sets up sudoku game
function setGame(solve, change) {
    // if user chooses to change the board, a new board will be assigned
    if (change) {
        boardSelector();
    }

    // Board 9x9
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            // <div class="tile" id="x-y"></div>
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = x.toString() + '-' + y.toString();
            document.getElementById('board').appendChild(tile)
            tile.addEventListener('click', selectTile);

            // if solve is true fill in the solution 
            if (solve) {
                if (board[x][y] == '-') {
                    tile.innerText = solution[x][y];
                }
            }

            // Arrange board
            if (board[x][y] != "-") {
                tile.innerText = board[x][y];
                tile.classList.add("tile-start");
            }
            if (x == 2 || x == 5 || x == 8) {
                tile.classList.add("horizontal-line");
            }
            if (y == 2 || y == 5 || y == 8) {
                tile.classList.add("vertical-line");
            }
            if (x == 0) {
                tile.classList.add("horizontal-line-border");
            }
            if (y == 0) {
                tile.classList.add("vertical-line-border");
            }
        }
    }

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        // <div class = number id = i>i</div
        let number = document.createElement("div");
        number.classList.add("number");
        number.id = i;
        number.innerHTML = i;
        document.getElementById("digits").appendChild(number);
        number.addEventListener("click", selectNumber);
    }
}

// Add/removes styling of selected numbers
function selectNumber() {
    // if number is already chosen, remove the styling from previous number
    if (numSelected != ' ') {
        numSelected.classList.remove("number-selected");
    }
    // add styling to selected number
    numSelected = this;
    numSelected.classList.add("number-selected");
}

// Keeps track of errors and tile selected and determines if it matches the solution
function selectTile() {
    if (numSelected) {
        // If there is a number in the tile, return so the selection cannot be overrided
        if (this.innerText != "") {
            return;
        }

        // gets x and y of the coords
        let coord = this.id.split("-");
        let x = coord[0];
        let y = coord[1];
        if (numSelected.id == solution[x][y]) {
            this.innerText = numSelected.id;
        } else {
            errors -= 1;
            document.getElementById("errors").innerHTML = "Lives Remaining: " + errors;
            if (errors <= 0) {
                alert("All Lives Lost");
                setTimeout(() => {
                    location.reload();
                    setGame();
                }, 500);
            }
        }
    }
}


function solveBoard() {
    document.getElementById('board').innerHTML = ' ';
    document.getElementById('digits').innerHTML = ' ';
    solve = true;
    setGame(solve, null)
}

function changeBoard() {
    document.getElementById('board').innerHTML = ' ';
    document.getElementById('digits').innerHTML = ' ';
    change = true;
    setGame(null, change);
}