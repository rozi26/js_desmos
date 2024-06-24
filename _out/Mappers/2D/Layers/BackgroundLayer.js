import { GridLayerBase } from "../GridLayerBase.js";
export class BackgroundLayer extends GridLayerBase {
    constructor(r, g, b) {
        super();
        this.r = r;
        this.g = g;
        this.b = b;
    }
    renderAt(px1, py1, px2, py2) {
        this.writer.setRectAtColor(px1, py1, px2, py2, this.r, this.g, this.b);
    }
}
//# sourceMappingURL=BackgroundLayer.js.map