export function initializeTimer(gameState) {
    const timerElement = document.querySelector('.timer');
    let seconds = 0;
    let interval;

    function updateTimer() {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        seconds = 0;
        updateTimer();
        clearInterval(interval);
        interval = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
    }

    gameState.addEventListener('gameStart', startTimer);
    gameState.addEventListener('gameComplete', stopTimer);
}