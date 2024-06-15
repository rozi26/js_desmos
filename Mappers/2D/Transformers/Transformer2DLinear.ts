import { Transformer2DBase } from "./Transformer2DBase.js";

export class Transformer2DLinear extends Transformer2DBase
{
    screenWidth: number;
    screenHeight: number;
    CX: number;
    CY: number;
    ratio: number;

    constructor(screenWidth: number, screenHeight: number, cx: number = -1, ratio: number = 0.01)
    {
        super()
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.ratio = ratio;
        this.CX = cx;
        this.CY = cx + this.ratio - this.ratio * this.screenHeight / this.screenWidth;
    }

    updateBuffers()
    {
    }

    pixelToLocX(px: number): number{ return px*this.ratio + this.CX;}
    pixelToLocY(py: number): number{ return (this.screenHeight - py)*this.ratio + this.CY;}
    
    locToPixelX(x: number): number{ return (x - this.CX) / this.ratio;}
    locToPixelY(y: number): number{ return this.screenHeight - ((y - this.CY) / this.ratio);}

    move(mx: number, my: number,px: number,py: number)
    {
        this.CX -= mx * this.ratio;
        this.CY += my * this.ratio;
        this.updateBuffers();
    }
}

export const Transformer2DLinearCreator = (width: number, height: number) => new Transformer2DLinear(width,height)