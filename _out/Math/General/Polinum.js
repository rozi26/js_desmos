import { MathExpr } from "../../Parser/Parser1.js";
export class Polinum {
    constructor(cofs = []) {
        this.cofs = cofs;
    }
    add(pol) {
        const mm = Math.min(this.cofs.length, pol.cofs.length);
        for (let i = 0; i < mm; i++)
            this.cofs[i].add(pol.cofs[i]);
        if (mm == pol.cofs.length)
            return;
        for (let i = mm; i < pol.cofs.length; i++)
            this.cofs.push(pol.cofs[i]);
    }
    mul(pol) {
        const res = [];
        for (let i = 1; i < this.cofs.length + pol.cofs.length; i++)
            res.push(this.cofs[0].fromNumber(0));
        let temp;
        for (let v1 = 0; v1 < this.cofs.length; v1++) {
            for (let v2 = 0; v2 < pol.cofs.length; v2++) {
                temp = this.cofs[v1].clone();
                temp.mul(pol.cofs[v2]);
                res[v1 + v2].add(temp);
            }
        }
        this.cofs = res;
    }
    getAsExpress() {
        const func = (num) => {
            const sum = num[0].fromNumber(0);
            const mul = num[0].clone();
            let mc;
            sum.add(this.cofs[0]);
            for (let i = 1; i < this.cofs.length; i++) {
                mc = mul.clone();
                mc.mul(this.cofs[i]);
                sum.add(mc);
                mul.mul(num[0]);
            }
            return sum;
        };
        return new MathExpr(func, 1);
    }
    getDerivative() {
        const derPols = [];
        for (let i = 1; i < this.cofs.length; i++) {
            derPols.push(this.cofs[0].fromNumber(i));
            derPols[i - 1].mul(this.cofs[i]);
        }
        return new Polinum(derPols);
    }
    toString() {
        let res = "";
        for (let i = this.cofs.length - 1; i >= 0; i--) {
            if (i == 0) {
                res += this.cofs[i].toString();
                break;
            }
            res += this.cofs[i].toString() + "x";
            if (i != 1)
                res += `^${i}`;
            res += " ";
        }
        return res;
    }
}
//# sourceMappingURL=Polinum.js.map