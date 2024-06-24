import { Transformer2DBase } from "./Transformer2DBase.js";
export class Transformer2DLinear extends Transformer2DBase {
    constructor(screenWidth, screenHeight, cx = -1, ratio = 0.01) {
        super();
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
    move(mx, my, px, py) {
        this.CX -= mx * this.ratio;
        this.CY += my * this.ratio;
        this.updateBuffers();
    }
}
export const Transformer2DLinearCreator = (width, height) => new Transformer2DLinear(width, height);
//# sourceMappingURL=Transformer2DLinear.js.map