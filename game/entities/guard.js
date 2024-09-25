import { canvasSettings } from '../utils/settings';
// Guard entity class
// - Represents the guards in the game
// - Can move towards the player
// - Can detect the player's position
// - Can attack the player
// - Can be defeated by the player
// - Can drop powerups when defeated
// - Can drop explosives when defeated
// - Can drop keys when defeated
// - Can drop keys when defeated
class Guard {
  #position;
  #width;
  #height;
  #speed;
  #detectionRange;
  #sprites;
  #currentSprite;

  constructor(x, y, assets) {
    this.#position = { x, y };
    this.action = 'idle';
    this.movement = 'down';
    this.#width = canvasSettings.cellWidth;
    this.#height = canvasSettings.cellHeight;
    this.#speed = 2;
    this.#detectionRange = 5 * canvasSettings.cellWidth;
    this.#sprites = assets;
    this.#currentSprite = this.#sprites.orc1_Idle;
    this.frameCount = 0;
    this.currentFrame = 0;
  }

  getPosition() {
    return { ...this.#position };
  }

  moveTowards(target) {
    // Implement movement logic towards target
    this.action = 'run';
  }

  detectPlayer(playerPosition) {
    // Implement player detection logic
    // Return true if player is within detection range, false otherwise
    return true;
  }

  attack() {
    this.action = 'attack';
    this.#currentSprite = this.#sprites.orc1_Attack;
  }

  defeat() {
    this.action = 'dead';
    this.#currentSprite = this.#sprites.orc1_Death;
    // Return dropped items (powerups, explosives, keys)
  }

  update(playerPosition) {
    const frames_per_action = 4;
    this.frameCount++;
    if (this.frameCount >= 10) {
      this.frameCount = 0;
      this.currentFrame = (this.currentFrame + 1) % frames_per_action;
    }
    if (this.detectPlayer(playerPosition)) {
      this.moveTowards(playerPosition);
    }
  }

  draw(ctx) {
    let spriteHeight = 64;
    let spriteWidth = 64;
    let spriteX = this.currentFrame * spriteWidth;
    let spriteY = 0;
    ctx.drawImage(
      this.#currentSprite,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight,
      this.#position.x,
      this.#position.y,
      this.#width,
      this.#height
    );
  }
}

export default Guard;