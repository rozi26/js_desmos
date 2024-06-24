import { GridLayerBase } from "../GridLayerBase.js";
export class CenterBallLayer extends GridLayerBase {
    renderAt(px1, py1, px2, py2) {
        for (let y = py1; y < py2; y++) {
            for (let x = px1; x < px2; x++) {
                const vx = this.transformer.pixelToLocX(x);
                const vy = this.transformer.pixelToLocY(y);
                if (vx * vx + vy * vy < 0.5)
                    this.writer.setAt(x, y, 255 << 16);
                else if (vx * vx + vy * vy < 1)
                    this.writer.setAt(x, y, (~~Math.pow(1 << 24, vx * vx + vy * vy)) - 1);
                else if (vx * vx + vy * vy < 2)
                    this.writer.setAt(x, y, 255);
            }
        }
    }
}
//# sourceMappingURL=CenterBallLayer.js.map