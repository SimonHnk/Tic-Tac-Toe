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