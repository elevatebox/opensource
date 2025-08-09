let initialBoard = null;
let currentBoard = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newGame').addEventListener('click', startNewGame);
    document.getElementById('validate').addEventListener('click', validateBoard);
    startNewGame();
});

async function startNewGame() {
    const response = await fetch('/api/new-game');
    const data = await response.json();
    initialBoard = data.puzzle;
    currentBoard = JSON.parse(JSON.stringify(initialBoard));
    renderBoard();
    
    // Add animation class to container
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (initialBoard[i][j] === 0) {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.dataset.row = i;
                input.dataset.col = j;
                input.addEventListener('input', handleInput);
                input.addEventListener('focus', handleFocus);
                input.addEventListener('blur', handleBlur);
                cell.appendChild(input);
            } else {
                cell.classList.add('initial');
                cell.textContent = initialBoard[i][j];
            }
            
            // Add animation delay based on position
            const delay = (i * 9 + j) * 20;
            cell.style.opacity = '0';
            cell.style.transform = 'scale(0.9)';
            setTimeout(() => {
                cell.style.transition = 'all 0.3s ease';
                cell.style.opacity = '1';
                cell.style.transform = 'scale(1)';
            }, delay);
            
            board.appendChild(cell);
        }
    }
}

function handleInput(event) {
    const input = event.target;
    const value = parseInt(input.value) || 0;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    
    if (value >= 0 && value <= 9) {
        currentBoard[row][col] = value;
        input.style.color = value === 0 ? '#4a5568' : '#2b6cb0';
    } else {
        input.value = '';
        currentBoard[row][col] = 0;
    }
}

function handleFocus(event) {
    const input = event.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    
    // Highlight same row and column
    highlightRelatedCells(row, col, true);
}

function handleBlur(event) {
    const input = event.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    
    // Remove highlights
    highlightRelatedCells(row, col, false);
}

function highlightRelatedCells(row, col, highlight) {
    const cells = document.querySelectorAll('.cell');
    const boxStartRow = Math.floor(row / 3) * 3;
    const boxStartCol = Math.floor(col / 3) * 3;
    
    cells.forEach((cell, index) => {
        const cellRow = Math.floor(index / 9);
        const cellCol = index % 9;
        
        // Check if cell is in same row, column, or 3x3 box
        if (cellRow === row || cellCol === col || 
            (cellRow >= boxStartRow && cellRow < boxStartRow + 3 && 
             cellCol >= boxStartCol && cellCol < boxStartCol + 3)) {
            cell.style.backgroundColor = highlight ? '#f7fafc' : '';
        }
    });
}

async function validateBoard() {
    const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ board: currentBoard })
    });
    
    const data = await response.json();
    const messageElement = document.getElementById('message');
    
    // Remove existing message classes
    messageElement.className = 'message';
    
    // Add new message with animation
    messageElement.style.transform = 'translateY(-10px)';
    messageElement.style.opacity = '0';
    
    setTimeout(() => {
        if (data.isValid) {
            messageElement.textContent = '🎉 Congratulations! The solution is correct!';
            messageElement.classList.add('success');
        } else {
            messageElement.textContent = '❌ The solution is incorrect. Keep trying!';
            messageElement.classList.add('error');
        }
        
        messageElement.style.transition = 'all 0.3s ease';
        messageElement.style.transform = 'translateY(0)';
        messageElement.style.opacity = '1';
    }, 100);
}