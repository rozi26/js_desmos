import { ComplexNum } from "../Math/Numbers/ComplexNum.js";
import { getDefultComplexOperations } from "./Operations.js";
import { ParseMath } from "./Parser1.js";
class testSample {
    constructor(text, inps, res) {
        this.text = text;
        this.inps = [];
        inps.forEach(inp => this.inps.push(inp));
        this.res = res;
    }
}
function getDefualtTests() {
    const tests = [];
    tests.push(new testSample("3", [], new ComplexNum(3, 0)));
    tests.push(new testSample("1+1", [], new ComplexNum(2)));
    tests.push(new testSample("i+1", [], new ComplexNum(1, 1)));
    tests.push(new testSample("i*i", [], new ComplexNum(-1)));
    tests.push(new testSample("1+2*i", [], new ComplexNum(1, 2)));
    tests.push(new testSample("(1+2)*i", [], new ComplexNum(0, 3)));
    tests.push(new testSample("pi+1", [], new ComplexNum(Math.PI + 1, 0)));
    tests.push(new testSample("(1+i)*2", [], new ComplexNum(2, 2)));
    tests.push(new testSample("(1+i)*(2*i)", [], new ComplexNum(-2, 2)));
    tests.push(new testSample("[0]+[0]", [new ComplexNum(1)], new ComplexNum(2, 0)));
    tests.push(new testSample("ln(e*e)", [], new ComplexNum(2)));
    tests.push(new testSample("log(1024,2)", [], new ComplexNum(10)));
    tests.push(new testSample("log([1],[0])", [new ComplexNum(2), new ComplexNum(1024)], new ComplexNum(10)));
    tests.push(new testSample("log([0])", [new ComplexNum(100)], new ComplexNum(2)));
    tests.push(new testSample("1+(2+3)*4", [], new ComplexNum(21)));
    tests.push(new testSample("cos(pi)", [], new ComplexNum(-1)));
    return tests;
}
export function testParser(tests = undefined) {
    if (tests === undefined)
        tests = getDefualtTests();
    const ope = getDefultComplexOperations();
    for (let i = 0; i < tests.length; i++) {
        const expr = ParseMath(tests[i].text, ope);
        const res = expr.calc(tests[i].inps);
        if (!res.equal(tests[i].res)) {
            console.log(`fail on test [${tests[i].text}] with inps [${tests[i].inps}], got [${res.toString()}] but expeted [${tests[i].res.toString()}]`);
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=Parser1Test.js.map