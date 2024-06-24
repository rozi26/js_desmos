export class Transformer2D {
    constructor(screenWidth, screenHeight, cx = -1, ratio = 0.01) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.ratio = ratio;
        this.CX = cx;
        this.CY = cx + this.ratio - this.ratio * this.screenHeight / this.screenWidth;
    }
    updateBuffers() {
    }
    pixelToLocX(px) { return px * this.ratio + this.CX; }
    pixelToLocY(py) { return (this.screenHeight - py) * this.ratio + this.CY; }
    locToPixelX(x) { return (x - this.CX) / this.ratio; }
    locToPixelY(y) { return this.screenHeight - ((y - this.CY) / this.ratio); }
    changeScreenSize(width, height) {
        this.screenWidth = width;
        this.screenHeight = height;
        this.updateBuffers();
    }
    zoom(ratio, px, py) {
        this.CX += (this.pixelToLocX(px) - this.CX) * (1 - ratio);
        this.CY += (this.pixelToLocY(py) - this.CY) * (1 - ratio);
        this.ratio *= ratio;
        this.updateBuffers();
    }
    move(mx, my) {
        this.CX -= mx * this.ratio;
        this.CY += my * this.ratio;
    }
    unitPixelToLoc(uintPixel) {
        return uintPixel * this.ratio;
    }
}
//# sourceMappingURL=Transformer2D.js.map