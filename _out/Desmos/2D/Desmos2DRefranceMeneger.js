import { getDefultRegularOperations } from "../../Parser/Operations.js";
import { DesmosRefrenceMeneger } from "../General/DesmosRefrenceMeneger.js";
import { Desmos2DElementsTypes } from "./Elements/Desmos2DElementBase.js";
export class Desmos2DRefranceMeneger extends DesmosRefrenceMeneger {
    constructor() {
        super();
        this.operations = getDefultRegularOperations();
    }
    SignElement(element, name) {
        if (element.getType() == Desmos2DElementsTypes.Function) {
            this.operations.addOpe(element.getAsOperation(name));
        }
        return super.SignElement(element, name);
    }
    UnsignElement(key) {
        this.operations.removeOpe(key.name);
        return super.UnsignElement(key);
    }
}
//# sourceMappingURL=Desmos2DRefranceMeneger.js.map