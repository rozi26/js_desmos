import { RegularNum } from "../../Math/Numbers/RegularNum.js";
import { Operation, OperationsHolder, getDefultRegularOperations } from "../../Parser/Operations.js";
import { DesmosRefrenceMeneger, RefrenceKey } from "../General/DesmosRefrenceMeneger.js";
import { DesmosFunction2D } from "./Elements/Function/DesmosFunction2D.js";
import { Desmos2DElementBase, Desmos2DElementsTypes } from "./Elements/Desmos2DElementBase.js";


export class Desmos2DRefranceMeneger extends DesmosRefrenceMeneger<Desmos2DElementBase>
{
    public operations: OperationsHolder<RegularNum>
    constructor()
    {
        super();
        this.operations = getDefultRegularOperations();
    }

    SignElement(element: Desmos2DElementBase, name: string): RefrenceKey<Desmos2DElementBase>
    {
        if (element.getType() == Desmos2DElementsTypes.Function)
        {
            this.operations.addOpe((element as DesmosFunction2D).getAsOperation(name));
        }
        return super.SignElement(element,name);
    }

    UnsignElement(key: RefrenceKey<Desmos2DElementBase>)
    {
        this.operations.removeOpe(key.name);
        return super.UnsignElement(key);
    }

    
}