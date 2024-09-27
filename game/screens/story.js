import { theme, applyContainerStyles, styleButton } from '../utils/theme.js';

// Story screen
export function showStoryScreen(onBack) {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear previous content

    const storyScreen = document.createElement('div');
    storyScreen.id = 'story-screen';

    // Remove book and pages
    const textContainer = document.createElement('div');
    textContainer.id = 'text-container';
    textContainer.style.textAlign = 'center';
    storyScreen.appendChild(textContainer);

    const paragraphs = [
        "Meet Theo—a brilliant but clumsy game designer with a passion for crafting the most intricate fantasy campaigns.",
        "One fateful evening, while putting the finishing touches on his masterpiece labyrinth, Theo accidentally spills a can of energy drink onto his keyboard.",
        "Sparks fly, screens flash, and before he can say \"critical hit,\" he's zapped into the very world he created!",
        "Blinking in disbelief, Theo finds himself standing at the entrance of his own labyrinth, a sprawling maze filled with mind-bending puzzles, hidden traps, and mythical creatures.",
        "But he's not alone in there.",
        "His former friend-turned-rival, Max, a fellow gamer notorious for stealing ideas, has hacked into Theo's game to claim the labyrinth as his own.",
        "The power surge pulled Max into the game too, but with a devious advantage—he now controls the Minotaur, the maze's most formidable guardian.",
        "Max taunts Theo through ethereal echoes: \"Good luck finding your way out, Theo! This maze is mine now, and the Minotaur is eager to meet you!\"",
        "Determined to reclaim his creation and return to the real world, Theo must navigate through multiple levels of his labyrinth, solving his own riddles and overcoming challenges he designed to be unbeatable.",
        "Along the way, he'll encounter quirky NPCs, unexpected allies, and maybe even a friendly dragon with a knack for sarcasm.",
        "Can Theo outsmart Max, defeat the Minotaur, and escape the labyrinth?",
        "The twists and turns of his own imagination stand between him and freedom.",
        "Grab your wits, summon your courage, and step into the maze—an epic adventure awaits!"
    ];

    paragraphs.forEach((text, index) => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = text;
        paragraph.style.opacity = 0;
        paragraph.style.display = 'none';
        paragraph.style.transition = 'opacity 1s';
        paragraph.style.fontSize = '28px';
        textContainer.appendChild(paragraph);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.marginTop = '20px';

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.onclick = showNextParagraph;
    buttonContainer.appendChild(nextButton);

    const skipButton = document.createElement('button');
    skipButton.textContent = 'Skip';
    skipButton.onclick = onBack;
    buttonContainer.appendChild(skipButton);

    storyScreen.appendChild(buttonContainer);
    container.appendChild(storyScreen);

    // Apply styles
    applyContainerStyles(container);
    styleStoryScreen(storyScreen, textContainer);
    styleButton(nextButton, theme.colors.primary);
    styleButton(skipButton, theme.colors.primary);

    let currentParagraph = 0;
    function showNextParagraph() {
        if (currentParagraph < paragraphs.length) {
            if (currentParagraph > 0) {
                textContainer.children[currentParagraph - 1].style.opacity = 0;
                textContainer.children[currentParagraph - 1].style.display = 'none';
            }
            textContainer.children[currentParagraph].style.display = 'block';
            textContainer.children[currentParagraph].style.opacity = 1;
            currentParagraph++;
        }
    }

    // Automatically show paragraphs with a delay
    function autoShowParagraphs() {
        if (currentParagraph < paragraphs.length) {
            if (currentParagraph > 0) {
                textContainer.children[currentParagraph - 1].style.opacity = 0;
                textContainer.children[currentParagraph - 1].style.display = 'none';
            }
            textContainer.children[currentParagraph].style.display = 'block';
            textContainer.children[currentParagraph].style.opacity = 1;
            currentParagraph++;
            setTimeout(autoShowParagraphs, 5000); // Adjust delay as needed
        }
    }

    autoShowParagraphs();
}

function styleStoryScreen(storyScreen, textContainer) {
    storyScreen.style.position = 'relative';
    storyScreen.style.height = '100vh';

    textContainer.style.margin = '50px auto';
    textContainer.style.height = '200px';
    textContainer.style.width = '70%';
    textContainer.style.backgroundColor = theme.colors.primary;
    textContainer.style.color = theme.colors.text;
    textContainer.style.padding = '20px';
    textContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    textContainer.style.borderRadius = '10px';
}