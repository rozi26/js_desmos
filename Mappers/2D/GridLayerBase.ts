import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { Transformer2DBase } from "./Transformers/Transformer2DBase.js";
import { Transformer2DLinear } from "./Transformers/Transformer2DLinear.js";

export abstract class GridLayerBase
{
    public ID: IdentifyNumber = new IdentifyNumber();
    protected writer: CanvasWriterPlus | undefined;
    protected transformer: Transformer2DLinear;

    constructor(id: IdentifyNumber = undefined)
    {
        if (id !== undefined) this.ID = id;
    }

    setData(writer: CanvasWriterPlus, transformer: Transformer2DBase)
    {
        this.writer = writer;
        this.transformer = transformer;
    }

    abstract renderAt(px1: number, py1: number, px2: number, py2: number);
    
    fullRender()
    {
        const ef = this.getEffectRectangle();
        this.renderAt(ef[0],ef[1],ef[2],ef[3]);
    }

    //optional override methods
    getEffectRectangle(): number[] //return the effect are of the object [x1,y1,x2,y2]
    {
        return [0,0,this.transformer.screenWidth,this.transformer.screenHeight];
    }

    isInDomain(lx: number, ly: number): number {return 0;} //is the mouse is in the object domain return priority below zero not a match
    rightClickDrag(px: number, py: number) {} //drag the object with the right click (px and py are the relative location of the curser to the canves)
}