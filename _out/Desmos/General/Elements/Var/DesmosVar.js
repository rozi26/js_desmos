import { Operation } from "../../../../Parser/Operations.js";
import { ParseMath } from "../../../../Parser/Parser1.js";
import { Desmos2DElementBase, Desmos2DElementsTypes } from "../../../2D/Elements/Desmos2DElementBase.js";
export class DesmosVar extends Desmos2DElementBase {
    constructor(text, operation) {
        super();
        this.text = text;
        this.operation = operation;
        this.rebuild();
    }
    getName() { return "var"; }
    getLogo() { const h = document.createElement("h2"); h.innerHTML = 'v'; return h; }
    rebuild() {
        const res = ParseMath(this.text, this.operation);
        if (res.inpSize != 0)
            throw "error on var, require varible";
        this.Val = res.calc([]);
    }
    getType() { return Desmos2DElementsTypes.Var; }
    renderAt(px1, py1, px2, py2) { }
    getBoxExtand() {
        const div = document.createElement("div");
        this.extandDivText = document.createElement("h3");
        this.extandDivText.style.margin = "0px";
        this.extandDivText.style.textAlign = "right";
        this.extandDivText.innerHTML = this.Val.toString();
        div.appendChild(this.extandDivText);
        return div;
    }
    getAsOperation(name) {
        return new Operation(name, 0, () => this.Val);
    }
}
//# sourceMappingURL=DesmosVar.js.map