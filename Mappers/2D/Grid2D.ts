import { Transformer2DLinear } from "./Transformers/Transformer2DLinear.js";
import { ICanvesEventResiver } from "../../App/canvesEventResiver.js";
import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { ZOOM_MUL } from "../../App/settings.js";
import { ICanvesDisplayer} from "../../App/canvesDisplayer.js";
import { round } from "../../Math/General.js";
import { Transformer2DBase, transformerCreator } from "./Transformers/Transformer2DBase.js";

export abstract class Grid2D implements ICanvesEventResiver, ICanvesDisplayer
{
    public writer: CanvasWriterPlus;
    protected bottomDiv: HTMLDivElement | undefined;
    protected bottomDivElements: HTMLElement[];
    protected transformer: Transformer2DBase

    constructor(writer: CanvasWriterPlus, transformerCreator: transformerCreator)
    {
        this.transformer = transformerCreator(writer.width,writer.height);
        this.writer = writer;
    }

    resize(width: number, height: number)
    {
        this.transformer.changeScreenSize(width, height);
        this.writer.resize(width,height);
        this.fullRender();
    }

    abstract renderAt(px1: number, py1: number, px2: number, py2: number);

    leftClick(x: number, y: number) { }
    rightClick(x: number, y: number) { }
    leftClickUp(x: number, y: number) { }
    rightClickUp(x: number, y: number) { }

    move(mx: number, my: number, px: number, py: number)
    {
        this.transformer.move(mx, my,px, py);
        
        //this.renderAt(0,0,this.writer.width,this.writer.height);

        this.writer.move(mx,my);
        const renderY = my >= 0 ? [0,0,this.writer.width,my] : [0,this.writer.height + my, this.writer.width, this.writer.height];
        const renderX = mx >= 0 ? [0,0,mx + 1,this.writer.height] : [this.writer.width + mx, 0, this.writer.width, this.writer.height];
        this.renderAt(renderY[0],renderY[1],renderY[2],renderY[3]);
        this.renderAt(renderX[0],renderX[1],renderX[2],renderX[3]);

        this.writer.fullRender();
        this.transofrmUpdateReport();
    }

    zoom(px: number, py: number, times: number)
    {
        this.transformer.zoom(Math.pow(ZOOM_MUL, times), px, py);
        this.renderAt(0,0,this.writer.width,this.writer.height);
        this.writer.fullRender();
        this.transofrmUpdateReport();
    }

    moveRight(mx: number, my: number) {} //drag with the right button

    fullRender() {
        this.renderAt(0,0,this.writer.width,this.writer.height);
        this.writer.fullRender();
    }

    private transofrmUpdateReport()
    {
        if (this.bottomDiv === undefined) return;
        this.bottomDivElements[0].innerHTML = `(${this.transformer.pixelToLocX(0).toFixed(4)},${this.transformer.pixelToLocY(0).toFixed(4)})`
    }

    //ui things
    getSettingsDiv(): HTMLDivElement {
        const div = document.createElement("div");
        return div;
    }

    setBottomMenuDiv(div: HTMLDivElement)
    {
        this.bottomDiv = div;
        this.bottomDiv.style.display = "flex";
        this.bottomDivElements = [];
        const addElem = (elem: HTMLElement)  => {elem.style.userSelect = "none"; this.bottomDiv.appendChild(elem); this.bottomDivElements.push(elem)}
        addElem(document.createElement("h3"));
        addElem(document.createElement("h3"))
    }

    setSideDiv(div: HTMLDivElement) {
        
    }
}