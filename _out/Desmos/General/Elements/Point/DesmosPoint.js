import { ParseMath } from "../../../../Parser/Parser1.js";
import { DesmosElementBase } from "../../../Menu/DesmosElementBase.js";
export class DesmosPoint extends DesmosElementBase {
    constructor(text, operation) {
        super();
        this.values = [];
        const parts = text.substring(1, text.length - 1).split(",");
        for (let i = 0; i < parts.length; i++) {
            const res = ParseMath(parts[i], operation);
            if (res.inpSize != 0)
                throw "error on point part " + i + " require var";
            this.values.push(res.calc([]));
        }
        const res = ParseMath(text, operation);
        if (res.inpSize != 0)
            throw "error on var, require varible";
    }
    getName() {
        return "point";
    }
    getLogo() {
        const h = document.createElement("h2");
        h.innerHTML = 'P';
        return h;
    }
}
//# sourceMappingURL=DesmosPoint.js.map