import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { Transformer2DLinear } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { Desmos2DElementBase } from "../2D/Elements/Desmos2DElementBase.js";
import { DesmomsClassifyerBase } from "../Menu/DesmosCalssifyerBase.js";
import { DesmosElementBase } from "../Menu/DesmosElementBase.js";

export class NullCalssifyer extends DesmomsClassifyerBase<NullElement>
{
    constructor() {super()}

    isValid(text: string): boolean {  return true; }
    transform(text: string): NullElement {return new NullElement();}
    
}

export class NullElement extends DesmosElementBase
{
    constructor()
    {
        super();
    }
    
    //to support desmos 2d element
    public setTransformer(transformer: Transformer2DLinear): void {}
    protected writer: CanvasWriterPlus;setData(writer: CanvasWriterPlus, transformer: Transformer2DLinear): void {}
    renderAt(px1: number, py1: number, px2: number, py2: number) {  }

    getName(): string {
        return "null";
    }
    getLogo(): HTMLElement {
        const div = document.createElement("div");
        div.style.backgroundColor = "red";
        div.style.width = "100%";
        div.style.height = "100%";
        return div;
    }
    

}