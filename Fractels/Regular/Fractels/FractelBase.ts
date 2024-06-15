import { ComplexNum } from "../../../Math/Numbers/ComplexNum.js";

export class Fractel
{
    runIter: (z: ComplexNum, c: ComplexNum) => void;
    constructor(runIter: (z: ComplexNum, c: ComplexNum) => void)
    {
        this.runIter = runIter;
    }

    getValue(c: ComplexNum, iterations: number): number
    {
        const z = new ComplexNum(0,0);
        let i = 0;
        while (i < iterations)
        {
            this.runIter(z,c);
            if (Math.abs(z.r) > 2) break;
            i++;   
        }
        return i / iterations;
    }
}