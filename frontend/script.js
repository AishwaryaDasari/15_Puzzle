const puzzleGrid = document.getElementById('puzzle-grid');
const movesSpan = document.getElementById('moves');
const timerSpan = document.getElementById('timer');
const shuffleButton = document.getElementById('shuffle-button');
const winMessage = document.getElementById('win-message');

const gridSize = 4;
let tiles = [];
let emptyTile = { row: 3, col: 3 };
let moveCount = 0;
let timer = 0;
let timerInterval;
let isGameStarted = false;

function createTile(number, row, col) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (number === null) {
        tile.classList.add('empty');
    } else {
        const correctRow = Math.floor((number - 1) / gridSize);
        const correctCol = (number - 1) % gridSize;
        if (row === correctRow && col === correctCol) {
            tile.classList.add('correct');
        }
    }
    tile.textContent = number;
    tile.style.gridRowStart = row + 1;
    tile.style.gridColumnStart = col + 1;
    tile.addEventListener('click', () => onTileClick(row, col));
    return tile;
}

function renderGrid() {
    puzzleGrid.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = createTile(tiles[i][j], i, j);
            puzzleGrid.appendChild(tile);
        }
    }
}

function onTileClick(row, col) {
    if (!isGameStarted) return;

    const dr = Math.abs(row - emptyTile.row);
    const dc = Math.abs(col - emptyTile.col);

    if (dr + dc === 1) {
        moveTile(row, col);
        checkWin();
    }
}

function moveTile(row, col) {
    tiles[emptyTile.row][emptyTile.col] = tiles[row][col];
    tiles[row][col] = null;
    emptyTile = { row, col };
    moveCount++;
    updateGameInfo();
    renderGrid();
}

function shuffle() {
    winMessage.style.display = 'none';
    isGameStarted = false; // Prevent moves during shuffle

    // Start with a solved puzzle
    let count = 1;
    for (let i = 0; i < gridSize; i++) {
        tiles[i] = [];
        for (let j = 0; j < gridSize; j++) {
            if (i === 3 && j === 3) {
                tiles[i][j] = null;
            } else {
                tiles[i][j] = count++;
            }
        }
    }
    emptyTile = { row: 3, col: 3 };

    // Make a large number of random moves
    let shuffleMoves = 400;
    let lastMove = null;

    for (let i = 0; i < shuffleMoves; i++) {
        const neighbors = [];
        // up
        if (emptyTile.row > 0 && lastMove !== 'down') neighbors.push({ row: emptyTile.row - 1, col: emptyTile.col, dir: 'up' });
        // down
        if (emptyTile.row < gridSize - 1 && lastMove !== 'up') neighbors.push({ row: emptyTile.row + 1, col: emptyTile.col, dir: 'down' });
        // left
        if (emptyTile.col > 0 && lastMove !== 'right') neighbors.push({ row: emptyTile.row, col: emptyTile.col - 1, dir: 'left' });
        // right
        if (emptyTile.col < gridSize - 1 && lastMove !== 'left') neighbors.push({ row: emptyTile.row, col: emptyTile.col + 1, dir: 'right' });

        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        tiles[emptyTile.row][emptyTile.col] = tiles[randomNeighbor.row][randomNeighbor.col];
        tiles[randomNeighbor.row][randomNeighbor.col] = null;
        emptyTile = { row: randomNeighbor.row, col: randomNeighbor.col };
        lastMove = randomNeighbor.dir;
    }
    
    moveCount = 0;
    startTimer();
    isGameStarted = true;
    updateGameInfo();
    renderGrid();
}

function checkWin() {
    let count = 1;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (i === 3 && j === 3) {
                if (tiles[i][j] !== null) return;
            } else {
                if (tiles[i][j] !== count++) return;
            }
        }
    }
    stopTimer();
    isGameStarted = false;
    winMessage.textContent = `Game won in ${moveCount} moves!`;
    winMessage.style.display = 'block';
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        updateGameInfo();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateGameInfo() {
    movesSpan.textContent = moveCount;
    timerSpan.textContent = `${timer}s`;
}

function initGame() {
    shuffle();
}


shuffleButton.addEventListener('click', shuffle);

initGame();
