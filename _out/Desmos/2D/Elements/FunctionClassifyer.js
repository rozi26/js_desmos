import { DesmomsClassifyerBase } from "../../Menu/DesmosCalssifyerBase.js";
import { DesmosFunction2D } from "./DesmosFunction2D.js";
export class FunctionClassifyer extends DesmomsClassifyerBase {
    constructor() { super(); }
    isValid(text) {
        return text.includes('x');
    }
    transform(text) {
        return new DesmosFunction2D(text, this.refranceMeneger);
    }
}
//# sourceMappingURL=FunctionClassifyer.js.map