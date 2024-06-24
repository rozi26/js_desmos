export class Action {
    constructor() {
        this.funcs = [];
    }
    addFunc(func) {
        this.funcs.push(func);
    }
    invoke(inp) {
        this.funcs.forEach(func => func(inp));
    }
}
//# sourceMappingURL=Action.js.map