import { Grid2D } from "./Grid2D.js";
import {CanvasWriterPlus } from "../../App/canvesWriter.js";
import { LayerBase } from "./LayerBase.js";
import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { transformerCreator } from "./Transformers/Transformer2DBase.js";

export class Layered2D extends Grid2D
{
    protected layers : LayerBase[];
    protected rightFocusLayer: LayerBase | undefined = undefined;

    constructor(writer: CanvasWriterPlus, creator: transformerCreator)
    {
        super(writer,creator);
        this.layers = [];
    }
    
    addLayer(layer : LayerBase)
    {
        layer.setData(this.writer, this.transformer);
        this.layers.push(layer);
    }

    removeLayer(id: IdentifyNumber)
    {
        this.layers = this.layers.filter(layer => !layer.ID.equalTo(id));
    }
    
    renderAt(px1: number, py1: number, px2: number, py2: number)
    {
        this.layers.forEach(layer => layer.renderAt(px1,py1,px2,py2));
        //this.layers.forEach(layer => layer.renderAt(0,0,this.writer.width,this.writer.height));
    }

    //advange methods
    renderWithoutLayer(excludeLayer: LayerBase)
    {
        const renderArea = excludeLayer.getEffectRectangle();
        for (let i = 0; i < this.layers.length; i++)
        {
            if (this.layers[i].ID.equalTo(excludeLayer.ID)) continue
            this.layers[i].renderAt(renderArea[0],renderArea[1],renderArea[2],renderArea[3]);
        }
        this.writer.render(renderArea[0],renderArea[1],renderArea[2],renderArea[3])
    }

    renderSingleLayer(layer: LayerBase)
    {
        const renderArea = layer.getEffectRectangle();
        layer.renderAt(renderArea[0],renderArea[1],renderArea[2],renderArea[3]);
        this.writer.render(renderArea[0],renderArea[1],renderArea[2],renderArea[3])
    }

    //support right click operation
    rightClick(x: number, y: number): void {
        const lx = this.transformer.pixelToLocX(x);
        const ly = this.transformer.pixelToLocY(y);
        this.rightFocusLayer = undefined;
        let ls = 0
        let score = 0;
        for (let i = 0; i < this.layers.length; i++)
        {
            score = this.layers[i].isInDomain(lx,ly)
            if (score <= ls) continue;
            ls = score;
            this.rightFocusLayer = this.layers[i];
            break;
        }
    }

    rightClickUp(x: number, y: number): void {
        this.rightFocusLayer = undefined;
    }

    moveRight(px: number, py: number): void {
        if (this.rightFocusLayer == undefined) return
        this.renderWithoutLayer(this.rightFocusLayer);
        this.rightFocusLayer.rightClickDrag(px,py);
        this.renderSingleLayer(this.rightFocusLayer);
    }
}