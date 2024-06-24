import { ComplexNum } from "../../Math/Numbers/ComplexNum.js";
import { PixelLoaderBase } from "../Common/PixelLoaderBase.js";
import { FRACTEL_COLORIZERS } from "../Common/Colorize/ColorizerList.js";
import { FRACTELS } from "./Fractels/FractelsList.js";
export class FractelsRunner extends PixelLoaderBase {
    constructor(transformer) {
        super();
        this.fractel = FRACTELS.Mandelbort;
        this.colorizer = FRACTEL_COLORIZERS.orange;
        this.transformer = transformer;
        this.interations = 100;
    }
    getPixel(px, py) {
        return this.fractel.getValue(new ComplexNum(this.transformer.pixelToLocX(px), this.transformer.pixelToLocY(py)), this.interations);
    }
}
//# sourceMappingURL=FractelsLayer.js.map