import { canvasSettings } from "../utils/settings";

class Player {
    #position;
    #width;
    #height;
    #health;
    #speed;
    #sprite;
  constructor(x, y, assets) {

    this.#position = { x, y };
    this.#width = canvasSettings.cellWidth;
    this.#height = canvasSettings.cellHeight
    this.#speed = 5;
    this.#health = 100;
    this.explosives = [];
    this.keys = [];
    this.powerups = [];

    this.spriteMovement = assets.playerMovement;
    this.spriteActions = assets.playerActions;

    this.currentFrame = 0;
    this.frameCount = 0;
    this.movement = "down";
    this.action = "idle"; // Possible actions: 'idle', 'walk', 'jump', 'attack'
  }

  getPosition() {
    return { ...this.#position };
  }

  moveLeft() {
    this.#position.x -= this.#speed;
    this.action = "walk";
    this.movement = "left";
  }

  moveRight() {
    this.#position.x += this.#speed;
    this.action = "walk";
    this.movement = "right";
  }

  moveUp() {
    this.#position.y -= this.#speed;
    this.action = "walk";
    this.movement = "up";
  }

  moveDown() {
    this.#position.y += this.#speed;
    this.action = "walk";
    this.movement = "down";
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
    let pickPosition = { x: this.#position.x, y: this.#position.y };

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

  collide(entity) {
    if (this.action !== "idle") {
      console.log("Colliding", this.action, entity.position);
      this.action = "idle";

      // Calculate the center of the current tile
      const tileSize = 64; // Assuming a tile size of 32 pixels
      const centerX =
        Math.floor(this.#position.x / tileSize) * tileSize + tileSize / 2;
      const centerY =
        Math.floor(this.#position.y / tileSize) * tileSize + tileSize / 2;

      // Move the player to the center of the current tile
      this.#position.x = centerX - this.#width / 2;
      this.#position.y = centerY - this.#height / 2;

      // Temporarily disable movement
      const originalSpeed = this.#speed;
      this.#speed = 0;
      setTimeout(() => {
        this.#speed = originalSpeed;
      }, 500); // Adjust this value to control the duration of movement disable
    }
  }

  update() {
    // Update player state, handle gravity, etc.
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

  draw(ctx) {
    let spriteHeight = 32;
    let spriteWidth = 32;
    let spriteX = 0;
    let spriteY = 0;
    let spriteSheet = this.spriteMovement;
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
        spriteSheet = this.spriteActions;
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
      case "axe":
        spriteHeight = 48;
        spriteWidth = 48;
        spriteSheet = this.spriteActions;
        spriteY = 10 * spriteHeight;
        break;
      case "potion":
        spriteHeight = 48;
        spriteWidth = 48;
        spriteSheet = this.spriteActions;
        spriteY = 11 * spriteHeight;
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
        this.spriteMovement,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight,
        -this.#position.x - this.#width,
        this.#position.y,
        canvasSettings.cellWidth,
        canvasSettings.cellHeight
      );
    } else {
      ctx.drawImage(
        this.spriteMovement,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight,
        this.#position.x,
        this.#position.y,
        canvasSettings.cellWidth,
        canvasSettings.cellHeight
      );
    }
    ctx.restore();
  }
}

export default Player;
