const allNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(allNumbers);

const symbols = [
    allNumbers.slice(0, 3),
    allNumbers.slice(3, 6),
    allNumbers.slice(6, 9)
];

const grid = document.getElementById('grid').querySelector('tbody');
const continueButton = document.querySelector('.progression-button');

continueButton.disabled = true;
continueButton.style.opacity = 0.5;

function drawGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            cell.textContent = symbols[i][j];
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    checkSolution();
}

function shiftRow(rowIndex, direction) {
    if (direction === 'left') {
        const first = symbols[rowIndex].shift();
        symbols[rowIndex].push(first);
    } else if (direction === 'right') {
        const last = symbols[rowIndex].pop();
        symbols[rowIndex].unshift(last);
    }
    drawGrid();
}

function shiftColumn(colIndex, direction) {
    if (direction === 'up') {
        const first = symbols[0][colIndex];
        for (let i = 0; i < 2; i++) {
            symbols[i][colIndex] = symbols[i + 1][colIndex];
        }
        symbols[2][colIndex] = first;
    } else if (direction === 'down') {
        const last = symbols[2][colIndex];
        for (let i = 2; i > 0; i--) {
            symbols[i][colIndex] = symbols[i - 1][colIndex];
        }
        symbols[0][colIndex] = last;
    }
    drawGrid();
}

function checkSolution() {
    const col1 = [symbols[0][0], symbols[1][0], symbols[2][0]];
    const col2 = [symbols[0][1], symbols[1][1], symbols[2][1]];
    const col3 = [symbols[0][2], symbols[1][2], symbols[2][2]];

    const isSolved =
        col1.join('') === '147' &&
        col2.join('') === '258' &&
        col3.join('') === '369';

    continueButton.disabled = !isSolved;
    continueButton.style.opacity = isSolved ? 1 : 0.5;
}

drawGrid();