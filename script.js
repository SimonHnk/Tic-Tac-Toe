let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];


let currentPlayer = 'circle';


function init() {
    render();
}


function render() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let cellContent = '';
            if (fields[index] === 'circle') {
                cellContent = generateAnimatedCircleHTML();
            } else if (fields[index] === 'cross') {
                cellContent = generateAnimatedCrossHTML();
            }
            tableHTML += `<td onclick="handleClick(this, ${index})">` + cellContent + '</td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    content.innerHTML = tableHTML;
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircleHTML() : generateAnimatedCrossHTML();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        checkGameOver();
    }
}


function generateAnimatedCircleHTML() {
    const circleHTML = `
            <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <circle id="animatedCircle" cx="35" cy="35" r="30" fill="transparent" stroke="#00B0EF" stroke-width="5" stroke-dasharray="188.5" stroke-dashoffset="188.5">
                    <animate attributeName="stroke-dashoffset" dur="450ms" values="188.5;0" keyTimes="0;1" fill="freeze" />
                </circle>
            </svg>
        `;

    return circleHTML;
}


function generateAnimatedCrossHTML() {
    const crossHTML = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line id="animatedCross1" x1="10" y1="10" x2="60" y2="10" stroke="#FFC000" stroke-width="5">
                <animate attributeName="y2" values="10;60" dur="0.45s" begin="0s" fill="freeze" />
            </line>
            <line id="animatedCross2" x1="10" y1="60" x2="60" y2="10" stroke="#FFC000" stroke-width="5">
                <animate attributeName="y2" values="60;10" dur="0.45s" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;

    return crossHTML;
}


function checkGameOver() {
    if (checkWinningCombination(0, 1, 2) || checkWinningCombination(3, 4, 5) || checkWinningCombination(6, 7, 8) ||
        checkWinningCombination(0, 3, 6) || checkWinningCombination(1, 4, 7) || checkWinningCombination(2, 5, 8) ||
        checkWinningCombination(0, 4, 8) || checkWinningCombination(2, 4, 6)) {
        drawWinningLine(getWinningCombination());
    } else if (fields.every(cell => cell !== null)) {
        document.getElementById('result-draw').classList.remove('hide');
    }
}


function checkWinningCombination(index1, index2, index3) {
    return fields[index1] !== null && fields[index1] === fields[index2] && fields[index2] === fields[index3];
}


function getWinningCombination() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonale Kombinationen
    ];

    for (const combination of winningCombinations) {
        const [index1, index2, index3] = combination;
        if (checkWinningCombination(index1, index2, index3)) {
            return combination;
        }
    }

    return [];
}


function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;
    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
    const contentRect = document.getElementById('content').getBoundingClientRect();
    const lineLength = Math.sqrt(Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2));
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
    showWinner();
}


function showWinner() {
    let container = document.getElementById('result');
    let playerA = container.innerHTML = `Kreis hat gewonnen!`;
    let playerB = container.innerHTML = `Kreuz hat gewonnen!`;

    currentPlayer === 'cicle' ? playerB : playerA;
}


function resetGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'circle';
    document.getElementById('result-draw').classList.add('hide');
    document.getElementById('result').innerHTML = '';
    render();
}