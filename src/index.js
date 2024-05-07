let size = 10; 
let bombFrequency = 0.2; 
let tileSize = 50;

const board = document.querySelectorAll('.board')[0];
let tiles;
let boardSize;

const restartBtn = document.querySelectorAll('.minesweeper-btn')[0];
const endscreen = document.querySelectorAll('.endscreen')[0]

let bombs = [];
let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
let endscreenContent = {
    win: 'ура пабеда', 
    loose: 'ты лох'
};

let gameOver = false;

const clear = () => {
    gameOver = false;
    bombs = [];
    numbers = [];
    endscreen.innerHTML = '';
    endscreen.classList.remove('show');
    tiles.forEach(tile => {
        tile.remove();
    });
    setup();
}

const setup = () => {
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        board.appendChild(tile);
    }
    tiles = document.querySelectorAll('.tile');
    boardSize = Math.sqrt(tiles.length);
    board.style.width = boardSize * tileSize + 'px';

    let x = 0;
    let y = 0;
    tiles.forEach((tile, i) => {
        tile.setAttribute('data-tile', `${x},${y}`);
        let random_boolean = Math.random() < bombFrequency;
        if (random_boolean) {
            bombs.push(`${x},${y}`);
            if (x > 0) numbers.push(`${x-1},${y}`);
            if (x < boardSize - 1) numbers.push(`${x+1},${y}`);
            if (y > 0) numbers.push(`${x},${y-1}`);
            if (y < boardSize - 1) numbers.push(`${x},${y+1}`);
            if (x > 0 && y > 0) numbers.push(`${x-1},${y-1}`);
            if (x < boardSize - 1 && y < boardSize - 1) numbers.push(`${x+1},${y+1}`);
            if (y > 0 && x < boardSize - 1) numbers.push(`${x+1},${y-1}`);
            if (x > 0 && y < boardSize - 1) numbers.push(`${x-1},${y+1}`);
        }
        x++;
        if (x >= boardSize) {
            x = 0;
            y++;
        }
        tile.oncontextmenu = function(e) {
            e.preventDefault();
            flag(tile);
        }
        tile.addEventListener('click', function(e) {
            clickTile(tile);
        });
    });
    numbers.forEach(num => {
        let coords = num.split(',');
        let tile = document.querySelectorAll(`[data-tile="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
        let dataNum = parseInt(tile.getAttribute('data-num'));
        if (!dataNum) dataNum = 0;
        tile.setAttribute('data-num', dataNum + 1);
    });
}