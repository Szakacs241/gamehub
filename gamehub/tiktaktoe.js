let playerScore = 0;
let botScore = 0;
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

const playerScoreElement = document.getElementById('playerScore');
const botScoreElement = document.getElementById('botScore');
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] === '') {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            if (currentPlayer === 'X') {
                playerScore++;
                playerScoreElement.textContent = playerScore;
            } else {
                botScore++;
                botScoreElement.textContent = botScore;
            }
            resetBoard();
        } else if (board.every(cell => cell !== '')) {
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                botMove();
            }
        }
    }
}

function botMove() {
    let emptyIndices = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    if (checkWin('O')) {
        botScore++;
        botScoreElement.textContent = botScore;
        resetBoard();
    } else if (board.every(cell => cell !== '')) {
        resetBoard();
    } else {
        currentPlayer = 'X';
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}
