import { CanvasWriterPlus } from "../../../../App/canvesWriter.js";
import { GridLayerBase } from "../../../../Mappers/2D/GridLayerBase.js";
import { Transformer2DLinear } from "../../../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { RegularNum } from "../../../../Math/Numbers/RegularNum.js";
import { Operation, getDefultRegularOperations } from "../../../../Parser/Operations.js";
import { MathExpr, ParseMath, ParseMathVars } from "../../../../Parser/Parser1.js";
import { DesmosRefrenceMeneger } from "../../../General/DesmosRefrenceMeneger.js";
import { ColorPicker } from "../../../General/Elements/Extenders/ColorPicker.js";
import { Desmos2DRefranceMeneger } from "../../Desmos2DRefranceMeneger.js";
import { Desmos2DElementBase, Desmos2DElementsTypes} from "../Desmos2DElementBase.js";

export class DesmosFunction2D extends Desmos2DElementBase
{
    protected func: MathExpr<RegularNum> | undefined
    protected text: string;
    protected refranceMenerger: Desmos2DRefranceMeneger;

    constructor(text: string, refranceMenerger: Desmos2DRefranceMeneger)
    {
        super()
        this.colorPicker = new ColorPicker();
        this.text = text;
        this.refranceMenerger = refranceMenerger;
        this.rebuild();
    }
    protected color: number;
    protected writer: CanvasWriterPlus;
    protected transformer: Transformer2DLinear;

    getName(): string {return "2d function"; }
    getLogo(): HTMLElement { const elm = document.createElement('h2'); elm.innerHTML = "F"; return elm }
    getType(): Desmos2DElementsTypes {return Desmos2DElementsTypes.Function}


    rebuild() {
        try
        {
            this.func = ParseMathVars(this.text, this.refranceMenerger.operations);
        }
        catch(e)
        {
            this.func = undefined;
            throw e;
        }
    }

    //the calculation part

    getAsOperation(name: string): Operation<RegularNum>
    {
        return new Operation(name, this.func.inpSize, this.func.func);
    }

    renderAt(px1: number, py1: number, px2: number, py2: number)
    {
        if (this.func === undefined) return;

        let prevPY: number = this.transformer.locToPixelY(this.func.calc([new RegularNum(this.transformer.pixelToLocX(px1 - 2))]).asNumber());
        
        for(let px = px1; px < px2; px++)
        {
            const x: number = this.transformer.pixelToLocX(px);
            const py: number = this.transformer.locToPixelY(this.func.calc([new RegularNum(x)]).asNumber());
            if (Math.max(py,prevPY) >= py1 && Math.min(py,prevPY) <= py2) this.writer.drawLine(px - 2,prevPY, px, py,this.colorPicker.getColor(),10)
            prevPY = py
        }
    }
    
}