import { RegularNum } from "../../../../Math/Numbers/RegularNum.js";
import { OperationsHolder } from "../../../../Parser/Operations.js";
import { ColorPicker } from "../../../General/Elements/Extenders/ColorPicker.js";
import { DesmosPoint } from "../../../General/Elements/Point/DesmosPoint.js";
import { Desmos2DElementBase, Desmos2DElementsTypes } from "../Desmos2DElementBase.js";

export class Desmos2DPoint extends Desmos2DElementBase
{
    point: DesmosPoint<RegularNum>
    constructor(text: string, operation: OperationsHolder<RegularNum>)
    {
        super();
        this.colorPicker = new ColorPicker();
        this.point = new DesmosPoint(text,operation);
        console.log(this.point)
    }

    getName() {
        return "desmos 2d point";
    }
    getLogo() {
        return this.point.getLogo();
    }
    getType(): Desmos2DElementsTypes {
        return Desmos2DElementsTypes.Point;
    }
    renderAt(px1: number, py1: number, px2: number, py2: number) {
        this.writer.drawCircle(this.transformer.locToPixelX(this.point.values[0].asNumber()),this.transformer.locToPixelY(this.point.values[1].asNumber()),this.colorPicker.getColor(),10);
    }
}