export function initializeControls(gameState) {
    const newGameBtn = document.getElementById('newGameBtn');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const messageElement = document.getElementById('message');

    newGameBtn.addEventListener('click', () => {
        gameState.startNewGame();
        messageElement.classList.add('hidden');
    });

    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.difficulty = btn.dataset.difficulty;
            gameState.startNewGame();
            messageElement.classList.add('hidden');
        });
    });

    gameState.addEventListener('gameComplete', () => {
        messageElement.classList.remove('hidden');
    });
}