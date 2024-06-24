import { round } from "./General.js";
const ROUND_DIGITS = 3;
export class ComplexNum {
    constructor(r = 0, i = 0) {
        this.r = r;
        this.i = i;
    }
    clone() {
        return new ComplexNum(this.r, this.i);
    }
    add(num) {
        this.r += num.r;
        this.i += num.i;
    }
    sub(num) {
        this.r -= num.r;
        this.i -= num.i;
    }
    mul(num) {
        const tempR = this.r;
        this.r = this.r * num.r - this.i * num.i;
        this.i = this.i * num.r + tempR * num.i;
    }
    dev(num) {
        const denom = num.r * num.r + num.i * num.i;
        const tempR = this.r;
        this.r = (this.r * num.r + this.i * num.i) / denom;
        this.i = (this.i * num.r - tempR * num.i) / denom;
    }
    inverse() {
        const denom = 1 / (this.r * this.r + this.i * this.i);
        this.r *= denom;
        this.i *= -denom;
    }
    pow(num) {
        this.ln();
        this.mul(num);
        this.exp();
    }
    exp() {
        const temp = Math.exp(this.r);
        this.r = Math.cos(this.i) * temp;
        this.i = Math.sin(this.i) * temp;
    }
    ln() {
        const r = Math.log(this.getAlpha());
        this.i = Math.atan2(this.i, this.r);
        this.r = r;
    }
    log(base) {
        const cln = base.clone();
        cln.ln();
        this.ln();
        this.dev(cln);
    }
    cos() {
        const c1 = this.clone();
        c1.mul(new ComplexNum(0, -1));
        c1.exp();
        const c2 = this.clone();
        c2.mul(new ComplexNum(0, 1));
        c2.exp();
        c1.add(c2);
        c1.dev(new ComplexNum(2));
        this.r = c1.r;
        this.i = c1.i;
    }
    abs() {
        this.r = this.getAlpha();
        this.i = 0;
    }
    getAlpha() {
        return Math.sqrt(this.r * this.r + this.i * this.i);
    }
    equal(num) {
        return this.r === num.r && this.i === num.i;
    }
    toString() {
        const r = round(this.r, ROUND_DIGITS);
        const i = round(this.i, ROUND_DIGITS);
        if (i === 0)
            return `${r}`;
        if (i < 0)
            return `${r} - ${Math.abs(i)}i`;
        return `${r} + ${i}i`;
    }
    isComplex() {
        return round(this.i, ROUND_DIGITS) === 0;
    }
}
export function parseComplexNum(text) {
    if (text instanceof ComplexNum)
        return text;
    if (typeof text === 'number')
        return new ComplexNum(text);
    return new ComplexNum(parseFloat(text));
}
//# sourceMappingURL=ComplexNum.js.map