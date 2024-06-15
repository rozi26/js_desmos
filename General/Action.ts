
export class Action<T>
{
    funcs: ((inp: T)=>void)[];
    constructor()
    {
        this.funcs = [];
    }

    addFunc(func: (inp: T)=>void)
    {
        this.funcs.push(func);
    }

    invoke(inp: T)
    {
        this.funcs.forEach(func => func(inp));
    }
}