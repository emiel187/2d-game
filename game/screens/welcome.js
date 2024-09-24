import { theme, applyContainerStyles, styleButton } from '../utils/theme.js';

// Welcome screen logic
// - Display game title
// - Provide buttons to start the game, view high scores, and adjust sound settings
// - Style: background color, text color, font size, button styles
// - Include sound control (mute/unmute button)

export function showWelcomeScreen(onStartGame, onContinueGame, onViewHighScores, onExit) {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear previous content

    const welcomeScreen = document.createElement('div');
    welcomeScreen.id = 'welcome-screen';

    const title = document.createElement('h1');
    title.textContent = 'Welcome to the Game!';
    welcomeScreen.appendChild(title);

    if (onContinueGame) {
        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.onclick = onContinueGame;
        welcomeScreen.appendChild(continueButton);
        styleButton(continueButton, theme.colors.secondary);
    }

    const startButton = document.createElement('button');
    startButton.textContent = 'New Game';
    startButton.onclick = onStartGame;
    welcomeScreen.appendChild(startButton);

    const highScoresButton = document.createElement('button');
    highScoresButton.textContent = 'High Scores';
    highScoresButton.onclick = onViewHighScores;
    welcomeScreen.appendChild(highScoresButton);

    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.onclick = onExit;
    welcomeScreen.appendChild(exitButton);

    container.appendChild(welcomeScreen);

    // Apply styles
    applyContainerStyles(container);
    title.style.fontSize = theme.fontSize.title;
    title.style.marginBottom = '20px';

    styleButton(startButton);
    styleButton(highScoresButton);
    styleButton(exitButton);
}