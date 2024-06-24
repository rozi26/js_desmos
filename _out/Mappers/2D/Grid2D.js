import { ZOOM_MUL } from "../../App/settings.js";
export class Grid2D {
    constructor(writer, transformerCreator) {
        this.transformer = transformerCreator(writer.width, writer.height);
        this.writer = writer;
    }
    resize(width, height) {
        this.transformer.changeScreenSize(width, height);
        this.renderAt(0, 0, this.writer.width, this.writer.height);
    }
    leftClick(x, y) { }
    rightClick(x, y) { }
    leftClickUp(x, y) { }
    rightClickUp(x, y) { }
    move(mx, my, px, py) {
        this.transformer.move(mx, my, px, py);
        //this.renderAt(0,0,this.writer.width,this.writer.height);
        this.writer.move(mx, my);
        const renderY = my >= 0 ? [0, 0, this.writer.width, my] : [0, this.writer.height + my, this.writer.width, this.writer.height];
        const renderX = mx >= 0 ? [0, 0, mx + 1, this.writer.height] : [this.writer.width + mx, 0, this.writer.width, this.writer.height];
        this.renderAt(renderY[0], renderY[1], renderY[2], renderY[3]);
        this.renderAt(renderX[0], renderX[1], renderX[2], renderX[3]);
        this.writer.fullRender();
        this.transofrmUpdateReport();
    }
    zoom(px, py, times) {
        this.transformer.zoom(Math.pow(ZOOM_MUL, times), px, py);
        this.renderAt(0, 0, this.writer.width, this.writer.height);
        this.writer.fullRender();
        this.transofrmUpdateReport();
    }
    moveRight(mx, my) { } //drag with the right button
    fullRender() {
        this.renderAt(0, 0, this.writer.width, this.writer.height);
        this.writer.fullRender();
    }
    transofrmUpdateReport() {
        if (this.bottomDiv === undefined)
            return;
        this.bottomDivElements[0].innerHTML = `(${this.transformer.pixelToLocX(0).toFixed(4)},${this.transformer.pixelToLocY(0).toFixed(4)})`;
    }
    //ui things
    getSettingsDiv() {
        const div = document.createElement("div");
        return div;
    }
    setBottomMenuDiv(div) {
        this.bottomDiv = div;
        this.bottomDiv.style.display = "flex";
        this.bottomDivElements = [];
        const addElem = (elem) => { elem.style.userSelect = "none"; this.bottomDiv.appendChild(elem); this.bottomDivElements.push(elem); };
        addElem(document.createElement("h3"));
        addElem(document.createElement("h3"));
    }
    setSideDiv(div) {
    }
}
//# sourceMappingURL=Grid2D.js.map