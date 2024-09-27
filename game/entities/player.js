import Entity from './entity';
import { canvasSettings } from "../utils/settings";

class Player extends Entity {
  #health;
  #speed;
  #blockedDirections;

  constructor(x, y, assets) {
    super(x, y, 'player', assets);
    this.#health = 100;
    this.#speed = 5;
    this.explosives = [];
    this.keys = [];
    this.powerups = [];
    this.#blockedDirections = {
      left: false,
      right: false,
      up: false,
      down: false
    };

    this.currentFrame = 0;
    this.frameCount = 0;
    this.movement = "down";
    this.action = "idle";
  }

  selectSprites(assets) {
    return {
      movement: assets.playerMovement,
      actions: assets.playerActions
    };
  }

  getPickupRange() {
    return {
      x: this._position.x,
      y: this._position.y,
      width: this._width,
      height: this._height,
    };
  }

  getHitBox() {
    return {
      x: this._position.x + this._width * 0.25,
      y: this._position.y + this._height * 0.25,
      width: this._width * 0.5,
      height: this._height * 0.5,
    };
  }

  collide(entity) {
    if (this.action !== "idle") {
      console.log("Colliding", this.action, entity.getPosition());
      this.action = "idle";
      
      // Determine which direction is blocked
      const entityPos = entity.getPosition();
      const playerPos = this.getPosition();
      
      if (entityPos.x < playerPos.x) {
        this.#blockedDirections.left = true;
      } else if (entityPos.x > playerPos.x) {
        this.#blockedDirections.right = true;
      }
      
      if (entityPos.y < playerPos.y) {
        this.#blockedDirections.up = true;
      } else if (entityPos.y > playerPos.y) {
        this.#blockedDirections.down = true;
      }
      console.log("blocked directions", this.#blockedDirections);
    }
  }

  canMove(direction) {
    return !this.#blockedDirections[direction];
  }

  moveLeft() {
    if (this.canMove('left')) {
      this._position.x -= this.#speed;
      this.action = "walk";
      this.movement = "left";
      this.#blockedDirections.right = false;
    }
  }

  moveRight() {
    if (this.canMove('right')) {
      this._position.x += this.#speed;
      this.action = "walk";
      this.movement = "right";
      this.#blockedDirections.left = false;
    }
  }

  moveUp() {
    if (this.canMove('up')) {
      this._position.y -= this.#speed;
      this.action = "walk";
      this.movement = "up";
      this.#blockedDirections.down = false;
    }
  }

  moveDown() {
    if (this.canMove('down')) {
      this._position.y += this.#speed;
      this.action = "walk";
      this.movement = "down";
      this.#blockedDirections.up = false;
    }
  }

  attack() {
    this.action = "attack";
    // Implement attack logic here
    console.log("Attacking");
  }

  pick() {
    this.action = "pick";
    // Implement pick logic here
    console.log("Picking");
    // Determine which object we are trying to pick based on player's position and direction
    const pickRange = 32; // Assuming a pick range of 32 pixels (half a cell)
    let pickPosition = { x: this._position.x, y: this._position.y };

    // Adjust pick position based on player's movement direction
    switch (this.movement) {
      case "left":
        pickPosition.x -= pickRange;
        break;
      case "right":
        pickPosition.x += pickRange;
        break;
      case "up":
        pickPosition.y -= pickRange;
        break;
      case "down":
        pickPosition.y += pickRange;
        break;
    }

    // Check for pickable objects at the determined position
    // This part would typically interact with the game's entity management system
    // For now, we'll just log the position where we're trying to pick
    console.log(
      `Attempting to pick at position: (${pickPosition.x}, ${pickPosition.y})`
    );

    // TODO: Implement actual object detection and picking logic
    // This would involve checking for collisions with pickable entities
    // and handling the pickup if a valid object is found
  }

  axe() {
    this.action = "axe";
    // Implement axe logic here
    console.log("Axe");
  }

  potion() {
    this.action = "potion";
    // Implement potion logic here
    console.log("Potion");
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
    // Don't reset blocked directions here
    this.frameCount++;
    if (this.frameCount >= 10) {
      // Adjust frame rate as needed
      let frames_per_action = 6;
      if (
        this.action === "walk" ||
        this.action === "idle" ||
        this.action === "jump"
      ) {
        frames_per_action = 6;
      } else if (this.action === "attack" || this.action === "duck") {
        frames_per_action = 4;
      } else if (
        this.action === "pick" ||
        this.action === "axe" ||
        this.action === "potion"
      ) {
        frames_per_action = 4;
      }
      this.currentFrame = (this.currentFrame + 1) % frames_per_action;
      this.frameCount = 0;
    }
  }

  // Add a new method to check for collisions before moving
  checkCollision(direction) {
    const nextPosition = { ...this._position };
    switch (direction) {
      case 'left':
        nextPosition.x -= this.#speed;
        break;
      case 'right':
        nextPosition.x += this.#speed;
        break;
      case 'up':
        nextPosition.y -= this.#speed;
        break;
      case 'down':
        nextPosition.y += this.#speed;
        break;
    }
    return nextPosition;
  }

  draw(ctx) {
    let spriteHeight = 32;
    let spriteWidth = 32;
    let spriteX = 0;
    let spriteY = 0;
    let spriteSheet = this._sprites.movement;
    // mapping the sprite sheet to the actions
    switch (this.action) {
      case "walk":
        switch (this.movement) {
          case "left":
            spriteY = 4 * spriteHeight;
            break;
          case "right":
            spriteY = 4 * spriteHeight;
            break;
          case "up":
            spriteY = 2 * spriteHeight;
            break;
          case "down":
            spriteY = 0 * spriteHeight;
            break;
        }
        break;
      case "crawl":
        switch (this.movement) {
          case "down":
            spriteY = 0 * spriteHeight;
            break;
          case "left":
            spriteY = 9 * spriteHeight;
            break;
          case "right":
            spriteY = 9 * spriteHeight;
            break;
          case "up":
            spriteY = 0 * spriteHeight;
            break;
        }
        break;
      case "attack":
        switch (this.movement) {
          case "down":
            spriteY = 6 * spriteHeight;
            break;
          case "left":
            spriteY = 7 * spriteHeight;
            break;
          case "right":
            spriteY = 7 * spriteHeight;
            break;
          case "up":
            spriteY = 8 * spriteHeight;
            break;
        }
        break;
      case "pick":
        spriteHeight = 48;
        spriteWidth = 48;
        spriteSheet = this._sprites.actions;
        switch (this.movement) {
          case "down":
            spriteY = 1 * spriteHeight;
            break;
          case "left":
            spriteY = 0 * spriteHeight;
            break;
          case "right":
            spriteY = 0 * spriteHeight;
            break;
          case "up":
            spriteY = 2 * spriteHeight;
            break;
        }
        break;
      case "axe":
        spriteHeight = 48;
        spriteWidth = 48;
        spriteSheet = this._sprites.actions;
        spriteX = 3 * spriteWidth;
        spriteY = 10 * spriteHeight;
        break;
      case "potion":
        spriteHeight = 48;
        spriteWidth = 48;
        spriteSheet = this._sprites.actions;
        // spriteY = 11 * spriteHeight;
        switch (this.movement) {
            case "down":
              spriteY = 9 * spriteHeight;
              break;
            case "left":
              spriteY = 9 * spriteHeight;
              break;
            case "right":
              spriteY = 9 * spriteHeight;
              break;
            case "up":
              spriteY = 10 * spriteHeight;
              break;
          }
          break;
        break;
      case "idle":
      default:
        switch (this.movement) {
          case "down":
            spriteY = 0 * spriteHeight;
            break;
          case "left":
            spriteY = 1 * spriteHeight;
            break;
          case "right":
            spriteY = 1 * spriteHeight;
            break;
          case "up":
            spriteY = 2 * spriteHeight;
            break;
        }
        break;
    }

    console.log("drawing player", this.action, spriteX, spriteY);

    spriteX = this.currentFrame * spriteWidth;

    ctx.save();
    if (this.movement === "left") {
      ctx.scale(-1, 1);
      ctx.drawImage(
        spriteSheet,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight,
        -this._position.x - this._width,
        this._position.y,
        canvasSettings.cellWidth,
        canvasSettings.cellHeight
      );
    } else {
      ctx.drawImage(
        spriteSheet,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight,
        this._position.x,
        this._position.y,
        canvasSettings.cellWidth,
        canvasSettings.cellHeight
      );
    }
    ctx.restore();
    this.drawBoundingBox(ctx);
  }

  drawBoundingBox(ctx) {
    // Hitbox
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this._position.x + this._width * 0.25,
      this._position.y + this._height * 0.25,
      this._width * 0.5,
      this._height * 0.5
    );
    ctx.restore();
    ctx.save();

    // Pickup range
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this._position.x,
      this._position.y,
      this._width,
      this._height
    );
    ctx.restore();
  }
}

export default Player;
