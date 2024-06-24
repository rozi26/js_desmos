import { IdentifyNumber } from "../../General/IdentifyNumber.js";
export class GridLayerBase {
    constructor(id = undefined) {
        this.ID = new IdentifyNumber();
        if (id !== undefined)
            this.ID = id;
    }
    setData(writer, transformer) {
        this.writer = writer;
        this.transformer = transformer;
    }
    fullRender() {
        const ef = this.getEffectRectangle();
        this.renderAt(ef[0], ef[1], ef[2], ef[3]);
    }
    //optional override methods
    getEffectRectangle() {
        return [0, 0, this.transformer.screenWidth, this.transformer.screenHeight];
    }
    isInDomain(lx, ly) { return 0; } //is the mouse is in the object domain return priority below zero not a match
    rightClickDrag(px, py) { } //drag the object with the right click (px and py are the relative location of the curser to the canves)
}
//# sourceMappingURL=GridLayerBase.js.map