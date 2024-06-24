import { ComplexNum } from "../../../Math/Numbers/ComplexNum.js";
export class Fractel {
    constructor(runIter) {
        this.runIter = runIter;
    }
    getValue(c, iterations) {
        const z = new ComplexNum(0, 0);
        let i = 0;
        while (i < iterations) {
            this.runIter(z, c);
            if (Math.abs(z.r) > 2)
                break;
            i++;
        }
        return i / iterations;
    }
}
//# sourceMappingURL=FractelBase.js.map