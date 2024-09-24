// Splash screen
// - Display game logo or animation
// - Briefly show before transitioning to the welcome screen
// - Style: background color, logo/animation size and position

export function showSplashScreen(onComplete) {
    const splashScreen = document.createElement('div');
    splashScreen.id = 'splash-screen';
    splashScreen.style.position = 'absolute';
    splashScreen.style.top = '0';
    splashScreen.style.left = '0';
    splashScreen.style.width = '100%';
    splashScreen.style.height = '100%';
    splashScreen.style.backgroundColor = '#000';
    splashScreen.style.display = 'flex';
    splashScreen.style.justifyContent = 'center';
    splashScreen.style.alignItems = 'center';
    splashScreen.style.color = '#fff';
    splashScreen.style.fontSize = '24px';
    splashScreen.innerText = 'Loading... 0%';

    document.body.appendChild(splashScreen);

    // Simulate loading time
    setTimeout(() => {
        onComplete();
        document.body.removeChild(splashScreen);
    }, 8000); // Adjust the time as needed
}

export function updateSplashScreenProgress(progress) {
    console.log('Updating splash screen progress:', progress);
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.innerText = `Loading... ${progress}%`;
    }
}