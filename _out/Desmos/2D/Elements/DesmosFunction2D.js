import { RegularNum } from "../../../Math/Numbers/RegularNum.js";
import { Operation } from "../../../Parser/Operations.js";
import { ParseMathVars } from "../../../Parser/Parser1.js";
import { Desmos2DElementBase, Desmos2DElementsTypes } from "./Desmos2DElementBase.js";
export class DesmosFunction2D extends Desmos2DElementBase {
    constructor(text, refranceMenerger) {
        super();
        try {
            this.func = ParseMathVars(text, refranceMenerger.operations);
        }
        catch (e) {
            this.func = undefined;
            throw e;
        }
    }
    getName() { return "2d function"; }
    getLogo() { const elm = document.createElement('h2'); elm.innerHTML = "F"; return elm; }
    getType() { return Desmos2DElementsTypes.Function; }
    //the calculation part
    getAsOperation(name) {
        return new Operation(name, this.func.inpSize, this.func.func);
    }
    renderAt(px1, py1, px2, py2) {
        if (this.func === undefined)
            return;
        let prevPY = this.transformer.locToPixelY(this.func.calc([new RegularNum(this.transformer.pixelToLocX(px1 - 2))]).asNumber());
        for (let px = px1; px < px2; px++) {
            const x = this.transformer.pixelToLocX(px);
            const py = this.transformer.locToPixelY(this.func.calc([new RegularNum(x)]).asNumber());
            if (Math.max(py, prevPY) >= py1 && Math.min(py, prevPY) <= py2)
                this.writer.drawLine(px - 2, prevPY, px, py, 0, 10);
            prevPY = py;
        }
    }
}
//# sourceMappingURL=DesmosFunction2D.js.map