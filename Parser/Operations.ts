import { NumberBase } from "../Math/Numbers/NumberBase.js";
import { ComplexNum , parseComplexNum} from "../Math/Numbers/ComplexNum.js";
import { RegularNum } from "../Math/Numbers/RegularNum.js";

export class Operation<T>
{
    name:string;
    parmsSize:number;
    func: (params: T[]) => T;

    constructor(name: string, parmsSize: number, func:(parms: T[]) => T |  any)
    {
        this.name = name;
        this.parmsSize = parmsSize;
        this.func = func;
    }

    calc(parms: T[]) : T
    {
        if (this.parmsSize !== -1 && parms.length != this.parmsSize) throw `try to run function [${this.name}] the get [${this.parmsSize}] parms with [${parms.length}] parms`;
        return this.func(parms);
    }
}

export class OperationsHolder<T>
{
    operations: Operation<T>[];
    parser: (text: string | number) => T;

    constructor(parse: (text: string) => T)
    {
        this.parser = parse;
        this.operations = [];
    }

    addOpe(operation : Operation<T>) : void
    {
        this.operations.push(operation);
    }

    removeOpe(name: string)
    {
        this.operations = this.operations.filter(ope => ope.name != name);
    }

    getOpe(name: string,len: number) : Operation<T> | undefined
    {
        const perfectMatch =  this.operations.find(ope => (ope.name === name && ope.parmsSize === len));
        if (perfectMatch !== undefined) return perfectMatch;
        return this.operations.find(ope => (ope.name === name && ope.parmsSize === -1));
    }

    haveName(name: string): boolean
    {
        return this.operations.findIndex((ope) => ope.name === name) !== -1;
    }
}

function getDefultOperations<T extends NumberBase<T>>(parser: (text: string | number) => T) : OperationsHolder<T>
{
    const opersHolder = new OperationsHolder<T>(parser);
    opersHolder.addOpe(new Operation("add",2,(p: T[]) => {const c = p[0].clone(); c.add(p[1]); return c;}))
    opersHolder.addOpe(new Operation("sub",2,(p: T[]) => {const c = p[0].clone(); c.sub(p[1]); return c;}))
    opersHolder.addOpe(new Operation("mul",2,(p: T[]) => {const c = p[0].clone(); c.mul(p[1]); return c;}))
    opersHolder.addOpe(new Operation("dev",2,(p: T[]) => {const c = p[0].clone(); c.dev(p[1]); return c;}))
    opersHolder.addOpe(new Operation("pow",2,(p: T[]) => {const c = p[0].clone(); c.pow(p[1]); return c;}))
    opersHolder.addOpe(new Operation("exp",1,(p: T[]) => {const c = p[0].clone(); c.exp(); return c;}))
    opersHolder.addOpe(new Operation("ln",1,(p: T[]) => {const c = p[0].clone(); c.ln(); return c;}))
    opersHolder.addOpe(new Operation("lg",1,(p: T[]) => {const c = p[0].clone(); c.log(p[0].fromNumber(2)); return c;}))
    opersHolder.addOpe(new Operation("log",1,(p: T[]) => {const c = p[0].clone(); c.log(p[0].fromNumber(10)); return c;}))
    opersHolder.addOpe(new Operation("log",2,(p: T[]) => {const c = p[0].clone(); c.log(p[1]); return c;}))
    opersHolder.addOpe(new Operation("cos",1,(p: T[]) => {const c = p[0].clone(); c.cos(); return c;}))
    opersHolder.addOpe(new Operation("inv",1,(p: T[]) => {const c = p[0].clone(); c.inverse(); return c;}))
    opersHolder.addOpe(new Operation("pi",0,(p: T[]) => {return parser(Math.PI);}))
    opersHolder.addOpe(new Operation("e",0,(p: T[]) => {return parser(Math.E);}))
    return opersHolder;
}

export function getDefultRegularOperations(): OperationsHolder<RegularNum>
{
    const holder = getDefultOperations((text) => new RegularNum(parseFloat(text as string)))
    return holder;
}

export function getDefultComplexOperations() : OperationsHolder<ComplexNum>
{
    const opersHolder = getDefultOperations<ComplexNum>((text) => parseComplexNum(text));
    opersHolder.addOpe(new Operation("i",0,(p: ComplexNum[]) => new ComplexNum(0,1)));

    return opersHolder;
}