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