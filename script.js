const puzzleContainer = document.getElementById('puzzle-container');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
let timer = 0;
let timerInterval;
let selectedPieces = []; // 用于存储选中的拼图块

function createPuzzle() {
    const pieces = [];
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
        piece.dataset.index = i;
        pieces.push(piece);
    }
    shuffle(pieces).forEach(piece => puzzleContainer.appendChild(piece));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `时间: ${timer} 秒`;
    }, 1000);
}

function swapPieces(piece1, piece2) {
    // 交换两个拼图块的位置
    const tempBackground = piece1.style.backgroundPosition;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece2.style.backgroundPosition = tempBackground;

    // 交换 data-index 属性
    const tempIndex = piece1.dataset.index;
    piece1.dataset.index = piece2.dataset.index;
    piece2.dataset.index = tempIndex;
}

puzzleContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('puzzle-piece')) {
        // 将点击的拼图块添加到选中列表
        selectedPieces.push(e.target);

        // 如果选中了两个拼图块，交换它们
        if (selectedPieces.length === 2) {
            swapPieces(selectedPieces[0], selectedPieces[1]);
            selectedPieces = []; // 清空选中列表
        }
    }
});

startButton.addEventListener('click', () => {
    puzzleContainer.innerHTML = '';
    createPuzzle();
    startTimer();
});