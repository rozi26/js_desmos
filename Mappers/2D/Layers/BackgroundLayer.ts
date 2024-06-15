import { GridLayerBase } from "../GridLayerBase.js";

export class BackgroundLayer extends GridLayerBase
{
    r : number;
    g : number;
    b : number;
    
    constructor(r: number,g: number,b: number)
    {
        super()
        this.r = r;
        this.g = g;
        this.b = b;
    }

    renderAt(px1: number, py1: number, px2: number, py2: number) {
        this.writer.setRectAtColor(px1,py1,px2,py2,this.r,this.g,this.b);
    }
}