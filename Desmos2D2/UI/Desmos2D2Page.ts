import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { Transformer2DLinearCreator } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { BackgroundLayer } from '../../Mappers/2D/Layers/BackgroundLayer.js';
import { GridLayer } from "../../Mappers/2D/Layers/GridLayer.js";
import { GridLayer2 } from "../../Mappers/2D/Layers/GridLayer2.js";


export class Desmos2D2Page extends Layered2D
{
    constructor(writer: CanvasWriterPlus)
    {
        super(writer, Transformer2DLinearCreator)
        this.addLayer(new BackgroundLayer(255,255,255));
        this.addLayer(new GridLayer2());
    }
}