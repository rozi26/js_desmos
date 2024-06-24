import { DesmomsClassifyerBase } from "../../../Menu/DesmosCalssifyerBase.js";
import { DesmosPoint } from "./DesmosPoint.js";
export class DesmosPointClassifyer extends DesmomsClassifyerBase {
    transform(text) {
        const ref = this.refranceMeneger.operations;
        if (ref === undefined)
            throw "desmos var couldn't get operations refrance";
        return new DesmosPoint(text, ref);
    }
    isValid(text) {
        if (text.length < 3)
            return false;
        if (text[0] != '(' || text[text.length - 1] != ')')
            return false;
        return text.indexOf(",") != -1;
    }
}
//# sourceMappingURL=DesmosPointClassifyer.js.map