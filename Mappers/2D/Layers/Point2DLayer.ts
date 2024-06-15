import { IdentifyNumber } from "../../../General/IdentifyNumber.js";
import { GridLayerBase } from "../GridLayerBase.js";

export class Point2DLayer extends GridLayerBase
{
    lx: number;
    ly: number;
    radius: number;
    color: number;

    cover_size: number;
    cover_color: number;

    constructor(lx: number, ly: number, radius: number=15, color: number=0, cover_size=0, cover_color=0)
    {
        super()
        console.log("color is " + color)
        this.lx = lx;
        this.ly = ly;
        this.radius = radius;
        this.color = color;

        this.cover_size = cover_size;
        this.cover_color = cover_color;
    }

    renderAt(px1: number, py1: number, px2: number, py2: number) {
        const px = this.transformer.locToPixelX(this.lx);
        if (px + this.radius < px1 || px - this.radius > px2) return;
        const py = this.transformer.locToPixelY(this.ly);
        if (py + this.radius < py1 || py - this.radius > py2) return;
        if (this.cover_size != 0) this.writer.drawCircle(px,py, this.cover_color, this.radius + this.cover_size);
        this.writer.drawCircle(px,py,this.color,this.radius)
    }

    getEffectRectangle(): number[] {
        const px = this.transformer.locToPixelX(this.lx);
        const py = this.transformer.locToPixelY(this.ly);
        const adder = this.radius + this.cover_size + 1
        return [px-adder,py-adder,px+adder,py+adder];
    }
    
    //add druging support
    isInDomain(lx: number, ly: number): number {
        const rad = this.transformer.unitPixelToLocX(this.radius,lx);
        return rad*rad - ((lx-this.lx)*(lx-this.lx) + (ly-this.ly)*(ly-this.ly));
    }

    rightClickDrag(px: number, py: number): void {
        this.lx = this.transformer.pixelToLocX(px);
        this.ly = this.transformer.pixelToLocY(py);
    }
}