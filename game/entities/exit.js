import Entity from "./entity.js";

// Exit entity class
// - Represents the exit in the game
// - Can be collected by the player
// - Properties: position
// - Methods: collect (mark as collected), update, draw

class Exit extends Entity {
  constructor(x, y, assets) {
    super(x, y, 'exit', assets);
    this._sprite = assets.yellowRuin;
    this._sparkles = this._createSparkles();
  }

  _createSparkles() {
    const sparkleCount = 20;
    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: this._position.x + Math.random() * this._width,
        y: this._position.y + Math.random() * this._height,
        vy: -0.5 + Math.random() * 0.5 // vertical velocity
      });
    }
    return sparkles;
  }

  _updateSparkles() {
    for (const sparkle of this._sparkles) {
      sparkle.y += sparkle.vy;
      if (sparkle.y < this._position.y) {
        sparkle.y = this._position.y + this._height;
      }
    }
  }

  draw(ctx) {
    // Draw a semi-transparent dark rectangle over the current cell
    ctx.fillStyle = 'rgba(255, 255, 200, 0.3)'; // Light yellow color with 30% opacity
    ctx.fillRect(
      this._position.x,
      this._position.y,
      this._width,
      this._height
    );
    // Draw the exit sprite
    ctx.drawImage(
      this._sprite,
      this._position.x,
      this._position.y,
      this._width,
      this._height
    );

    // Update and draw sparkles
    this._updateSparkles();
    const sparkleSize = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (const sparkle of this._sparkles) {
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, sparkleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default Exit;
