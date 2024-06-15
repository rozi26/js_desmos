import {findExperEnding,getLettersOver,splitByCommas, isDigit, isLetter, getLettersInsideStr} from "./Utils.js";
import { getDefultComplexOperations, OperationsHolder } from "./Operations.js";
import { ComplexNum } from "../Math/Numbers/ComplexNum.js";
import { NumberBase } from "../Math/Numbers/NumberBase.js";

function PreProsses(text)
{
    text = text.replaceAll(" ","");

    

    //add mults before vars (2i -> 2*i)
    for (let i = 1; i < text.length; i++)
    {
        if (isLetter(text[i]) && isDigit(text[i-1])) text = text.substring(0,i) + "*" + text.substring(i);
    }

    //change to function experrsion (1+1 -> add(1,1))
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

export class MathExpr<T>
{
    func: (inp: T[]) => T;
    inpSize: number;

    constructor(func : (inp: T[]) => T, inpSize)
    {
        this.func = func;
        this.inpSize = inpSize;
    }

    calc(inps: T[] = []): T
    {
        return this.func(inps);
    }
}

function cleanParseMath<T>(text: string, funcs: OperationsHolder<T>): MathExpr<T>
{
    //console.log(`resive clean input: [${text}]`)
    if (isDigit(text[0]))
    {
        const num = funcs.parser(text);
        return new MathExpr(() => {return num},0);
    }
    if (text[0] === '[')
    {
        const inx = parseInt(text.substring(1,text.length - 1));
        return new MathExpr((arr) => {return arr[inx];},inx + 1);
    }
    if (text[0] === '(')
    {
        return cleanParseMath(text.substring(1,text.length - 1),funcs);
    }

    const funcName = text.substring(0,getLettersOver(text,0,true));
    //console.log(`resive name of [${funcName}]`)
    const funcVars = splitByCommas(text,funcName.length + 1);
    const innerExprs = [];
    for (let i = 0; i < funcVars.length; i++) innerExprs.push(cleanParseMath(funcVars[i],funcs));
    
    let maxInput = 0;
    for (let i = 0; i < funcVars.length; i++) maxInput = Math.max(maxInput, innerExprs[i].inpSize);

    const func = funcs.getOpe(funcName,funcVars.length);
    if (func === undefined) throw `couldn't find function named [${funcName}] that get [${funcVars.length}] inputs`;

    if (maxInput === 0) //calculate the result of the function in complation time so make the method faster
    {
        const inps = [];
        for (let i = 0; i < innerExprs.length; i++) inps[i] = innerExprs[i].calc();
        const res = func.calc(inps);
        return new MathExpr(() => res,0);
    }

    return new MathExpr((parms) => {
        const inps = [];
        for (let i = 0; i < innerExprs.length; i++) inps[i] = innerExprs[i].calc(parms);
        return func.calc(inps);
    },maxInput);
}

export function ParseMath<T>(text: string, funcs: OperationsHolder<T>): MathExpr<T>
{
    text = PreProsses(text);
    return cleanParseMath(text, funcs);
}


export function GetMathVars<T>(text: string, funcs: OperationsHolder<T>): {[key: string]: number}
{
    let sentances = getLettersInsideStr(text).map(sent => sent.text);
    sentances = sentances.filter(sent => !funcs.haveName(sent)) //remove names of known constants or functions

    //sort and remove duplicats
    sentances.sort();
    const setSentances = [];
    for (let i = 0; i < sentances.length; i++)
    {
        if (i == 0 || sentances[i - 1] !== sentances[i]) setSentances.push(sentances[i]);
    }
    sentances = setSentances;

    const obj = {};
    sentances.forEach((sent,i) => obj[sent] = i);
    return obj
}

export function ParseMathVars<T>(text: string, funcs: OperationsHolder<T>): MathExpr<T>
{
    const vars = GetMathVars(text,funcs);
    if (vars.length == 0) return ParseMath(text,funcs);
    const locs = getLettersInsideStr(text).filter(data => data.text in vars);
    let res = "";
    let prev = 0;
    locs.forEach((loc) => {
        res += text.substring(prev,loc.inx);
        res += `[${vars[loc.text]}]`
        prev = loc.inx + loc.text.length;
    })
    res += text.substring(prev, text.length);
    return ParseMath(res,funcs);
}