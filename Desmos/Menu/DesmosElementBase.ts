import { IdentifyNumber } from "../../General/IdentifyNumber.js"
import { ColorPicker } from "../General/Elements/Extenders/ColorPicker.js"

export abstract class DesmosElementBase
{
    public ID: IdentifyNumber
    constructor()
    {
        this.ID = new IdentifyNumber()
    }

    abstract getName(): string;
    abstract getLogo(): HTMLElement;

    getBoxExtand(): HTMLDivElement
    {
        return undefined
    }

    getColorPicker(): ColorPicker | undefined
    {
        return undefined;
    }
    
    fullRender() {};
}