export function initializeBoard(gameState) {
    const board = document.getElementById('board');
    
    function createBoard() {
        board.innerHTML = '';
        gameState.board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                
                if (gameState.initialBoard[rowIndex][colIndex] !== 0) {
                    cellElement.classList.add('initial');
                }
                
                if (cell !== 0) {
                    cellElement.textContent = cell;
                }
                
                cellElement.addEventListener('click', () => {
                    gameState.selectCell(rowIndex, colIndex);
                });
                
                board.appendChild(cellElement);
            });
        });
    }

    function updateBoard() {
        const cells = board.getElementsByClassName('cell');
        Array.from(cells).forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.textContent = gameState.board[row][col] || '';
            
            cell.classList.remove('selected');
            if (gameState.selectedCell &&
                gameState.selectedCell.row === row &&
                gameState.selectedCell.col === col) {
                cell.classList.add('selected');
            }
        });
    }

    gameState.addEventListener('boardUpdate', updateBoard);
    gameState.addEventListener('cellSelect', updateBoard);
    gameState.addEventListener('gameStart', createBoard);
}