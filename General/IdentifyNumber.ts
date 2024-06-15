import { getRandomInt } from "../Math/General.js";

export class IdentifyNumber
{
    private digits: number[];

    constructor(len: number = 10)
    {
        this.digits = [];
        for (let i = 0; i < len; i++) this.digits.push(getRandomInt(0,16));
    }

    equalTo(other: IdentifyNumber): boolean
    {
        if (this.digits.length != other.digits.length) return false;
        for (let i = 0; i < this.digits.length; i++)
        {
            if (this.digits[i] != other.digits[i]) return false;
        }
        return true;
    }

    toString(): string
    {
        let str = "";
        this.digits.forEach(digit => str += digit.toString())
        return str
    }
}