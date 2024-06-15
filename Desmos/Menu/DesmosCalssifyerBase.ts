import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { DesmosRefrenceMeneger } from "../General/DesmosRefrenceMeneger.js";
import { DesmosElementBase } from "./DesmosElementBase.js";

export abstract class DesmomsClassifyerBase<T extends DesmosElementBase>
{
    public id: IdentifyNumber
    public refranceMeneger: DesmosRefrenceMeneger<T>

    constructor()
    {
        this.id = new IdentifyNumber();
    }

    setRefrance(refranceMeneger: DesmosRefrenceMeneger<T>)
    {
        this.refranceMeneger = refranceMeneger;
    }

    abstract transform(text: string): T; 

    isValid(text: string): boolean
    {
        try
        {
            const res = this.transform(text);
            return true;
        }
        catch(e) {}
        return false;
    }
}