import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { NullElement } from "../General/NullCalssifyers.js";
import { DesmosElementBase } from "./DesmosElementBase.js";

export interface IDesmosDisplayer<T extends DesmosElementBase>
{
    addElement(element: T | NullElement)
    removeElement(elementId: IdentifyNumber);
    fullRender
}