import { Run } from "./App/app.js";
import { getDefultRegularOperations } from "./Parser/Operations.js";
import { ParseMathVars} from "./Parser/Parser2.js";
import {Polinum} from "./Math/General/Polinum.js"
import { RegularNum } from "./Math/Numbers/RegularNum.js";
import { NewtonRafsonSolve } from "./Math/Solvers/EquationSolver.js";
import { Matrix, test } from "./Math/General/Matrix.js";

ParseMathVars("1+1", getDefultRegularOperations());
test()

//Run();
/*import {ParseMath} from "./Parser/Parser1.js";
import { testParser } from "./Parser/Parser1Test.js";
import { ComplexNum } from "./Math/Numbers/ComplexNum.js";

const inp : any = document.getElementById("inpText");
inp.addEventListener("input", () => 
{
    try
    {
        const text = inp.value;
        const res = ParseMath(text);
        console.log(res.calc().toString());
        document.getElementById("res").innerHTML = res.calc().toString()
    }
    catch (e)
    {
        console.log("crash with " + e);
        document.getElementById("res").innerHTML = "error [" + res.calc().toString() + "]"
        throw e;
    }
})

const res = ParseMath("log(1024,2)")
console.log(res);
console.log(res.calc([new ComplexNum(57,1)]))

console.log(testParser() ? "tests pass" : "tests fail")*/
