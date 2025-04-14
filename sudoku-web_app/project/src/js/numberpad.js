export function initializeNumberPad(gameState) {
    const numbersContainer = document.querySelector('.numbers');
    const clearButton = document.querySelector('.clear-btn');

    // Create number buttons
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('button');
        button.className = 'number-btn';
        button.textContent = i;
        button.addEventListener('click', () => {
            gameState.setNumber(i);
        });
        numbersContainer.appendChild(button);
    }

    // Clear button functionality
    clearButton.addEventListener('click', () => {
        gameState.setNumber(0);
    });
}