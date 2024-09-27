import {
  controlSettings,
  canvasSettings,
  playerSettings,
  gameSettings,
} from "./utils/settings.js";
import Player from "./entities/player.js";
import levelData from "./levels/level-data.js";
import { clearContainer } from "./utils/canvas.js";
import { isColliding } from "./utils/game.js";
import Wall from "./entities/wall.js";
import Explosive from "./entities/explosive.js";
import Guard from "./entities/guard.js";
import Obstacle from "./entities/obstacle.js";
import Powerup from "./entities/powerup.js";
import Exit from "./entities/exit.js";

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
    this.walls = [];
    this.exit = null;
    this.lives = playerSettings.initialLives;
    this.score = 0;
    this.currentLevel = gameSettings.initialLevel;
    this.isGameOver = false;
    this.started = false;
    this.assets = assets;
    this.explosives = [];
    this.guards = [];
    this.obstacles = [];
    this.powerups = [];
  }

  initializeBoard() {
    const level = levelData.getLevel(this.currentLevel);
    if (level) {
      this.walls = [];
      this.board = level.layout;
      for (let y = 0; y < level.layout.length; y++) {
        for (let x = 0; x < level.layout[y].length; x++) {
          if (level.layout[y][x] === "#") {
            this.walls.push(
              new Wall(
                x * canvasSettings.cellWidth,
                y * canvasSettings.cellHeight,
                "normal",
                this.assets.levelAssets
              )
            );
          }
          if (level.layout[y][x] === "X") {
            this.exit = new Exit(
              x * canvasSettings.cellWidth,
              y * canvasSettings.cellHeight,
              this.assets.levelAssets
            );
          }
        }
      }
    }
  }

  initializePlayer() {
    const level = levelData.getLevel(this.currentLevel);
    if (level) {
      for (let y = 0; y < level.layout.length; y++) {
        for (let x = 0; x < level.layout[y].length; x++) {
          if (level.layout[y][x] === "P") {
            this.player = new Player(
              x * canvasSettings.cellWidth,
              y * canvasSettings.cellHeight,
              this.assets.playerAssets
            );
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
          this.player.action = "idle";
        }, delay);
        callback();
      };
    };

    window.addEventListener("keydown", (event) => {
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
          debounceAction(() => this.player.attack(), 250)();
          break;
        case controlSettings.pick:
          debounceAction(() => this.player.pick(), 150)();
          break;
        case controlSettings.axe:
          debounceAction(() => this.player.axe(), 150)();
          break;
        case controlSettings.potion:
          debounceAction(() => this.player.potion(), 500)();
          break;
      }
    });
  }

  initializeEntities() {
    const level = levelData.getLevel(this.currentLevel);

    if (level) {
      this.explosives = [];
      this.guards = [];
      this.obstacles = [];
      this.powerups = [];

      for (let y = 0; y < level.layout.length; y++) {
        for (let x = 0; x < level.layout[y].length; x++) {
          const cell = level.layout[y][x];
          const position = {
            x: x * canvasSettings.cellWidth,
            y: y * canvasSettings.cellHeight,
          };

          switch (cell) {
            case "E":
              this.explosives.push(
                new Explosive(position.x, position.y, this.assets)
              );
              break;
            case "G":
              const randomOrc = Math.floor(Math.random() * 3) + 1;
              console.log(`orc${randomOrc}`);
              this.guards.push(new Guard(position.x, position.y, `orc${randomOrc}`, this.assets.guardAssets));
              break;
            case "O":
              this.obstacles.push(
                new Obstacle(position.x, position.y, "boulder", this.assets.levelAssets)
              );
              break;
            case "T":
              this.obstacles.push(
                new Obstacle(position.x, position.y, "tree", this.assets.levelAssets)
              );
              break;
            case "C":
              const randomPowerup = Math.floor(Math.random() * 2) + 1;
              this.powerups.push(
                new Powerup(position.x, position.y, randomPowerup == 1 ? "health" : "mana", this.assets.powerupsAssets)
              );
              break;
          }
        }
      }
    }
  }

  updateGameState() {
    this.checkCollisions(); // Move this before player update
    this.player.update();
    this.explosives.forEach((explosive) => explosive.update());
    this.guards.forEach((guard) => guard.update(this.player.getHitBox(), this.walls));
    this.obstacles.forEach((obstacle) => obstacle.update());
    this.powerups.forEach((powerup) => powerup.update());
    this.checkLevelCompletion();
  }

  checkCollisions() {
    const playerPosition = this.player.getHitBox();

    // Check collisions for each direction
    ['left', 'right', 'up', 'down'].forEach(direction => {
      const nextPosition = this.player.checkCollision(this.movement);
      const willCollide = this.walls.some(wall => 
        isColliding({
          ...playerPosition,
          x: nextPosition.x + playerPosition.width * 0.25,
          y: nextPosition.y + playerPosition.height * 0.25
        }, wall.getHitBox())
      );
      if (willCollide) {
        this.player.collide({ type: "wall", getPosition: () => nextPosition });
      }
    });

    this.walls.forEach((wall) => {
      if (isColliding(playerPosition, wall.getHitBox())) {
        console.log("colliding with wall");
        this.player.collide(wall);
      }
    });

    this.explosives.forEach((explosive, index) => {
      if (isColliding(playerPosition, explosive.getPosition())) {
        if (explosive.isActive()) {
          // Handle player damage
        } else if (!explosive.isHidden()) {
          this.player.collectExplosive(explosive);
          this.explosives.splice(index, 1);
        }
      }
    });

    this.guards.forEach((guard, index) => {
      if (isColliding(playerPosition, guard.getPosition())) {
        // Handle player-guard interaction
        this.player.collide(guard);
      }
    });

    this.obstacles.forEach((obstacle, index) => {
      if (isColliding(playerPosition, obstacle.getPosition())) {
        // Handle player-obstacle interaction
      }
    });

    this.powerups.forEach((powerup, index) => {
      if (isColliding(this.player.getPickupRange(), powerup.getPosition())) {
        const effect = powerup.collect();
        this.player.applyPowerup(effect);
        this.powerups.splice(index, 1);
      }
    });
  }

  checkLevelCompletion() {
    // Handle level completion (transition to next level or game over)
    if (this.isLevelComplete()) {
      this.currentLevel += 1;
      this.initializeBoard();
      this.initializePlayer();
      this.initializeEntities();
    }
  }

  isLevelComplete() {
    // Game ends when player reaches the exit
    return isColliding(this.player.getHitBox(), this.exit.getHitBox());
  }

  render() {
    // Render the game board and entities (player, obstacles, powerups, guards)
    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the grid
    this.drawGrid();

    // Draw the walls
    this.walls.forEach((wall) => wall.draw(this.context));

    // Draw the entities
    this.obstacles.forEach((obstacle) => obstacle.draw(this.context));
    this.powerups.forEach((powerup) => powerup.draw(this.context));
    this.guards.forEach((guard) => guard.draw(this.context));
    this.explosives.forEach((explosive) => explosive.draw(this.context));

    // Draw the exit
    if (this.exit) {
      this.exit.draw(this.context);
    }

    // Draw the player
    this.player.draw(this.context);

    
  }

  drawGrid() {
    // Create a gradient for the background
    const gradient = this.context.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
    );
    gradient.addColorStop(0, '#3E8948');  // Center color (lighter green)
    gradient.addColorStop(1, '#1A3B1F');  // Edge color (darker green)

    // Fill background with gradient
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set grid style
    this.context.strokeStyle = 'rgba(0, 255, 0, 0.1)';
    this.context.lineWidth = 1;

    // Draw grid lines
    this.context.beginPath();

    // Vertical lines
    for (let x = 0; x <= this.canvas.width; x += canvasSettings.cellWidth) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.height);
    }

    // Horizontal lines
    for (let y = 0; y <= this.canvas.height; y += canvasSettings.cellHeight) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
    }

    this.context.stroke();
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
    this.initializeEntities();
    this.gameLoop();
  }

  continue() {
    this.started = true;
    clearContainer(this.container);
    this.container.appendChild(this.canvas);
  }
}

export default Game;
