import { ColorPicker } from "../../../General/Elements/Extenders/ColorPicker.js";
import { DesmosPoint } from "../../../General/Elements/Point/DesmosPoint.js";
import { Desmos2DElementBase, Desmos2DElementsTypes } from "../Desmos2DElementBase.js";
export class Desmos2DPoint extends Desmos2DElementBase {
    constructor(text, refranceMenerger) {
        super();
        this.text = text;
        this.refranceMenerger = refranceMenerger;
        this.colorPicker = new ColorPicker();
        this.rebuild();
    }
    rebuild() {
        this.point = new DesmosPoint(this.text, this.refranceMenerger.operations);
    }
    getName() {
        return "desmos 2d point";
    }
    getLogo() {
        return this.point.getLogo();
    }
    getType() {
        return Desmos2DElementsTypes.Point;
    }
    renderAt(px1, py1, px2, py2) {
        this.writer.drawCircle(this.transformer.locToPixelX(this.point.values[0].asNumber()), this.transformer.locToPixelY(this.point.values[1].asNumber()), this.colorPicker.getColor(), 10);
    }
}
//# sourceMappingURL=Desmos2DPoint.js.map