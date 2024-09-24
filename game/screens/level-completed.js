import { theme, applyContainerStyles, styleButton } from '../utils/theme.js';

export function showLevelCompletedScreen(currentScore, onNextLevel, onMainMenu) {
    const container = document.getElementById('game-container');
    container.innerHTML = '';

    const levelCompletedScreen = document.createElement('div');
    levelCompletedScreen.id = 'level-completed-screen';

    const title = document.createElement('h1');
    title.textContent = 'Level Completed!';
    levelCompletedScreen.appendChild(title);

    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = `Current Score: ${currentScore}`;
    levelCompletedScreen.appendChild(scoreDisplay);

    const nextLevelButton = document.createElement('button');
    nextLevelButton.textContent = 'Next Level';
    nextLevelButton.onclick = onNextLevel;
    levelCompletedScreen.appendChild(nextLevelButton);

    const mainMenuButton = document.createElement('button');
    mainMenuButton.textContent = 'Main Menu';
    mainMenuButton.onclick = onMainMenu;
    levelCompletedScreen.appendChild(mainMenuButton);

    container.appendChild(levelCompletedScreen);

    // Apply styles
    applyContainerStyles(container);
    title.style.fontSize = theme.fontSize.title;
    title.style.marginBottom = '20px';

    scoreDisplay.style.fontSize = theme.fontSize.subtitle;
    scoreDisplay.style.marginBottom = '20px';

    styleButton(nextLevelButton, theme.colors.accent);
    styleButton(mainMenuButton, theme.colors.secondary);
}