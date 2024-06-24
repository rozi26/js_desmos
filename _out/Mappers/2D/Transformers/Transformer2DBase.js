export class Transformer2DBase {
    zoom(ratio, px, py) {
        this.CX += (this.pixelToLocX(px) - this.CX) * (1 - ratio);
        this.CY += (this.pixelToLocY(py) - this.CY) * (1 - ratio);
        this.ratio *= ratio;
        this.updateBuffers();
    }
    //generic but slow move method, recomended to self imploments for better prof
    move(mx, my, px, py) {
        this.CX -= this.unitPixelToLocX(mx, px);
        this.CY -= this.unitPixelToLocY(my, py);
        this.updateBuffers();
    }
    changeScreenSize(width, height) {
        this.screenWidth = width;
        this.screenHeight = height;
        this.updateBuffers();
    }
    unitPixelToLocX(uintPixel, start) {
        return this.pixelToLocX(start + uintPixel) - this.pixelToLocX(start);
    }
    unitPixelToLocY(uintPixel, start) {
        return this.pixelToLocY(start + uintPixel) - this.pixelToLocY(start);
    }
}
//# sourceMappingURL=Transformer2DBase.js.map