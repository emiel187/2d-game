import { canvasSettings } from '../utils/settings';

// Explosive entity
// - Properties: position, isHidden (under obstacle), isActive
// - Methods: detonate (trigger explosion), checkCollision (with player)
// - Handle explosion effects (reduce player lives, visual effects)
class Explosive {
  #position;
  #width;
  #height;
  #isHidden;
  #isActive;
  #sprite;

  constructor(x, y, assets) {
    this.#position = { x, y };
    this.#width = canvasSettings.cellWidth;
    this.#height = canvasSettings.cellHeight;
    this.#isHidden = true;
    this.#isActive = false;
    this.#sprite = assets.explosiveSprite;
  }

  getPosition() {
    return { ...this.#position };
  }

  isHidden() {
    return this.#isHidden;
  }

  isActive() {
    return this.#isActive;
  }

  reveal() {
    this.#isHidden = false;
  }

  detonate() {
    this.#isActive = true;
    // Implement explosion logic here
    console.log('Explosive detonated!');
  }

  checkCollision(entity) {
    // Implement collision detection logic
    // Return true if colliding, false otherwise
  }

  update() {
    // Update explosive state if needed
  }

  draw(ctx) {
    if (!this.#isHidden) {
      ctx.drawImage(
        this.#sprite,
        this.#position.x,
        this.#position.y,
        this.#width,
        this.#height
      );
    }
  }
}

export default Explosive;