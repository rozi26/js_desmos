import { DesmomsClassifyerBase } from "../../../Menu/DesmosCalssifyerBase.js";
import { DesmosVar } from "./DesmosVar.js";
export class DesmosVarClassifyer extends DesmomsClassifyerBase {
    transform(text) {
        const ref = this.refranceMeneger.operations;
        if (ref === undefined)
            throw "desmos var couldn't get operations refrance";
        return new DesmosVar(text, ref);
    }
}
//# sourceMappingURL=DesmosVarClassifyer.js.map