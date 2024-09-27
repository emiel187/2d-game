import Entity from "./entity";

// Exit entity class
// - Represents the exit in the game
// - Can be collected by the player
// - Properties: position
// - Methods: collect (mark as collected), update, draw

class Exit extends Entity {
  constructor(x, y, assets) {
    super(x, y);
    this._sprite = assets.exit;
  }

  draw(ctx) {
    ctx.drawImage(
      this._sprite,
      this._position.x,
      this._position.y,
      this._width,
      this._height
    );
  }
}

export default Exit;
