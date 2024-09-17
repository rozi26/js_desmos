import { NumberBase } from "../Numbers/NumberBase.js";
import { RegularNum } from "../Numbers/RegularNum.js";

export class Matrix<T extends NumberBase<T>>
{
    vals: T[][]
    constructor(data: T[][])
    {
        this.vals = data.slice();
    }

    private getOperationError(operation_name: string, mat: Matrix<T>): void
    {
        throw new Error(`tried to ${operation_name} array matrix shape ${mat.vals.length}-${mat.vals[0].length} to matrix from shape ${this.vals.length}-${this.vals[0].length}`);
    }

    add(mat: Matrix<T>): void
    {
        if (this.vals.length != mat.vals.length || this.vals[0].length != mat.vals[0].length) this.getOperationError("add",mat);
        for (let i = 0; i < this.vals.length; i++)
        {
            for (let g = 0; g < this.vals[0].length; g++) this.vals[i][g].add(mat.vals[i][g]);
        }
    }

    sub(mat: Matrix<T>): void
    {
        if (this.vals.length != mat.vals.length || this.vals[0].length != mat.vals[0].length) this.getOperationError("sub",mat);
        for (let i = 0; i < this.vals.length; i++)
        {
            for (let g = 0; g < this.vals[0].length; g++) this.vals[i][g].sub(mat.vals[i][g]);
        }
    }
    
    mul(mat: Matrix<T>): void //note that this operation can be improved (O(n^3))
    {
        if (this.vals.length != mat.vals[0].length || this.vals[0].length != mat.vals.length)  this.getOperationError("multiply",mat);
        const zero: T = this.vals[0][0].clone(); zero.sub(this.vals[0][0]);
        const res = this.vals.map(v => mat.vals[0].map(t => zero.clone())); //create the result matrix full of zeros
        let v;
        for (let i = 0; i < this.vals.length; i++)
        {
            for (let g = 0; g < mat.vals[0].length; g++)
            {
                for (let k = 0; k < this.vals.length; k++)
                {
                    v = this.vals[i][k].clone();
                    v.mul(mat.vals[k][g]);
                    res[i][g].add(v);
                }
            }
        }
        this.vals = res;
    }

    mulS(scalar: T): void //multiply each value of the array by scalar
    {
        for (let i = 0; i < this.vals.length; i++) {for (let g = 0; g < this.vals[0].length; g++) this.vals[i][g].mul(scalar)};
    }

    clone(): Matrix<T>
    {
        return new Matrix(this.vals.slice());
    }

    equal(mat: Matrix<T>): boolean
    {
        if (this.vals.length != mat.vals.length || this.vals[0].length != mat.vals[0].length) return false;
        for (let i = 0; i < this.vals.length; i++) {for (let g = 0; g < this.vals[0].length; g++) {
            if (!this.vals[i][g].equal(mat.vals[i][g])) return false;
        }}
        return true;
    }

    toString(): String
    {
        const strs = this.vals.map(line => line.map(l => l.toString()));
        const maxLine = strs[0].map(s => s.length);
        for (let i = 1; i < strs.length; i++)
        {
            for (let g = 0; g < strs[0].length; g++) maxLine[g] = Math.max(maxLine[g], strs[i][g].length);
        }
        let res = "";
        for (let i = 0; i < strs.length; i++)
        {
            res += (i == 0) ? '/' : (i == strs.length - 1 ? '\\' : '|')
            for (let g = 0; g < strs[0].length; g++)
            {
                res += " ".repeat(~~((maxLine[g] - strs[i][g].length + 1) / 2));
                res += strs[i][g];
                res += " ".repeat(~~((maxLine[g] - strs[i][g].length + 2) / 2));
            }
            res += (i == 0) ? '\\\n' : (i == strs.length - 1 ? '/' : '|\n')
        }
        return res
    }
}

function MatrixFromNums(data: number[][]): Matrix<RegularNum>
{
    return new Matrix(data.map(d => d.map(f => new RegularNum(f))));
}

export function test()
{
    const mat = MatrixFromNums([[3,-4,5],[2,423436,2],[-3,54,1]]);
    mat.mul(mat);
    console.log(mat.toString());
}