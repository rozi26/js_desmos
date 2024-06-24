import { Grid2D } from "./Grid2D.js";
export class Layered2D extends Grid2D {
    constructor(writer, creator) {
        super(writer, creator);
        this.rightFocusLayer = undefined;
        this.layers = [];
    }
    addLayer(layer) {
        layer.setData(this.writer, this.transformer);
        this.layers.push(layer);
    }
    removeLayer(id) {
        this.layers = this.layers.filter(layer => !layer.ID.equalTo(id));
    }
    renderAt(px1, py1, px2, py2) {
        this.layers.forEach(layer => layer.renderAt(px1, py1, px2, py2));
        //this.layers.forEach(layer => layer.renderAt(0,0,this.writer.width,this.writer.height));
    }
    //advange methods
    renderWithoutLayer(excludeLayer) {
        const renderArea = excludeLayer.getEffectRectangle();
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].ID.equalTo(excludeLayer.ID))
                continue;
            this.layers[i].renderAt(renderArea[0], renderArea[1], renderArea[2], renderArea[3]);
        }
        this.writer.render(renderArea[0], renderArea[1], renderArea[2], renderArea[3]);
    }
    renderSingleLayer(layer) {
        const renderArea = layer.getEffectRectangle();
        layer.renderAt(renderArea[0], renderArea[1], renderArea[2], renderArea[3]);
        this.writer.render(renderArea[0], renderArea[1], renderArea[2], renderArea[3]);
    }
    //support right click operation
    rightClick(x, y) {
        const lx = this.transformer.pixelToLocX(x);
        const ly = this.transformer.pixelToLocY(y);
        this.rightFocusLayer = undefined;
        let ls = 0;
        let score = 0;
        for (let i = 0; i < this.layers.length; i++) {
            score = this.layers[i].isInDomain(lx, ly);
            if (score <= ls)
                continue;
            ls = score;
            this.rightFocusLayer = this.layers[i];
            break;
        }
    }
    rightClickUp(x, y) {
        this.rightFocusLayer = undefined;
    }
    moveRight(px, py) {
        if (this.rightFocusLayer == undefined)
            return;
        this.renderWithoutLayer(this.rightFocusLayer);
        this.rightFocusLayer.rightClickDrag(px, py);
        this.renderSingleLayer(this.rightFocusLayer);
    }
}
//# sourceMappingURL=Layered2D.js.map