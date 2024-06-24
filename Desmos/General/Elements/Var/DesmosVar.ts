import { NumberBase } from "../../../../Math/Numbers/NumberBase.js";
import { RegularNum } from "../../../../Math/Numbers/RegularNum.js";
import { Operation, OperationsHolder } from "../../../../Parser/Operations.js";
import { MathExpr, ParseMath } from "../../../../Parser/Parser1.js";
import { Desmos2DElementBase, Desmos2DElementsTypes } from "../../../2D/Elements/Desmos2DElementBase.js";
import { DesmosElementBase } from "../../../Menu/DesmosElementBase.js";


export class DesmosVar<T extends NumberBase<T>> extends Desmos2DElementBase
{
    public Val?: T;
    private extandDivText: HTMLHeadingElement
    protected text: string;
    protected operation: OperationsHolder<T>;

    constructor(text: string, operation: OperationsHolder<T>)
    {
        super();
        this.text = text;
        this.operation = operation
        this.rebuild();
    }

    getName(): string {   return "var";}
    getLogo(): HTMLElement { const h = document.createElement("h2"); h.innerHTML = 'v'; return h;}

    rebuild() {
        const res: MathExpr<T> = ParseMath<T>(this.text,this.operation);
        if (res.inpSize != 0) throw "error on var, require varible";
        this.Val = res.calc([]);
    }

    getType(): Desmos2DElementsTypes { return Desmos2DElementsTypes.Var;}
    renderAt(px1: number, py1: number, px2: number, py2: number) { }

    getBoxExtand(): HTMLDivElement {
        const div = document.createElement("div");
        this.extandDivText = document.createElement("h3");
        this.extandDivText.style.margin = "0px";
        this.extandDivText.style.textAlign = "right";
        this.extandDivText.innerHTML = this.Val.toString();
        div.appendChild(this.extandDivText);
        return div;
    }
    
    getAsOperation(name: string): Operation<RegularNum>
    {
        return new Operation(name,0,() => this.Val)
    }
}