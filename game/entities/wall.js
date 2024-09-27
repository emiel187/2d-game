import Entity from './entity';
import { canvasSettings } from "../utils/settings";

// Wall entity class
// - Represents the walls in the game
// - Defines properties such as position, width, height
// - May include methods for rendering the wall
// - Could include collision detection logic specific to walls
// - Might have different types of walls (e.g., breakable, unbreakable)
// - Could include methods for special wall behaviors (e.g., secret passages)

class Wall extends Entity {
  #type;

  constructor(x, y, type, assets) {
    super(x, y);
    this.#type = type; // 'normal', 'breakable', 'secret'
    this._sprite = assets.rock;
  }

  getType() {
    return this.#type;
  }

  collide(entity) {
    // Basic collision logic
    console.log(`Collision with ${entity.constructor.name}`);
  }

  update() {
    // Update wall state if needed (e.g., for breakable walls)
  }

  draw(ctx) {
    const spriteX = 0;
    let spriteY = 0;

    // Select sprite based on wall type
    switch (this.#type) {
      case "breakable":
        spriteY = canvasSettings.cellHeight;
        break;
      case "secret":
        spriteY = canvasSettings.cellHeight * 2;
        break;
      default: // 'normal'
        spriteY = 0;
    }

    ctx.drawImage(
      this._sprite,
      spriteX,
      spriteY,
      this._width,
      this._height,
      this._position.x,
      this._position.y,
      this._width,
      this._height
    );
  }
}

export default Wall;
