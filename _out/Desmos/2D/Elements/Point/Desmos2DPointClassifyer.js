import { DesmosPointClassifyer } from "../../../General/Elements/Point/DesmosPointClassifyer.js";
import { DesmomsClassifyerBase } from "../../../Menu/DesmosCalssifyerBase.js";
import { Desmos2DPoint } from "./Desmos2DPoint.js";
export class Desmos2DPointClassifyer extends DesmomsClassifyerBase {
    constructor() {
        super();
        this.classifyer = new DesmosPointClassifyer();
    }
    transform(text) {
        return new Desmos2DPoint(text, this.refranceMeneger);
    }
    isValid(text) {
        return this.classifyer.isValid(text) && text.split(",").length == 2;
    }
}
//# sourceMappingURL=Desmos2DPointClassifyer.js.map