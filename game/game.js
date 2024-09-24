import { controlSettings, canvasSettings, playerSettings, gameSettings, entitySettings } from './utils/settings.js';
import Player from './entities/player.js';
import levelData from './levels/level-data.js';
import { clearContainer } from './utils/canvas.js';

// Main game logic
// - Initialize the game board (labyrinth)
// - Handle player input (movement, interactions)
// - Update game state (player position, lives, score)
// - Check for collisions (with obstacles, powerups, explosives, guards)
// - Handle level completion (transition to next level or game over)
// - Render the game board and entities (player, obstacles, powerups, guards)

export class Game {
    constructor(containerId, canvas, context, assets) {
        this.container = document.getElementById(containerId);
        this.canvas = canvas;
        this.context = context;
        this.player = null;
        this.board = [];
        this.entities = [];
        this.lives = playerSettings.initialLives;
        this.score = 0;
        this.currentLevel = gameSettings.initialLevel;
        this.isGameOver = false;
        this.started = false;
        this.assets = assets;
    }

    initializeBoard() {
        const level = levelData.getLevel(this.currentLevel);
        if (level) {
            this.board = level.layout;
        }
    }

    initializePlayer() {
        const level = levelData.getLevel(this.currentLevel);
        if (level) {
            for (let y = 0; y < level.layout.length; y++) {
                for (let x = 0; x < level.layout[y].length; x++) {
                    if (level.layout[y][x] === 'P') {
                        this.player = new Player(x * canvasSettings.cellWidth, y * canvasSettings.cellHeight, this.assets.playerAssets);
                        this.setupInput();
                        return;
                    }
                }
            }
        }
    }

    setupInput() {
        let actionTimeout;

        const debounceAction = (callback, delay) => {
            return () => {
                clearTimeout(actionTimeout);
                actionTimeout = setTimeout(() => {
                    this.player.action = 'idle';
                }, delay);
                callback();
            };
        };

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case controlSettings.up:
                    debounceAction(() => this.player.moveUp(), 1000)();
                    break;
                case controlSettings.down:
                    debounceAction(() => this.player.moveDown(), 1000)();
                    break;
                case controlSettings.left:
                    debounceAction(() => this.player.moveLeft(), 1000)();
                    break;
                case controlSettings.right:
                    debounceAction(() => this.player.moveRight(), 1000)();
                    break;
                case controlSettings.jump:
                    debounceAction(() => this.player.jump(), 1000)();
                    break;
                case controlSettings.attack:
                    debounceAction(() => this.player.attack(), 1000)();
                    break;
            }
        });
    }

    initializeEntities() {
        // Initialize other entities (obstacles, powerups, explosives, guards)
        // Placeholder: Replace with actual entities initialization logic
        return [];
    }

    handleInput(input) {
        // Handle player input (movement, interactions)
        // Placeholder: Replace with actual input handling logic
        if (input === 'up') this.player.position.y -= playerSettings.speed;
        if (input === 'down') this.player.position.y += playerSettings.speed;
        if (input === 'left') this.player.position.x -= playerSettings.speed;
        if (input === 'right') this.player.position.x += playerSettings.speed;
    }

    updateGameState() {
        // Update game state (player position, lives, score)
        this.player.update();
        this.checkCollisions();
        this.checkLevelCompletion();
    }

    checkCollisions() {
        // Check for collisions (with obstacles, powerups, explosives, guards)
        // Placeholder: Replace with actual collision detection logic
        this.entities.forEach(entity => {
            if (this.player.position.x === entity.position.x && this.player.position.y === entity.position.y) {
                // Handle collision
            }
        });
    }

    checkLevelCompletion() {
        // Handle level completion (transition to next level or game over)
        if (this.isLevelComplete()) {
            this.currentLevel += 1;
            this.board = this.initializeBoard();
            this.entities = this.initializeEntities();
        }
    }

    isLevelComplete() {
        // Placeholder: Replace with actual level completion check
        return false;
    }

    render() {
        // Render the game board and entities (player, obstacles, powerups, guards)
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the board
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] === '#') {
                    this.context.fillStyle = 'black';
                    this.context.fillRect(x * canvasSettings.cellWidth, y * canvasSettings.cellHeight, canvasSettings.cellWidth, canvasSettings.cellHeight); // Assuming each cell is 50x50 pixels
                }
                else if (this.board[y][x] === 'O') {
                    this.context.fillStyle = entitySettings.obstacleColor;
                    this.context.fillRect(x * canvasSettings.cellWidth, y * canvasSettings.cellHeight, canvasSettings.cellWidth, canvasSettings.cellHeight); // Assuming each cell is 50x50 pixels
                }
                else if (this.board[y][x] === 'E') {
                    this.context.fillStyle = entitySettings.explosiveColor;
                    this.context.fillRect(x * canvasSettings.cellWidth, y * canvasSettings.cellHeight, canvasSettings.cellWidth, canvasSettings.cellHeight); // Assuming each cell is 50x50 pixels
                }
                else if (this.board[y][x] === 'G') {
                    this.context.fillStyle = entitySettings.guardColor;
                    this.context.fillRect(x * canvasSettings.cellWidth, y * canvasSettings.cellHeight, canvasSettings.cellWidth, canvasSettings.cellHeight); // Assuming each cell is 50x50 pixels
                }
            }
        }

        // Draw the player
        this.player.draw(this.context);

        // ... draw other game elements ...
    }

    gameLoop() {
        // Main game loop
        if (this.isGameOver) return;
        this.updateGameState();
        this.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start() {
        this.started = true;
        clearContainer(this.container);
        this.container.appendChild(this.canvas);
        this.initializeBoard();
        this.initializePlayer();
        this.entities = this.initializeEntities();
        this.gameLoop();
    }
}