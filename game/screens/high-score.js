import { theme, applyContainerStyles, styleButton } from '../utils/theme.js';
import { timeAgo } from '../utils/date.js';

// High Score screen
// - Display list of high scores
// - Allow player to enter their name if they achieved a high score
// - Provide options to return to the welcome screen or start a new game
// - Style: background color, text color, font size, list styles, button styles

const highScores = [
    { name: 'Player1', score: 1000, timestamp: '2023-10-01 10:00' },
    { name: 'Player2', score: 900, timestamp: '2023-10-02 11:00' },
    { name: 'Player3', score: 800, timestamp: '2023-10-03 12:00' },
    { name: 'Player4', score: 700, timestamp: '2023-10-04 13:00' },
    { name: 'Player5', score: 600, timestamp: '2023-10-05 14:00' },
    { name: 'Player6', score: 500, timestamp: '2023-10-06 15:00' },
    { name: 'Player7', score: 400, timestamp: '2023-10-07 16:00' },
    { name: 'Player8', score: 300, timestamp: '2023-10-08 17:00' },
    { name: 'Player9', score: 200, timestamp: '2023-10-09 18:00' },
    { name: 'Player10', score: 100, timestamp: '2023-10-10 19:00' },
];

export function showHighScoreScreen(onBack) {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear previous content

    const highScoreScreen = document.createElement('div');
    highScoreScreen.id = 'high-score-screen';

    const title = document.createElement('h1');
    title.textContent = 'High Scores';
    highScoreScreen.appendChild(title);

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Score', 'Timestamp'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    highScores.forEach(score => {
        const row = document.createElement('tr');
        Object.values(score).forEach((text, index) => {
            const cell = document.createElement('td');
            if (index === 2) {
                cell.textContent = timeAgo(text);
            } else {
                cell.textContent = text;
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    highScoreScreen.appendChild(table);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = onBack;
    highScoreScreen.appendChild(backButton);

    container.appendChild(highScoreScreen);

    // Apply styles
    applyContainerStyles(container);
    title.style.fontSize = theme.fontSize.title;
    title.style.marginBottom = '20px';
    title.style.color = theme.colors.primary;

    table.style.margin = '20px auto';
    table.style.borderRadius = '10px';
    table.style.borderCollapse = 'collapse';
    table.style.width = '80%';
    table.style.backgroundColor = theme.colors.background;
    table.style.color = theme.colors.text;

    const trs = table.querySelectorAll('tr');
    trs.forEach((tr, index) => {
        if (index === 0) {
            tr.style.borderTopLeftRadius = '10px';
            tr.style.borderTopRightRadius = '10px';
        }
    });

    const ths = table.querySelectorAll('th');
    ths.forEach(th => {
        th.style.border = `1px solid ${theme.colors.primary}`;
        // th.style.borderRadius = `10px 10px 0 0`;
        th.style.padding = '12px';
        th.style.backgroundColor = theme.colors.secondary;
        th.style.color = theme.colors.text;
        th.style.fontSize = theme.fontSize.subtitle;
    });

    const tds = table.querySelectorAll('td');
    tds.forEach(td => {
        td.style.border = `1px solid ${theme.colors.secondary}`;
        td.style.padding = '10px';
        td.style.fontSize = theme.fontSize.button;
    });

    // Alternating row colors for better readability
    const rows = table.querySelectorAll('tr:not(:first-child)');
    rows.forEach((row, index) => {
        row.style.backgroundColor = index % 2 === 0 ? theme.colors.background : theme.colors.secondary + '33'; // 33 for 20% opacity
    });

    styleButton(backButton, theme.colors.primary);
}