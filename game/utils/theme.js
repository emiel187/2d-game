// Theme configuration for the game
// This file contains styles and colors used across different screens

export const theme = {
    colors: {
        background: '#2c2c2c',
        text: '#f0f0f0',
        primary: '#ff69b4', // Funny pink color
        secondary: '#1565c0', // Darker formal blue
        accent: '#c62828', // Carmen red
    },
    fonts: {
        main: 'Arial, sans-serif',
    },
    fontSize: {
        title: '48px',
        subtitle: '24px',
        button: '24px',
    },
    spacing: {
        padding: '20px',
    },
    button: {
        padding: '20px 40px',
        borderRadius: '10px',
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
    button.style.border = 'none';
    button.style.borderRadius = theme.button.borderRadius;
}