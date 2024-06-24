import { ComplexNum, parseComplexNum } from "../Math/Numbers/ComplexNum.js";
import { RegularNum } from "../Math/Numbers/RegularNum.js";
export class Operation {
    constructor(name, parmsSize, func) {
        this.name = name;
        this.parmsSize = parmsSize;
        this.func = func;
    }
    calc(parms) {
        if (this.parmsSize !== -1 && parms.length != this.parmsSize)
            throw `try to run function [${this.name}] the get [${this.parmsSize}] parms with [${parms.length}] parms`;
        return this.func(parms);
    }
}
export class OperationsHolder {
    constructor(parse) {
        this.parser = parse;
        this.operations = [];
    }
    addOpe(operation) {
        this.operations.push(operation);
    }
    removeOpe(name) {
        this.operations = this.operations.filter(ope => ope.name != name);
    }
    getOpe(name, len) {
        const perfectMatch = this.operations.find(ope => (ope.name === name && ope.parmsSize === len));
        if (perfectMatch !== undefined)
            return perfectMatch;
        return this.operations.find(ope => (ope.name === name && ope.parmsSize === -1));
    }
    haveName(name) {
        return this.operations.findIndex((ope) => ope.name === name) !== -1;
    }
}
function getDefultOperations(parser) {
    const opersHolder = new OperationsHolder(parser);
    opersHolder.addOpe(new Operation("add", 2, (p) => { const c = p[0].clone(); c.add(p[1]); return c; }));
    opersHolder.addOpe(new Operation("sub", 2, (p) => { const c = p[0].clone(); c.sub(p[1]); return c; }));
    opersHolder.addOpe(new Operation("mul", 2, (p) => { const c = p[0].clone(); c.mul(p[1]); return c; }));
    opersHolder.addOpe(new Operation("dev", 2, (p) => { const c = p[0].clone(); c.dev(p[1]); return c; }));
    opersHolder.addOpe(new Operation("pow", 2, (p) => { const c = p[0].clone(); c.pow(p[1]); return c; }));
    opersHolder.addOpe(new Operation("exp", 1, (p) => { const c = p[0].clone(); c.exp(); return c; }));
    opersHolder.addOpe(new Operation("ln", 1, (p) => { const c = p[0].clone(); c.ln(); return c; }));
    opersHolder.addOpe(new Operation("lg", 1, (p) => { const c = p[0].clone(); c.log(p[0].fromNumber(2)); return c; }));
    opersHolder.addOpe(new Operation("log", 1, (p) => { const c = p[0].clone(); c.log(p[0].fromNumber(10)); return c; }));
    opersHolder.addOpe(new Operation("log", 2, (p) => { const c = p[0].clone(); c.log(p[1]); return c; }));
    opersHolder.addOpe(new Operation("cos", 1, (p) => { const c = p[0].clone(); c.cos(); return c; }));
    opersHolder.addOpe(new Operation("inv", 1, (p) => { const c = p[0].clone(); c.inverse(); return c; }));
    opersHolder.addOpe(new Operation("pi", 0, (p) => { return parser(Math.PI); }));
    opersHolder.addOpe(new Operation("e", 0, (p) => { return parser(Math.E); }));
    return opersHolder;
}
export function getDefultRegularOperations() {
    const holder = getDefultOperations((text) => new RegularNum(parseFloat(text)));
    return holder;
}
export function getDefultComplexOperations() {
    const opersHolder = getDefultOperations((text) => parseComplexNum(text));
    opersHolder.addOpe(new Operation("i", 0, (p) => new ComplexNum(0, 1)));
    return opersHolder;
}
//# sourceMappingURL=Operations.js.map