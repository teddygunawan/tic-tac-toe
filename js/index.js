/* Global variable declaration */
let boardBoxesDOM = [];
let boardBoxes = [];
let boardSize = 9;
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
let gameReset = document.getElementById('game-reset');

let initializeGame = () => {
    createBoard();
    setPlayer();
    gameReset.addEventListener('click', resetGame);
};

let createBoard = () => {
    let count = 0;
    let width = 100 / boardSize;
    width = `${width}%`;
    for (let i = 0; i < boardSize; i++) {
        let row = createRow();
        for (let j = 0; j < boardSize; j++) {
            let box = createBox(count);
            box.style.width = width;
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

/* Create the box element for user to click */
let createBox = (index) => {
    let box = document.createElement('div');
    box.className = 'board__box';
    box.setAttribute('data-index', index);

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

/* Reset the game by changing the related variable and resetting the DOM element */
let resetGame = () => {
    boardBoxes = [];
    isOver = false;
    let count = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            boardBoxesDOM[count].innerHTML = '';
            boardBoxesDOM[count].className = "board__box";
            boardBoxes.push('');
            count++;
        }
    }
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
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let conditionsLength = winConditions.length;
    for (let i = 0; i < conditionsLength; i++) {
        let [a, b, c] = winConditions[i];
        if (boardBoxes[a] && boardBoxes[a] === boardBoxes[b] && boardBoxes[a] === boardBoxes[c]) {
            markWinningBox(winConditions[i]);
            return true;
        }
    }

    return false;
};

let markWinningBox = (conditions)=>{
    conditions.forEach( boxIndex => {
        boardBoxesDOM[boxIndex].className += ' board__box--win';
    });
};

let boardSizeSelector = ()=>{
    let selectDOM = document.getElementById('boardSize');
    for(let i = 3; i < 9; i++){
        let option = document.createElement('option');
        option.value = i;
        selectDOM.appendChild(option);
    }

    selectDOM.addEventListener('select', function(
        
    ));
}


initializeGame();