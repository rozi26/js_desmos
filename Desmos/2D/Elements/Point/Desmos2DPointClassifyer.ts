import { RegularNum } from "../../../../Math/Numbers/RegularNum.js";
import { OperationsHolder } from "../../../../Parser/Operations.js";
import { DesmosPoint } from "../../../General/Elements/Point/DesmosPoint.js";
import { DesmosPointClassifyer } from "../../../General/Elements/Point/DesmosPointClassifyer.js";
import { DesmomsClassifyerBase } from "../../../Menu/DesmosCalssifyerBase.js";
import { Desmos2DRefranceMeneger } from "../../Desmos2DRefranceMeneger.js";
import { Desmos2DPoint } from "./Desmos2DPoint.js";

export class Desmos2DPointClassifyer extends DesmomsClassifyerBase<Desmos2DPoint>
{
    classifyer: DesmosPointClassifyer<RegularNum>
    constructor()
    {
        super();
        this.classifyer = new DesmosPointClassifyer();
    }

    transform(text: string): Desmos2DPoint
    {
        const ref = (this.refranceMeneger as unknown as Desmos2DRefranceMeneger).operations;
        if (ref === undefined) throw "desmos var couldn't get operations refrance"
        return new Desmos2DPoint(text, ref as unknown as OperationsHolder<RegularNum>);
    }

    isValid(text: string): boolean {
        return this.classifyer.isValid(text) && text.split(",").length == 2
    }
}