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
  #sprite;

  constructor(x, y, assets) {
    this.#position = { x, y };
    this.#width = canvasSettings.cellWidth;
    this.#height = canvasSettings.cellHeight;
    this.#speed = 2;
    this.#detectionRange = 5 * canvasSettings.cellWidth;
    this.#sprite = assets.guardSprite;
  }

  getPosition() {
    return { ...this.#position };
  }

  moveTowards(target) {
    // Implement movement logic towards target
  }

  detectPlayer(playerPosition) {
    // Implement player detection logic
    // Return true if player is within detection range, false otherwise
  }

  attack() {
    // Implement attack logic
    console.log('Guard attacks!');
  }

  defeat() {
    // Implement defeat logic
    console.log('Guard defeated!');
    // Return dropped items (powerups, explosives, keys)
  }

  update(playerPosition) {
    if (this.detectPlayer(playerPosition)) {
      this.moveTowards(playerPosition);
    }
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

export default Guard;