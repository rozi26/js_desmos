import { GridLayerBase } from "../../../Mappers/2D/GridLayerBase.js";
import { Transformer2DBase } from "../../../Mappers/2D/Transformers/Transformer2DBase.js";
import { ColorPicker } from "../../General/Elements/Extenders/ColorPicker.js";
import { DesmosElementBase } from "../../Menu/DesmosElementBase.js";

export enum Desmos2DElementsTypes {Function, Point,Var, None}

export abstract class Desmos2DElementBase extends GridLayerBase implements DesmosElementBase
{
    abstract getName(): string;
    abstract getLogo(): HTMLElement;
    abstract getType(): Desmos2DElementsTypes;
    

    protected colorPicker: ColorPicker | undefined = undefined;

    constructor()
    {
        super();
    }

    protected transformer: Transformer2DBase;
    public setTransformer(transformer: Transformer2DBase)
    {
        this.transformer = transformer;
    }

    getBoxExtand(): HTMLDivElement {
        return undefined;
    }
}
