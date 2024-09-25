const margin = -5;

export function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width + margin &&
        rect1.x + rect1.width + margin > rect2.x &&
        rect1.y < rect2.y + rect2.height + margin &&
        rect1.y + rect1.height + margin > rect2.y
    );
}