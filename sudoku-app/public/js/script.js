document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('sudoku-board');
    const timer = document.getElementById('timer');
    let interval;
  
    function generateGrid(puzzle) {
      board.innerHTML = '';
      puzzle.forEach((value, index) => {
        const cell = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.value = value;
        input.disabled = value !== ''; // Disable pre-filled cells
        input.addEventListener('input', validateInput);
        cell.appendChild(input);
        board.appendChild(cell);
      });
    }
  
    function startTimer() {
      clearInterval(interval);
      let seconds = 0;
      interval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timer.textContent = `Time: ${mins}:${secs}`;
      }, 1000);
    }
  
    function validateInput(event) {
      const value = event.target.value;
      if (value && !/^[1-9]$/.test(value)) {
        event.target.value = '';
      }
    }
  
    function getSudokuValues() {
      const cells = document.querySelectorAll('#sudoku-board input');
      return Array.from(cells).map(cell => cell.value || '0');
    }
  
    document.getElementById('generate-btn').addEventListener('click', function() {
      startTimer();
      const difficulty = document.getElementById('difficulty').value;
      fetch(`/sudoku/generate?difficulty=${difficulty}`)
        .then(response => response.json())
        .then(data => {
          generateGrid(data.board);
        })
        .catch(error => console.error('Error generating Sudoku:', error));
    });
  
    document.getElementById('solve-btn').addEventListener('click', function() {
      const sudoku = getSudokuValues();
      fetch('/sudoku/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sudoku })
      })
      .then(response => response.json())
      .then(data => {
        if (data.solution) {
          generateGrid(data.solution);
        }
      })
      .catch(error => console.error('Error solving Sudoku:', error));
    });
  
    document.getElementById('hint-btn').addEventListener('click', function() {
      const sudoku = getSudokuValues();
      fetch('/sudoku/hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sudoku })
      })
      .then(response => response.json())
      .then(data => {
        if (data.hint) {
          const cells = document.querySelectorAll('#sudoku-board input');
          cells[data.hint.index].value = data.hint.value;
        }
      })
      .catch(error => console.error('Error fetching hint:', error));
    });
  
    document.getElementById('reset-btn').addEventListener('click', function() {
      generateGrid(Array(81).fill(''));
      clearInterval(interval);
      timer.textContent = 'Time: 00:00';
    });
  
    document.getElementById('check-btn').addEventListener('click', function() {
      const sudoku = getSudokuValues();
      fetch('/sudoku/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sudoku })
      })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          alert('Sudoku is valid!');
        } else {
          alert('Sudoku is invalid!');
        }
      })
      .catch(error => console.error('Error checking Sudoku:', error));
    });
  });
  