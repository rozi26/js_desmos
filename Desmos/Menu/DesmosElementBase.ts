import { IdentifyNumber } from "../../General/IdentifyNumber.js"

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
    
    fullRender() {};
}