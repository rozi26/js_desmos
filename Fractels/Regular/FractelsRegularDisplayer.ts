import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { Transformer2DLinear, Transformer2DLinearCreator } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { FractelsRunner } from "./FractelsLayer.js";


export class FractelsRegularDisplayer extends Layered2D
{
    fractelsLayer: FractelsRunner;
    constructor(writer: CanvasWriterPlus)
    {
        super(writer,Transformer2DLinearCreator);
        this.fractelsLayer = new FractelsRunner(this.transformer);
        this.addLayer(this.fractelsLayer);
    }
}