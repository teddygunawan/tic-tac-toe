/* Global variable declaration */
let boardBoxesDOM = [];
let boardBoxes = [];
let boardSize = 3;
let maxBoardSize = 9;
let player = {
    'O': {
        'name': 'Teddy'
    },
    'X': {
        'name': 'Gunawan'
    }
};
let currentPlayer = 'O';
let isOver = false;
let gameContainer = document.getElementById('game');
let playerContainer = document.getElementById('player');
let resetBoardDOM = document.getElementById('game-reset');

let initializeGame = () => {
    createBoard();
    setPlayer();
    initSizeSelector();
    resetBoardDOM.addEventListener('click', resetBoard);
};


let createBoard = () => {
    let count = 0;
    for (let i = 0; i < boardSize; i++) {
        let row = createRow();
        for (let j = 0; j < boardSize; j++) {
            let box = createBox(count);
            boardBoxesDOM.push(box);
            row.appendChild(box);

            boardBoxes.push('');
            count++;
        }
        gameContainer.appendChild(row);
    }
};

let setPlayer = () => {
    playerContainer.innerHTML = player[currentPlayer].name + "'s Turn";
};

let styleBox = (box) => {
    let width = `${100 / boardSize}%`;
    let height = `${20 - boardSize}vh`;
    let lineHeight = height;
    let fontSize = `${maxBoardSize - (boardSize / 2)}rem`;

    box.style.width = width;
    box.style.height = height;
    box.style.lineHeight = lineHeight;
    box.style.fontSize = fontSize;

    return box;
}
/* Create the box element for user to click */
let createBox = (index) => {
    let box = document.createElement('div');
    box.className = 'board__box';
    box.setAttribute('data-index', index);
    box = styleBox(box);

    box.addEventListener('click', function () {
        if (!isOver && this.innerText == '') {
            let index = this.getAttribute('data-index');
            boardBoxes[index] = currentPlayer;
            this.innerHTML = currentPlayer;

            let nextPlayer;
            if (currentPlayer == 'O') {
                nextPlayer = 'X';
            } else {
                nextPlayer = 'O';
            }

            if (checkWinner()) {
                playerContainer.innerHTML = `${player[currentPlayer].name} Wins!`;
                isOver = true;
            } else if (checkDraw()) {
                playerContainer.innerHTML = 'Draw!';
            } else
                playerContainer.innerHTML = `${player[nextPlayer].name}'s Turn`;

            currentPlayer = nextPlayer;
        }
    });

    return box;
};

/* Create a new DOM element representing a row in the board */
let createRow = () => {
    let row = document.createElement('div');
    row.className = 'board__row';

    return row;
};

/*  Reset the game by changing the related variable and resetting the DOM element. 
    This function 'resets' the board instead of recreating it. */
let resetBoard = () => {
    boardBoxes = [];
    isOver = false;
    let count = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            boardBoxesDOM[count].innerHTML = '';
            boardBoxesDOM[count].className = 'board__box';
            boardBoxes.push('');
            count++;
        }
    }
    setPlayer();
};

/* Check if the game is draw, called after every move */
let checkDraw = () => {
    let isDraw = true;
    let boxLength = boardBoxes.length;
    for (let i = 0; i < boxLength; i++) {
        if (boardBoxes[i] == '') {
            isDraw = false;
            break;
        }
    }

    return isDraw;
};

/* Check for the winner, called after every move */
let checkWinner = () => {
    let winningBoxes;
    // Check Column
    for (let i = 0; i < boardSize; i++) {
        winningBoxes = [];
        for (let j = 0; j < boardSize; j++) {
            let boxIndex = (boardSize * i) + j;
            winningBoxes.push(boxIndex);
            if (boardBoxes[boxIndex] != currentPlayer)
                break;
            if (j == boardSize - 1) {
                markWinningBox(winningBoxes);
                return true;
            }
        }
    }

    // Check Row
    for (let i = 0; i < boardSize; i++) {
        winningBoxes = [];
        for (let j = 0; j < boardSize; j++) {
            let boxIndex = (boardSize * j) + i;
            winningBoxes.push(boxIndex);
            if (boardBoxes[boxIndex] != currentPlayer)
                break;
            if (j == boardSize - 1) {
                markWinningBox(winningBoxes);
                return true;
            }
        }
    }

    winningBoxes = [];
    // Check Diagonal
    for (let j = 0; j < boardSize; j++) {
        let boxIndex = (boardSize * j) + j;
        winningBoxes.push(boxIndex);
        if (boardBoxes[boxIndex] != currentPlayer)
            break;
        if (j == boardSize - 1) {
            markWinningBox(winningBoxes);
            return true;
        }
    }

    winningBoxes = [];
    // Check Reverse Diagonal
    let count = 0;
    for (let j = boardSize - 1; j >= 0; j--) {
        let boxIndex = (j * boardSize) + count;
        winningBoxes.push(boxIndex);
        if (boardBoxes[boxIndex] != currentPlayer)
            break;
        if (j == 0) {
            markWinningBox(winningBoxes);
            return true;

        }
        count++;
    }

    return false;
};

let markWinningBox = (conditions) => {
    conditions.forEach(boxIndex => {
        boardBoxesDOM[boxIndex].className += ' board__box--win';
    });
};

/* Recreate the entire board */
let recreateBoard = () => {
    boardBoxes = [];
    boardBoxesDOM = [];
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }
    createBoard();
}

let initSizeSelector = () => {
    let selectDOM = document.getElementById('boardSize');
    for (let i = 3; i < maxBoardSize + 1; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        selectDOM.appendChild(option);
    }

    selectDOM.addEventListener('change', function () {
        boardSize = this.value;
        recreateBoard();
        setPlayer();
    });
}


initializeGame();