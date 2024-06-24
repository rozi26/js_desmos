import { Desmos2DElementBase, Desmos2DElementsTypes } from "./Desmos2DElementBase.js";
export class DesmosPoint2D extends Desmos2DElementBase {
    constructor(text) {
        super();
        const parts = text.substring(1, text.length - 1).split(",");
    }
    getName() { return "2d point"; }
    getLogo() { const elm = document.createElement('h2'); elm.innerHTML = "P"; return elm; }
    getType() { return Desmos2DElementsTypes.Point; }
    renderAt(px1, py1, px2, py2) {
        this.writer.drawCircle(this.transformer.locToPixelX(this.X), this.transformer.locToPixelY(this.Y), 0, 5);
    }
}
//# sourceMappingURL=DesmosPoint2D.js.map