import { canvasSettings } from '../utils/settings';

class Player {
  constructor(x, y, assets) {
    this.x = x;
    this.y = y;
    this.width = canvasSettings.cellWidth;
    this.height = canvasSettings.cellHeight;
    this.speed = 5;
    this.jumpForce = 10;
    this.isJumping = false;
    this.health = 100;
    this.explosives = [];
    this.keys = [];
    this.powerups = [];
    
    this.spriteMovement = assets.playerMovement;
    this.spriteActions = assets.playerActions;
    
    this.currentFrame = 0;
    this.frameCount = 0;
    this.movement = 'down';
    this.action = 'idle'; // Possible actions: 'idle', 'walk', 'jump', 'attack'
  }

  moveLeft() {
    this.x -= this.speed;
    this.action = 'walk';
    this.movement = 'left';
  }

  moveRight() {
    this.x += this.speed;
    this.action = 'walk';
    this.movement = 'right';
  }

  moveUp() {
    this.y -= this.speed;
    this.action = 'walk';
    this.movement = 'up';
  }

  moveDown() {
    this.y += this.speed;
    this.action = 'walk';
    this.movement = 'down';
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.action = 'jump';
      // Implement jump logic here
      console.log('Jumping');
    }
  }

  attack() {
    this.action = 'attack';
    // Implement attack logic here
    console.log('Attacking');
  }

  collectExplosive(explosive) {
    this.explosives.push(explosive);
  }

  collectKey(key) {
    this.keys.push(key);
  }

  collectPowerup(powerup) {
    this.powerups.push(powerup);
    // Implement powerup effect here
    console.log(`Collected powerup: ${powerup}`);
  }

  update() {
    // Update player state, handle gravity, etc.
    this.frameCount++;
    if (this.frameCount >= 10) { // Adjust frame rate as needed
      this.currentFrame = (this.currentFrame + 1) % 4; // Assuming 4 frames per action
      this.frameCount = 0;
    }
  }

  draw(ctx) {
    const spriteHeight = 32;
    const spriteWidth = 32;
    let spriteX = 0;
    let spriteY = 0;
    let currentDirection = 'right';
    let flipHorizontally = false;

    switch (this.action) {
      case 'walk':
        switch (this.movement) {
          case 'left':
            spriteY = 4 * spriteHeight; // Adjust based on sprite sheet
            currentDirection = 'left';
            break;
          case 'right':
            spriteY = 4 * spriteHeight; // Adjust based on sprite sheet
            currentDirection = 'right';
            break;
          case 'up':
            spriteY = 2 * spriteHeight; // Adjust based on sprite sheet
            currentDirection = 'up';
            break;
          case 'down':
            spriteY = 0 * spriteHeight; // Adjust based on sprite sheet
            currentDirection = 'down';
            break;
        }
        break;
      case 'jump':
        spriteY = 3 * spriteHeight; // Adjust based on sprite sheet
        currentDirection = 'left';
        break;
      case 'attack':
        switch (this.movement) {
            case 'down':
                spriteY = 6 * spriteHeight; // Adjust based on sprite sheet
                currentDirection = 'down';
                break;
            case 'left':
                spriteY = 7 * spriteHeight; // Adjust based on sprite sheet
                currentDirection = 'left';
                break;
              case 'right':
                spriteY = 7 * spriteHeight; // Adjust based on sprite sheet
                currentDirection = 'right';
                break;
              case 'up':
                spriteY = 8 * spriteHeight; // Adjust based on sprite sheet
                currentDirection = 'up';
                break;
              
        }
        break;
      default:
        switch (this.movement) {
            case 'down':
              spriteY = 0 * spriteHeight; // Adjust based on sprite sheet
              currentDirection = 'down';
              break;
            case 'left':
              spriteY = 1 * spriteHeight; // Adjust based on sprite sheet
              currentDirection = 'left';
              break;
            case 'right':
              spriteY = 1 * spriteHeight; // Adjust based on sprite sheet
              currentDirection = 'right';
              break;
            case 'up':
              spriteY = 2 * spriteHeight; // Adjust based on sprite sheet
              currentDirection = 'up';
              break;
        }
        break;
    }

    if (this.movement === 'left') {
        flipHorizontally = true;
    }

    console.log("drawing player", this.action, spriteX, spriteY);

    spriteX = this.currentFrame * spriteWidth;

    ctx.save();
    if (flipHorizontally) {
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.spriteMovement,
        spriteX, spriteY, spriteWidth, spriteHeight,
        -this.x - this.width, this.y, canvasSettings.cellWidth, canvasSettings.cellHeight
      );
    } else {
      ctx.drawImage(
        this.spriteMovement,
        spriteX, spriteY, spriteWidth, spriteHeight,
        this.x, this.y, canvasSettings.cellWidth, canvasSettings.cellHeight
      );
    }
    ctx.restore();
  }
}

export default Player;