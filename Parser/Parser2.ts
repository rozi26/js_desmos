import { OperationsHolder } from "./Operations.js";
import { MathExpr } from "./Parser1.js";
import { findExperEnding } from "./Utils.js";

export function PreProcess(text: string): string
{
    text = text.replace(" ","");


    const openOpers = [['^'],['*','/'],['-','+']];
    const openNames = [['pow'],['mul','dev'],['sub','add']];

    for (let p = 0; p < openOpers.length; p++)
    {
        let changes = 10;
        for (let i = 0; i < text.length; i++)
        {
            const matchIndex = openOpers[p].indexOf(text[i]);
            if (matchIndex === -1) continue;
            const i1 = findExperEnding(text,i,false) + 1;
            const i2 = findExperEnding(text,i,true);
            if (i1 === undefined || i2 === undefined) throw "fail to find expersion bounds in preprosses";
            const p1 = text.substring(i1,i);
            const p2 = text.substring(i + 1, i2);
            //console.log(`split for [${text[i]}] p1: [${p1}], p2: [${p2}] with i1: [${i1}] and i2: [${i2}]`)
            text = `${text.substring(0,i1)}${openNames[p][matchIndex]}(${p1},${p2})${text.substring(i2)}`;
            changes--;
            if (changes === -1) throw "pass max iters";
            //i = i1 + openNames[p][matchIndex].length + 1;
        }
    }

    return text;
}

export function ParseMathVars<T>(text: string, funcs: OperationsHolder<T>): MathExpr<T>
{
    text = PreProcess(text);
    console.log(text);
    return undefined;
}