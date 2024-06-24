import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { GridLayerBase } from "../../Mappers/2D/GridLayerBase.js";
import { FRACTEL_COLORIZERS } from "./Colorize/ColorizerList.js";
export class PixelLoaderBase extends GridLayerBase {
    constructor() {
        super(new IdentifyNumber());
        this.gridSize = 9;
        this.colorizer = FRACTEL_COLORIZERS.black;
    }
    getColor(px, py) {
        return this.colorizer.colorizer(this.getPixel(px, py));
    }
    bruteRender(px1, py1, px2, py2) {
        let col;
        for (let y = py1; y < py2; y++) {
            for (let x = px1; x < px2; x++) {
                col = this.getColor(x, y);
                this.writer.setAtColor(x, y, col.r, col.g, col.b);
            }
        }
    }
    renderAt(px1, py1, px2, py2) {
        if (this.gridSize === 1) {
            this.bruteRender(px1, py1, px2, py2);
            return;
        }
        const gridWidth = Math.ceil((px2 - px1) / this.gridSize);
        const gridHeight = Math.ceil((py2 - py1) / this.gridSize);
        const gridVals = [];
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                gridVals.push(this.getPixel(px1 + x * this.gridSize, py1 + y * this.gridSize));
            }
        }
        for (let y = 1; y < gridHeight; y++) {
            const ya2 = gridWidth * y;
            const ya1 = ya2 - gridWidth;
            for (let x = 1; x < gridWidth; x++) {
                if (gridVals[ya1 + x - 1] == gridVals[ya2 + x - 1] && gridVals[ya1 + x - 1] == gridVals[ya1 + x] && gridVals[ya2 + x - 1] == gridVals[ya2 + x]) {
                    this.writer.setRect(px1 + (x - 1) * this.gridSize, py1 + (y - 1) * this.gridSize, px1 + x * this.gridSize, py1 + y * this.gridSize, this.colorizer.colorizer(gridVals[ya1 + x]).getAsSingleValue());
                }
                else {
                    this.bruteRender(px1 + (x - 1) * this.gridSize, py1 + (y - 1) * this.gridSize, px1 + x * this.gridSize, py1 + y * this.gridSize);
                }
            }
        }
        this.bruteRender(px1, py1 + (gridHeight - 1) * this.gridSize, px2, py2);
        this.bruteRender(px1 + (gridWidth - 1) * this.gridSize, py1, px2, py2);
    }
}
//# sourceMappingURL=PixelLoaderBase.js.map