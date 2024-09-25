import { canvasSettings } from '../utils/settings';

// Powerup entity class
// - Represents the powerups in the game
// - Can be collected by the player
// - Can be dropped by guards
// - Can be dropped by obstacles
// - Can be dropped by keys
// - Can be dropped by keys

class Powerup {
  #position;
  #width;
  #height;
  #type;
  #sprite;

  constructor(x, y, type, assets) {
    this.#position = { x, y };
    this.#width = canvasSettings.cellWidth;
    this.#height = canvasSettings.cellHeight;
    this.#type = type; // e.g., 'speed', 'invincibility', 'extra_life'
    this.#sprite = assets.powerupSprite;
  }

  getPosition() {
    return { ...this.#position };
  }

  getType() {
    return this.#type;
  }

  collect() {
    // Implement collection logic
    console.log(`Powerup collected: ${this.#type}`);
    // Return the powerup effect
  }

  update() {
    // Update powerup state if needed
  }

  draw(ctx) {
    // ctx.drawImage(
    //   this.#sprite,
    //   this.#position.x,
    //   this.#position.y,
    //   this.#width,
    //   this.#height
    // );
  }
}

export default Powerup;