import { canvasSettings } from '../utils/settings';

// Obstacle entity class
// - Represents the obstacles in the game
// - Can be destroyed by the player
// - Can drop powerups when destroyed
// - Can drop explosives when destroyed
// - Can drop keys when destroyed
// - Can drop keys when destroyed
class Obstacle {
  #position;
  #width;
  #height;
  #health;
  #sprite;

  constructor(x, y, assets) {
    this.#position = { x, y };
    this.#width = canvasSettings.cellWidth;
    this.#height = canvasSettings.cellHeight;
    this.#health = 100;
    this.#sprite = assets.obstacleSprite;
  }

  getPosition() {
    return { ...this.#position };
  }

  takeDamage(amount) {
    this.#health -= amount;
    if (this.#health <= 0) {
      return this.destroy();
    }
    return null;
  }

  destroy() {
    // Implement destruction logic
    console.log('Obstacle destroyed!');
    // Return dropped items (powerups, explosives, keys)
  }

  update() {
    // Update obstacle state if needed
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

export default Obstacle;