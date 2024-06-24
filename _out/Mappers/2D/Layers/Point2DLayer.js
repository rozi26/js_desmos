import { GridLayerBase } from "../GridLayerBase.js";
export class Point2DLayer extends GridLayerBase {
    constructor(lx, ly, radius = 15, color = 0, cover_size = 0, cover_color = 0) {
        super();
        console.log("color is " + color);
        this.lx = lx;
        this.ly = ly;
        this.radius = radius;
        this.color = color;
        this.cover_size = cover_size;
        this.cover_color = cover_color;
    }
    renderAt(px1, py1, px2, py2) {
        const px = this.transformer.locToPixelX(this.lx);
        if (px + this.radius < px1 || px - this.radius > px2)
            return;
        const py = this.transformer.locToPixelY(this.ly);
        if (py + this.radius < py1 || py - this.radius > py2)
            return;
        if (this.cover_size != 0)
            this.writer.drawCircle(px, py, this.cover_color, this.radius + this.cover_size);
        this.writer.drawCircle(px, py, this.color, this.radius);
    }
    getEffectRectangle() {
        const px = this.transformer.locToPixelX(this.lx);
        const py = this.transformer.locToPixelY(this.ly);
        const adder = this.radius + this.cover_size + 1;
        return [px - adder, py - adder, px + adder, py + adder];
    }
    //add druging support
    isInDomain(lx, ly) {
        const rad = this.transformer.unitPixelToLocX(this.radius, lx);
        return rad * rad - ((lx - this.lx) * (lx - this.lx) + (ly - this.ly) * (ly - this.ly));
    }
    rightClickDrag(px, py) {
        this.lx = this.transformer.pixelToLocX(px);
        this.ly = this.transformer.pixelToLocY(py);
    }
}
//# sourceMappingURL=Point2DLayer.js.map