import { NumberBase } from "../../../../Math/Numbers/NumberBase.js";
import { OperationsHolder, getDefultRegularOperations } from "../../../../Parser/Operations.js";
import { Desmos2DRefranceMeneger } from "../../../2D/Desmos2DRefranceMeneger.js";
import { DesmomsClassifyerBase } from "../../../Menu/DesmosCalssifyerBase.js";
import { DesmosVar } from "./DesmosVar.js";

export class DesmosVarClassifyer<T extends NumberBase<T>> extends DesmomsClassifyerBase<DesmosVar<T>>
{
    transform(text: string): DesmosVar<T>
    {
        const ref = (this.refranceMeneger as unknown as Desmos2DRefranceMeneger).operations;
        if (ref === undefined) throw "desmos var couldn't get operations refrance"

        return new DesmosVar<T>(text,ref as unknown as OperationsHolder<T>);
    }

}