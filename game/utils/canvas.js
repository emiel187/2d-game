// helper functions for the canvas
export function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export function clearContainer(container) {
    container.innerHTML = '';
}

