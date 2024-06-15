import { CenterBallLayer } from "./Layers/CenterBallLayer.js";
import { BackgroundLayer } from "./Layers/BackgroundLayer.js";
import { GridLayer } from "./Layers/GridLayer.js";
import { Layered2D } from "./Layered2D.js";
import { CanvasWriter, CanvasWriterPlus } from "../../App/canvesWriter.js";
import { Transformer2DLinearCreator } from "./Transformers/Transformer2DLinear.js";

export class test2d extends Layered2D
{
    constructor(writer: CanvasWriterPlus)
    {
        super(writer,Transformer2DLinearCreator);
        this.addLayer(new BackgroundLayer(255,255,255));
        this.addLayer(new GridLayer());
        this.addLayer(new CenterBallLayer());
    }
}