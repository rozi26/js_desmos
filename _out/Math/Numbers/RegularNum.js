import { NumberBase } from "./NumberBase.js";
export class RegularNum extends NumberBase {
    constructor(val) {
        super();
        this.val = val;
    }
    clone() {
        return new RegularNum(this.val);
    }
    add(num) {
        this.val += num.val;
    }
    sub(num) {
        this.val -= num.val;
    }
    mul(num) {
        this.val *= num.val;
    }
    dev(num) {
        this.val /= num.val;
    }
    pow(num) {
        this.val = Math.pow(this.val, num.val);
    }
    exp() {
        this.val = Math.exp(this.val);
    }
    ln() {
        this.val = Math.log(this.val);
    }
    cos() {
        this.val = Math.cos(this.val);
    }
    abs() {
        this.val = Math.abs(this.val);
    }
    equal(num) {
        return this.val === num.val;
    }
    greater(num) {
        return this.val > num.val;
    }
    toString() {
        return this.val.toFixed(4);
    }
    fromNumber(value) {
        return new RegularNum(value);
    }
    asNumber() {
        return this.val;
    }
}
//# sourceMappingURL=RegularNum.js.map