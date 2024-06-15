import { DesmomsClassifyerBase } from "../../Menu/DesmosCalssifyerBase.js";
import { DesmosElementBase } from "../../Menu/DesmosElementBase.js";
import { DesmosFunction2D } from "./DesmosFunction2D.js";

export class FunctionClassifyer extends DesmomsClassifyerBase<DesmosFunction2D>
{
    constructor() {super();}

    isValid(text: string): boolean
    {
        return text.includes('x');
    }

    transform(text: string): DesmosFunction2D
    {
        return new DesmosFunction2D(text, this.refranceMeneger);
    }
}