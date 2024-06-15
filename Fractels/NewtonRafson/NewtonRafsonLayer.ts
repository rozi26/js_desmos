import { Color } from "../../General/Color.js";
import { GridLayerBase } from "../../Mappers/2D/GridLayerBase.js";
import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { Transformer2DLinear } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { Polinum } from "../../Math/General/Polinum.js";
import { CN_abs, CN_sub, ComplexNum } from "../../Math/Numbers/ComplexNum.js";
import { NewtonRafsonSolve } from "../../Math/Solvers/EquationSolver.js";
import { PixelLoaderBase } from "../Common/PixelLoaderBase.js";
import { ColorizeBase } from "../Common/Colorize/ColorizeBase.js";
import { FRACTEL_COLORIZERS } from "../Common/Colorize/ColorizerList.js";

export class NewtonRafsonLayer extends PixelLoaderBase
{
    transformer: Transformer2DLinear;
    iterations: number;
    points: ComplexNum[];
    calcFunc: (num: ComplexNum, iters: number) => ComplexNum;

    constructor(transformer: Transformer2DLinear, points: ComplexNum[], colorize: ColorizeBase = undefined)
    {
        super()
        this.transformer = transformer;
        this.iterations = 10;
        this.calcFunc = (num, i) => num;
        this.updatePoints(points);
        this.colorizer = colorize == undefined ? FRACTEL_COLORIZERS.black: colorize
    }

    updatePoints(points: ComplexNum[])
    {
        this.points = points;
        const pol = new Polinum([new ComplexNum(1)]);
        for (let i = 0; i < this.points.length; i++)
        {
            const temp = new ComplexNum(-1);
            temp.mul(this.points[i]);
            pol.mul(new Polinum([temp,new ComplexNum(1)]));
        }
        console.log(pol.toString())
        const exp = pol.getAsExpress();
        const dev = pol.getDerivative().getAsExpress();
        this.calcFunc = (num: ComplexNum, iters: number) => NewtonRafsonSolve(exp,dev,num,iters);
    }

    getPixel(px: number, py: number): number {
        const num = new ComplexNum(this.transformer.pixelToLocX(px),this.transformer.pixelToLocY(py));
        const res = this.calcFunc(num,this.iterations);
        
        let cd = CN_abs(CN_sub(res,this.points[0]));
        let td;
        let ci = 0;
        for (let i = 1; i < this.points.length; i++)
        {
            td = CN_abs(CN_sub(res,this.points[i]))
            if (td > cd) continue;
            cd = td;
            ci = i;
        }
        return ci;
    }
}