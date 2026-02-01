const board = document.querySelector('.board');
const timerElement = document.querySelector('.timer');
const movesElement = document.querySelector('.moves');
const pauseBtn = document.querySelector('.pause-btn');
const restartBtn = document.querySelector('.restart-btn');
const newGameBtn = document.querySelector('.new-game-btn');
const totalGamesElement = document.getElementById('total-games');
const fastestTimeElement = document.getElementById('fastest-time');
const slowestTimeElement = document.getElementById('slowest-time');

let tiles = [];
let emptyTileIndex;
let moves = 0;
let timer;
let time = 0;
let isPaused = false;
let gameStarted = false;

let totalGames = 0;
let fastestTime = null;
let slowestTime = null;

function createBoard() {
    board.innerHTML = '';
    tiles = [];
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (i === 15) {
            tile.classList.add('empty');
            emptyTileIndex = 15;
        } else {
            tile.textContent = i + 1;
        }
        tiles.push(tile);
        board.appendChild(tile);

        tile.addEventListener('click', () => {
            if (!isPaused) {
                const tileIndex = tiles.indexOf(tile);
                moveTile(tileIndex);
            }
        });
    }
}

function shuffleBoard() {
    let puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    do {
        for (let i = puzzle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
        }
    } while (!isSolvable(puzzle));

    for (let i = 0; i < 16; i++) {
        const tile = tiles[i];
        const value = puzzle[i];
        tile.textContent = value === 0 ? '' : value;
        if (value === 0) {
            tile.classList.add('empty');
            emptyTileIndex = i;
        } else {
            tile.classList.remove('empty');
        }
    }
}

function isSolvable(puzzle) {
    let inversions = 0;
    for (let i = 0; i < 15; i++) {
        for (let j = i + 1; j < 16; j++) {
            if (puzzle[i] !== 0 && puzzle[j] !== 0 && puzzle[i] > puzzle[j]) {
                inversions++;
            }
        }
    }

    const indexOfZero = puzzle.indexOf(0);
    const rowOfEmptyTileFromTop = Math.floor(indexOfZero / 4);
    const rowOfEmptyTileFromBottom = 4 - rowOfEmptyTileFromTop;

    return (inversions + rowOfEmptyTileFromBottom) % 2 === 1;
}


function moveTile(tileIndex) {
    const emptyRow = Math.floor(emptyTileIndex / 4);
    const emptyCol = emptyTileIndex % 4;
    const tileRow = Math.floor(tileIndex / 4);
    const tileCol = tileIndex % 4;

    const isAdjacent = (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
                       (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow);

    if (isAdjacent) {
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        const tileValue = tiles[tileIndex].textContent;
        tiles[emptyTileIndex].textContent = tileValue;
        tiles[emptyTileIndex].classList.remove('empty');
        tiles[tileIndex].textContent = '';
        tiles[tileIndex].classList.add('empty');
        emptyTileIndex = tileIndex;
        moves++;
        movesElement.textContent = `Moves: ${moves}`;
        checkWin();
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            time++;
            timerElement.textContent = `Time: ${time}s`;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function checkWin() {
    for (let i = 0; i < 15; i++) {
        if (tiles[i].textContent != i + 1) {
            return;
        }
    }
    stopTimer();
    updateStats();
    setTimeout(() => {
        alert('You Win!');
    }, 100);
}

function updateStats() {
    totalGames++;
    totalGamesElement.textContent = totalGames;
    if (fastestTime === null || time < fastestTime) {
        fastestTime = time;
        fastestTimeElement.textContent = `${fastestTime}s`;
    }
    if (slowestTime === null || time > slowestTime) {
        slowestTime = time;
        slowestTimeElement.textContent = `${slowestTime}s`;
    }
}

function resetGame() {
    stopTimer();
    moves = 0;
    time = 0;
    isPaused = false;
    gameStarted = false;
    movesElement.textContent = `Moves: ${moves}`;
    timerElement.textContent = `Time: ${time}s`;
    pauseBtn.textContent = 'Pause';
}

newGameBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to start a new game?')) {
        resetGame();
        createBoard();
        shuffleBoard();
    }
});

restartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to restart this game?')) {
        resetGame();
        shuffleBoard();
    }
});

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    if (isPaused) {
        stopTimer();
    } else {
        startTimer();
    }
});

document.addEventListener('keydown', (e) => {
    if (!isPaused) {
        let tileIndexToMove = -1;
        switch (e.key) {
            case 'ArrowUp':
                if (emptyTileIndex < 12) tileIndexToMove = emptyTileIndex + 4;
                break;
            case 'ArrowDown':
                if (emptyTileIndex > 3) tileIndexToMove = emptyTileIndex - 4;
                break;
            case 'ArrowLeft':
                if (emptyTileIndex % 4 < 3) tileIndexToMove = emptyTileIndex + 1;
                break;
            case 'ArrowRight':
                if (emptyTileIndex % 4 > 0) tileIndexToMove = emptyTileIndex - 1;
                break;
        }
        if (tileIndexToMove !== -1) {
            moveTile(tileIndexToMove);
        }
    }
});


createBoard();
shuffleBoard();