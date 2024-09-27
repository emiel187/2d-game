// Theme configuration for the game
// This file contains styles and colors used across different screens

export const theme = {
    colors: {
        background: '#1a0d00', // Dark brown for dungeon feel
        text: '#d4af37', // Gold text for fantasy vibe
        primary: '#8B4513', // Saddle brown to complement the existing colors
        secondary: '#2e8b57', // Forest green for maze-like atmosphere
        accent: '#ff4500', // Fiery orange for danger
    },
    fonts: {
        main: '"Luminari", "Papyrus", fantasy', // Quirky fantasy fonts
        subtitle: '"Arial", sans-serif', // More readable font for subtitles
    },
    fontSize: {
        title: '52px',
        subtitle: '28px',
        button: '24px',
    },
    spacing: {
        padding: '25px',
    },
    button: {
        minWidth: '265px',
        padding: '15px 35px',
        borderRadius: '4px', // Sharp edges for a more labyrinthine feel
    },
};

// Helper function to apply common styles to a container
export function applyContainerStyles(container) {
    container.style.backgroundColor = theme.colors.background;
    container.style.color = theme.colors.text;
    container.style.fontFamily = theme.fonts.main;
    container.style.textAlign = 'center';
    container.style.padding = theme.spacing.padding;
}

// Helper function to style a button
export function styleButton(button, color = theme.colors.primary) {
    button.style.display = 'block';
    button.style.margin = '20px auto';
    button.style.padding = theme.button.padding;
    button.style.fontSize = theme.fontSize.button;
    button.style.cursor = 'pointer';
    button.style.backgroundColor = color;
    button.style.color = theme.colors.text;
    button.style.border = '2px solid ' + theme.colors.text;
    button.style.borderRadius = theme.button.borderRadius;
    button.style.textTransform = 'uppercase';
    button.style.letterSpacing = '2px';
    button.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
    button.style.transition = 'all 0.3s ease';
    button.style.minWidth = theme.button.minWidth;

    // Add hover effect
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
}