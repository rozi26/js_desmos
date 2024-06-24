export function NewtonRafsonSolve(func, derivative, start, iters) {
    let val = start.clone();
    let v1;
    for (let i = 0; i < iters; i++) {
        v1 = func.calc([val]);
        v1.dev(derivative.calc([val]));
        val.sub(v1);
    }
    return val;
}
export function NewtonRafsonSolvePolinum(pol, start, iters) {
    return NewtonRafsonSolve(pol.getAsExpress(), pol.getDerivative().getAsExpress(), start, iters);
}
//# sourceMappingURL=EquationSolver.js.map