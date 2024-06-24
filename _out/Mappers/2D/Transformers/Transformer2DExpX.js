import { Transformer2DBase } from "./Transformer2DBase.js";
export class Transformer2DExpX extends Transformer2DBase {
    constructor(screenWidth, screenHeight, cx = 0.01, cy = 0, ratio = 1, xyR = 1) {
        super();
        this.expConst = 10;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.CX = cx;
        this.CY = cy + ratio * xyR / 2;
        this.ratio = ratio;
        this.xyR = xyR;
    }
    updateBuffers() {
        this.expConstLog = Math.log(this.expConst);
    }
    pixelToLocX(px) {
        return Math.pow(this.expConst, (px * this.ratio + this.CX) / this.screenWidth);
    }
    pixelToLocY(py) { return (this.screenHeight - py) * this.ratio + this.CY; }
    locToPixelX(x) {
        return (Math.log(x / this.CX) / this.expConstLog) * this.screenWidth / this.ratio;
    }
    locToPixelY(y) { return this.screenHeight - ((y - this.CY) / this.ratio); }
    move(mx, my, px, py) {
        this.CX -= this.ratio * mx;
        this.CY -= this.unitPixelToLocY(my, py);
        this.updateBuffers();
    }
}
export const Transformer2DExpXCreator = (width, height) => new Transformer2DExpX(width, height);
//# sourceMappingURL=Transformer2DExpX.js.map