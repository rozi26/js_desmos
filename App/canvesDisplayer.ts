import { ICanvesEventResiver } from "./canvesEventResiver";

export interface ICanvesDisplayer extends ICanvesEventResiver
{
    resize(width: number, height: number);
    fullRender();
    getSettingsDiv() : HTMLDivElement;
    setBottomMenuDiv(div: HTMLDivElement);
    setSideDiv(div: HTMLDivElement);
}