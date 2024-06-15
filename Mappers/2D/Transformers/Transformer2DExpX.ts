import { Transformer2DBase } from "./Transformer2DBase.js";


export class Transformer2DExpX extends Transformer2DBase
{
    expConst: number = 10
    expConstLog: number;
    ratio: number;
    CX: number;
    CY: number;
    screenWidth: number;
    screenHeight: number;
    xyR: number;

    constructor(screenWidth: number, screenHeight: number, cx: number = 0.01,cy: number = 0, ratio: number = 1, xyR: number = 1)
    {
        super();
        this.screenWidth = screenWidth
        this.screenHeight = screenHeight;
        this.CX = cx
        this.CY = cy + ratio*xyR/2
        this.ratio = ratio;
        this.xyR = xyR;
    }

    updateBuffers() {
        this.expConstLog = Math.log(this.expConst);
    }
    pixelToLocX(px: number) {
        return Math.pow(this.expConst,(px*this.ratio + this.CX)/this.screenWidth);
    }
    pixelToLocY(py: number): number{ return (this.screenHeight - py)*this.ratio + this.CY;}
    locToPixelX(x: number) {
        return (Math.log(x/this.CX)/this.expConstLog)*this.screenWidth/this.ratio;
    }
    locToPixelY(y: number): number{ return this.screenHeight - ((y - this.CY) / this.ratio);}

    move(mx: number, my: number,px: number,py: number)
    {
        this.CX -= this.ratio*mx;
        this.CY -= this.unitPixelToLocY(my,py);
        this.updateBuffers();
    }

}

export const Transformer2DExpXCreator = (width: number, height: number) => new Transformer2DExpX(width,height)