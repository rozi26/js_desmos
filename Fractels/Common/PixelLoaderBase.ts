import { Color } from "../../General/Color.js";
import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { LayerBase } from "../../Mappers/2D/LayerBase.js";
import { ColorizeBase } from "./Colorize/ColorizeBase.js";
import { FRACTEL_COLORIZERS } from "./Colorize/ColorizerList.js";


export abstract class PixelLoaderBase extends LayerBase
{
    public gridSize: number = 9;
    public colorizer: ColorizeBase

    constructor()
    {
        super(new IdentifyNumber());
        this.colorizer = FRACTEL_COLORIZERS.black;
    }

    abstract getPixel(px: number, py: number): number;

    getColor(px: number, py: number): Color
    {
        return this.colorizer.colorizer(this.getPixel(px,py));
    }

    bruteRender(px1: number, py1: number, px2: number, py2: number)
    {
        let col: Color;
        for (let y = py1; y < py2; y++)
        {
            for (let x = px1; x < px2; x++)
            {
                col = this.getColor(x,y);
                this.writer.setAtColor(x,y,col.r, col.g, col.b);
            }
        }
    }

    renderAt(px1: number, py1: number, px2: number, py2: number)
    {
        if (this.gridSize === 1)
        {
            this.bruteRender(px1, py1, px2, py2);
            return;
        }
        
        const gridWidth = Math.ceil((px2 - px1) / this.gridSize);
        const gridHeight = Math.ceil((py2 - py1) / this.gridSize);
        const gridVals: number[] = [];
        for(let y = 0; y < gridHeight; y++)
        {
            for(let x = 0; x < gridWidth; x++)
            {
                gridVals.push(this.getPixel(px1 + x*this.gridSize, py1 + y*this.gridSize));
            }
        }
        for (let y = 1; y < gridHeight; y++)
        {
            const ya2 = gridWidth*y;
            const ya1 = ya2 - gridWidth;
            for (let x = 1; x < gridWidth; x++)
            {
                if (gridVals[ya1 + x - 1] == gridVals[ya2 + x - 1] && gridVals[ya1 + x - 1] == gridVals[ya1 + x] && gridVals[ya2 + x - 1] == gridVals[ya2 + x])
                {
                    this.writer.setRect(px1+(x-1)*this.gridSize,py1+(y-1)*this.gridSize,px1+x*this.gridSize,py1+y*this.gridSize,this.colorizer.colorizer(gridVals[ya1 + x]).getAsSingleValue())
                }
                else
                {
                    this.bruteRender(px1+(x-1)*this.gridSize,py1+(y-1)*this.gridSize,px1+x*this.gridSize,py1+y*this.gridSize)
                }
            }
        }
        this.bruteRender(px1,py1 + (gridHeight - 1)*this.gridSize,px2,py2);
        this.bruteRender(px1 + (gridWidth - 1)*this.gridSize ,py1,px2,py2);
    }
}