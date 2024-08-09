import { LayerBase } from "../../../Mappers/2D/LayerBase.js";
import { Transformer2DBase } from "../../../Mappers/2D/Transformers/Transformer2DBase.js";
import { DesmosElementBase } from "../../Menu/DesmosElementBase.js";

export enum Desmos2DElementsTypes {Function, Point,Var, None}

export abstract class Desmos2DElementBase extends LayerBase implements DesmosElementBase
{
    abstract getName();
    abstract getLogo();
    abstract getType(): Desmos2DElementsTypes;

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
