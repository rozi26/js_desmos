
export abstract class Transformer2DBase
{
    abstract ratio: number;
    abstract CX: number;
    abstract CY: number;
    abstract screenWidth: number;
    abstract screenHeight: number;

    abstract updateBuffers();
    abstract pixelToLocX(px: number);
    abstract pixelToLocY(py: number);
    abstract locToPixelX(x: number);
    abstract locToPixelY(y: number);

    zoom(ratio: number, px: number, py: number)
    {
        this.CX += (this.pixelToLocX(px) - this.CX) * (1 - ratio);
        this.CY += (this.pixelToLocY(py) - this.CY) * (1 - ratio);
        this.ratio *= ratio;
        this.updateBuffers();
    }

    //generic but slow move method, recomended to self imploments for better prof
    move(mx: number, my: number,px: number,py: number)
    {
        this.CX -= this.unitPixelToLocX(mx,px);
        this.CY -= this.unitPixelToLocY(my,py);
        this.updateBuffers();
    }

    changeScreenSize(width, height)
    {
        this.screenWidth = width;
        this.screenHeight = height;
        this.updateBuffers();
    }

    unitPixelToLocX(uintPixel: number, start: number): number
    {
        return this.pixelToLocX(start+uintPixel) - this.pixelToLocX(start);
    }
    unitPixelToLocY(uintPixel: number, start: number): number
    {
        return this.pixelToLocY(start+uintPixel) - this.pixelToLocY(start);
    }
}

export type transformerCreator = (width: number, height: number) => Transformer2DBase