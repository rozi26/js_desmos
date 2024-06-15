import { Color } from "../../General/Color.js";
import { Transformer2DLinear } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { ComplexNum } from "../../Math/Numbers/ComplexNum.js";
import { PixelLoaderBase } from "../Common/PixelLoaderBase.js";
import { ColorizeBase } from "../Common/Colorize/ColorizeBase.js";
import { FRACTEL_COLORIZERS } from "../Common/Colorize/ColorizerList.js";
import { Fractel } from "./Fractels/FractelBase.js";
import { FRACTELS } from "./Fractels/FractelsList.js";

export class FractelsRunner extends PixelLoaderBase
{
    fractel: Fractel;
    colorizer: ColorizeBase;
    interations: number;
    transformer: Transformer2DLinear;

    constructor(transformer: Transformer2DLinear)
    {
        super();
        this.fractel = FRACTELS.Mandelbort;
        this.colorizer = FRACTEL_COLORIZERS.orange;
        this.transformer = transformer;
        this.interations = 100;
    }

    getPixel(px: number, py: number): number {
            return this.fractel.getValue( new ComplexNum(this.transformer.pixelToLocX(px), this.transformer.pixelToLocY(py)), this.interations)
    }
}