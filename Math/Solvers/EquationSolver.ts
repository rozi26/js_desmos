import { MathExpr } from "../../Parser/Parser1.js";
import { Polinum } from "../General/Polinum.js";
import { NumberBase } from "../Numbers/NumberBase.js";


export function NewtonRafsonSolve<T extends NumberBase<T>>(func: MathExpr<T>, derivative: MathExpr<T>, start: T, iters: number): T
{
    let val: T = start.clone();
    let v1;
    for (let i = 0; i < iters; i++)
    {
        v1 = func.calc([val]);
        v1.dev(derivative.calc([val]));
        val.sub(v1);
    }
    return val;
}

export function NewtonRafsonSolvePolinum<T extends NumberBase<T>>(pol: Polinum<T>, start: T, iters: number): T
{
    return NewtonRafsonSolve(pol.getAsExpress(), pol.getDerivative().getAsExpress(), start, iters);
}