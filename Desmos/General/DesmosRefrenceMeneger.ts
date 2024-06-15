import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { DesmosElementBase } from "../Menu/DesmosElementBase.js";

export class RefrenceKey<T extends DesmosElementBase>
{
    private _loopCheckTemp: number = 0;
    readonly id: IdentifyNumber;
    readonly name: string;
    refrences: [T];

    constructor(owner: T, name: string)
    {
        this.id = owner.ID;
        this.name = name;
    }
}

export class DesmosRefrenceMeneger<T extends DesmosElementBase>
{
    protected Names: Map<string, IdentifyNumber>
    protected Elems: Map<IdentifyNumber, T>
    protected Keys: Map<IdentifyNumber,RefrenceKey<T>>
    protected loopCheckInx: number = 0;

    constructor()
    {
        this.Names = new Map();
        this.Elems = new Map();
    }
    
    SignElement(element: T, name: string): RefrenceKey<T>
    {
        if (this.Keys.has(element.ID)) return this.Keys.get(element.ID);
        this.Elems.set(element.ID,element);
        const key = new RefrenceKey(element, name)
        this.Keys.set(element.ID,key);
        return key;
    }

    UnsignElement(key: RefrenceKey<T>)
    {
        this.Keys.delete(this.Elems.get(key.id).ID);
        this.Elems.delete(key.id);
        for (let name in this.Names.keys)
        {
            if (this.Names.get(name).equalTo(key.id)) this.Names.delete(name);
        }
    }
}