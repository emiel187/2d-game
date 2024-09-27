import Entity from "./entity";
import { canvasSettings } from "../utils/settings";

// Obstacle entity class
// - Represents the obstacles in the game
// - Can be destroyed by the player
// - Can drop powerups when destroyed
// - Can drop explosives when destroyed
// - Can drop keys when destroyed
// - Can drop keys when destroyed

class Obstacle extends Entity {
  #health;
  #type;

  constructor(x, y, type, assets) {
    super(x, y);
    this.#type = type;
    this.#health = 100;
    this._sprite = assets.obstacleSprite;
  }

  getType() {
    return this.#type;
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
    console.log("Obstacle destroyed!");
    // Return dropped items (powerups, explosives, keys)
  }

  update() {
    // Update obstacle state if needed
  }

  draw(ctx) {
    if (this.#health > 0) {
      ctx.drawImage(
        this._sprite,
        this._position.x,
        this._position.y,
        this._width,
        this._height
      );
    }
  }
}

export default Obstacle;
