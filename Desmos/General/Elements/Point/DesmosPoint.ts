import { NumberBase } from "../../../../Math/Numbers/NumberBase.js";
import { OperationsHolder } from "../../../../Parser/Operations.js";
import { MathExpr, ParseMath } from "../../../../Parser/Parser1.js";
import { DesmosElementBase } from "../../../Menu/DesmosElementBase.js";

export class DesmosPoint<T extends NumberBase<T>> extends DesmosElementBase
{
    values: T[]

    constructor(text: string, operation: OperationsHolder<T>)
    {
        super();
        this.values = [];
        const parts = text.substring(1,text.length - 1).split(",");
        for (let i = 0; i < parts.length; i++)
        {
            const res: MathExpr<T> = ParseMath<T>(parts[i],operation);
            if (res.inpSize != 0) throw "error on point part " + i + " require var";
            this.values.push(res.calc([]))
        }
        const res: MathExpr<T> = ParseMath<T>(text,operation);
        if (res.inpSize != 0) throw "error on var, require varible";
    }

    getName(): string {
        return "point"
    }
    getLogo(): HTMLElement {
        const h = document.createElement("h2"); h.innerHTML = 'P'; return h;
    }
    
}