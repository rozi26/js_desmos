import { Color } from "../../General/Color.js";
import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { Point2DLayer } from "../../Mappers/2D/Layers/Point2DLayer.js";
import { Transformer2DLinearCreator } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { ComplexNum } from "../../Math/Numbers/ComplexNum.js";
import { NewtonColorizer1 } from "../Common/Colorize/ColorizeBase.js";
import { NewtonRafsonLayer } from "./NewtonRafsonLayer.js";
export class NewtonRafsonDisplayer extends Layered2D {
    constructor(writer) {
        super(writer, Transformer2DLinearCreator);
        const defultPoints = [];
        const amountOfDefult = 3;
        for (let i = 0; i < amountOfDefult; i++)
            defultPoints.push(new ComplexNum(Math.cos(Math.PI * 2 * i / amountOfDefult), Math.sin(Math.PI * 2 * i / amountOfDefult)));
        this.pointsDisplayers = defultPoints.map(point => new Point2DLayer(point.r, point.i, 15, (new Color(0, 255, 255)).getAsSingleValue(), 2, 0));
        this.displayLayer = new NewtonRafsonLayer(this.transformer, defultPoints, NewtonColorizer1);
        this.addLayer(this.displayLayer);
        this.pointsDisplayers.forEach(layer => this.addLayer(layer));
    }
}
//# sourceMappingURL=NewtonRafsonDisplayer.js.map