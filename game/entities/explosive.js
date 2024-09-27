import Entity from './entity';

// Explosive entity
// - Properties: position, isHidden (under obstacle), isActive
// - Methods: detonate (trigger explosion), checkCollision (with player)
// - Handle explosion effects (reduce player lives, visual effects)
class Explosive extends Entity {
  #isHidden;
  #isActive;

  constructor(x, y, assets) {
    super(x, y);
    this.#isHidden = true;
    this.#isActive = false;
    this._sprite = assets.explosiveSprite;
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
        this._sprite,
        this._position.x,
        this._position.y,
        this._width,
        this._height
      );
    }
  }
}

export default Explosive;