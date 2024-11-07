import { NumberBase } from "./NumberBase.js";

export class RegularNum extends NumberBase<RegularNum>
{
    val: number;

    constructor(val: number)
    {
        super();
        this.val = val;
    }

    clone(): RegularNum {
        return new RegularNum(this.val);
    }
    add(num: RegularNum): void {
        this.val += num.val;
    }
    sub(num: RegularNum): void {
        this.val -= num.val;
    }
    mul(num: RegularNum): void {
        this.val *= num.val;
    }
    dev(num: RegularNum): void {
        this.val /= num.val;
    }
    pow(num: RegularNum): void {
        this.val = Math.pow(this.val, num.val);
    }
    exp(): void {
        this.val = Math.exp(this.val);
    }
    ln(): void {
        this.val = Math.log(this.val);
    }
    sin(): void {
        this.val = Math.sin(this.val);
    }
    cos(): void {
        this.val = Math.cos(this.val);
    }
    abs(): void {
        this.val = Math.abs(this.val);
    }
    equal(num: RegularNum): boolean {
       return this.val === num.val;
    }
    greater(num: RegularNum): boolean {
        return this.val > num.val;
    }
    toString(): string {
        return this.val.toFixed(4);
    }
    fromNumber(value: number): RegularNum {
        return new RegularNum(value);
    }
    asNumber(): number {
        return this.val;
    }
}