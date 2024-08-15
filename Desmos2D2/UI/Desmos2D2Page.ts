import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { Transformer2DLinearCreator } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { BackgroundLayer } from '../../Mappers/2D/Layers/BackgroundLayer.js';
import { GridLayer2 } from "../../Mappers/2D/Layers/GridLayer2.js";
import { Desmos2D2SideMenu } from "./Desmos2D2SideMenu.js";


export class Desmos2D2Page extends Layered2D
{
    SIDE_MENU: Desmos2D2SideMenu

    constructor(writer: CanvasWriterPlus)
    {
        super(writer, Transformer2DLinearCreator)
        this.addLayer(new BackgroundLayer(255,255,255));
        this.addLayer(new GridLayer2());
    }

    setSideDiv(div: HTMLDivElement): void {
        this.SIDE_MENU = new Desmos2D2SideMenu(div);
    }
}