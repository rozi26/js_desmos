import { NumberBase } from "../../../../Math/Numbers/NumberBase.js";
import { OperationsHolder } from "../../../../Parser/Operations";
import { Desmos2DRefranceMeneger } from "../../../2D/Desmos2DRefranceMeneger.js";
import { DesmomsClassifyerBase } from "../../../Menu/DesmosCalssifyerBase.js";
import { DesmosPoint } from "./DesmosPoint.js";

export class DesmosPointClassifyer<T extends NumberBase<T>> extends DesmomsClassifyerBase<DesmosPoint<T>>
{
    
    transform(text: string): DesmosPoint<T> {
        const ref = (this.refranceMeneger as unknown as Desmos2DRefranceMeneger).operations;
        if (ref === undefined) throw "desmos var couldn't get operations refrance"
        return new DesmosPoint<T>(text, ref as unknown as OperationsHolder<T>);
    }

    isValid(text: string):boolean {
        if (text.length < 3) return false; 
        if (text[0] != '(' || text[text.length - 1] != ')') return false;
        return text.indexOf(",") != -1;
    }
}