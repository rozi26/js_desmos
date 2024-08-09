import { LayerBase } from "../LayerBase.js";


const MINIMUM_DISTANTE_PIXELS = 100;

export class GridLayer2 extends LayerBase
{
    renderAt(px1: number, py1: number, px2: number, py2: number) {
        const sizeX = this.transformer.ratio * MINIMUM_DISTANTE_PIXELS
        alert(sizeX)
    }
}