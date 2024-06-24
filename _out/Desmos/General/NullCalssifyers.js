import { DesmomsClassifyerBase } from "../Menu/DesmosCalssifyerBase.js";
import { DesmosElementBase } from "../Menu/DesmosElementBase.js";
export class NullCalssifyer extends DesmomsClassifyerBase {
    constructor() { super(); }
    isValid(text) { return true; }
    transform(text) { return new NullElement(); }
}
export class NullElement extends DesmosElementBase {
    constructor() {
        super();
    }
    //to support desmos 2d element
    setTransformer(transformer) { }
    setData(writer, transformer) { }
    renderAt(px1, py1, px2, py2) { }
    getName() {
        return "null";
    }
    getLogo() {
        const div = document.createElement("div");
        div.style.backgroundColor = "red";
        div.style.width = "100%";
        div.style.height = "100%";
        return div;
    }
}
//# sourceMappingURL=NullCalssifyers.js.map