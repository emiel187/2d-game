// handle the assets
// Load player sprite sheets
// Load enemy sprite sheets
// Load powerup sprite sheets
// Load explosive sprite sheets
// Load guard sprite sheets
// Load obstacle images

function loadImage(src, onProgress) {
    return new Promise((resolve, reject) => {
        try {
            console.log('Loading image:', src);
            const img = new Image();
            img.src = src;
            img.onload = () => {
                console.log('Image loaded:', src);
                onProgress(src, img);
                resolve(img);
            };
            img.onerror = (error) => {
                console.error('Error loading image:', src, error);
                reject(new Error(`Failed to load image: ${src}`));
            };
        } catch (error) {
            console.error('Error loading image:', src, error);
            reject(new Error(`Unexpected error loading image: ${src}`));
        }
    });
}

export async function loadPlayerAssets(onProgress) {
    console.log('Loading player assets...');
    const playerMovement = await loadImage(require('../assets/images/player/Player.png'), onProgress);
    const playerActions = await loadImage(require('../assets/images/player/Player_Actions.png'), onProgress);

    return { playerMovement, playerActions };
}

export async function loadLevelAssets(onProgress) {
    console.log('Loading level assets...');
    // const levelBackground = await loadImage(require('../assets/images/level/Background.png'), onProgress);

    // return { levelBackground };
}